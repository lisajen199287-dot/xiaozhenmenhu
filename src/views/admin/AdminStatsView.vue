<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { init } from 'echarts'
import type { EChartsOption } from 'echarts'

interface ChannelStat {
  source: string;
  pv: number;
  uv: number;
}

interface RankedItem {
  name: string;
  count: number;
}

interface TrendItem {
  day: string;
  pv: number;
  uv: number;
}

const loading = ref(false)

// --- Time Range Selection ---
const timeRange = ref('7d') 
const customDateRange = ref<[Date, Date] | null>(null)

const computedDates = computed(() => {
    let start = new Date()
    let end = new Date()
    
    if (timeRange.value === '1d') {
        start.setHours(0, 0, 0, 0)
    } else if (timeRange.value === '7d') {
        start.setDate(end.getDate() - 7)
    } else if (timeRange.value === '30d') {
        start.setDate(end.getDate() - 30)
    } else if (timeRange.value === 'all') {
        start = new Date('2024-01-01')
    } else if (timeRange.value === 'custom' && customDateRange.value) {
        start = customDateRange.value[0]
        end = customDateRange.value[1]
    }
    
    const formatDate = (d: Date) => d.toISOString().split('T')[0]
    return {
        start: formatDate(start) + ' 00:00:00',
        end: formatDate(end) + ' 23:59:59'
    }
})

// --- Data States ---
const channelData = ref<ChannelStat[]>([])
const trendData = ref<TrendItem[]>([])
const topPages = ref<RankedItem[]>([])
const deviceData = ref<RankedItem[]>([])

const trendChartRef = ref<HTMLElement | null>(null)
const deviceChartRef = ref<HTMLElement | null>(null)
let trendChartInstance: any = null
let deviceChartInstance: any = null

const fetchAllStats = async () => {
    loading.value = true
    const { start, end } = computedDates.value
    const query = `startDate=${start}&endDate=${end}`
    
    try {
        const [cRes, tRes, pRes, dRes] = await Promise.all([
            fetch(`/api/stats/channel?${query}`),
            fetch(`/api/stats/trend-daily?${query}`),
            fetch(`/api/stats/top-pages?${query}`),
            fetch(`/api/stats/devices?${query}`)
        ])
        
        channelData.value = await cRes.json()
        trendData.value = await tRes.json()
        topPages.value = (await pRes.json()).map((i: any) => ({ name: i.page, count: i.count }))
        deviceData.value = (await dRes.json()).map((i: any) => ({ name: i.device || 'Unknown', count: i.count }))
        
        renderCharts()
    } catch (e) {
        console.error('Failed to fetch stats', e)
    } finally {
        loading.value = false
    }
}

const renderCharts = () => {
    nextTick(() => {
        renderTrendChart()
        renderDeviceChart()
    })
}

const renderTrendChart = () => {
    if (!trendChartRef.value) return
    if (trendChartInstance) trendChartInstance.dispose()
    trendChartInstance = init(trendChartRef.value)
    
    const option: EChartsOption = {
        title: { text: '访问趋势 (PV/UV)', left: 'center', textStyle: { fontSize: 14, color: '#64748b' } },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0 },
        grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
        xAxis: { type: 'category', data: trendData.value.map(i => i.day.split('-').slice(1).join('/')), axisLine: { lineStyle: { color: '#e2e8f0' } } },
        yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed' } } },
        series: [
            { name: 'PV (浏览量)', type: 'line', smooth: true, data: trendData.value.map(i => i.pv), itemStyle: { color: '#3b82f6' }, areaStyle: { opacity: 0.1 } },
            { name: 'UV (访客数)', type: 'line', smooth: true, data: trendData.value.map(i => i.uv), itemStyle: { color: '#10b981' } }
        ]
    }
    trendChartInstance.setOption(option)
}

const renderDeviceChart = () => {
    if (!deviceChartRef.value) return
    if (deviceChartInstance) deviceChartInstance.dispose()
    deviceChartInstance = init(deviceChartRef.value)
    
    const option: EChartsOption = {
        title: { text: '访问设备分布', left: 'center', textStyle: { fontSize: 14, color: '#64748b' } },
        tooltip: { trigger: 'item' },
        legend: { bottom: 0, icon: 'circle' },
        series: [{
            name: '分析',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
            label: { show: false },
            data: deviceData.value.map(i => ({ name: i.name, value: i.count })),
            emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } }
        }]
    }
    deviceChartInstance.setOption(option)
}

const handleTimeChange = () => {
    fetchAllStats()
}

onMounted(() => {
    fetchAllStats()
    window.addEventListener('resize', () => {
        trendChartInstance?.resize()
        deviceChartInstance?.resize()
    })
})

const summaryMetrics = computed(() => {
    const totalPV = trendData.value.reduce((s, i) => s + i.pv, 0)
    const totalUV = trendData.value.reduce((s, i) => s + i.uv, 0)
    const activeSources = channelData.value.length
    return [
        { label: '总浏览量 (PV)', value: totalPV, icon: 'fas fa-eye', color: '#3b82f6' },
        { label: '独立访客 (UV)', value: totalUV, icon: 'fas fa-user', color: '#10b981' },
        { label: '活跃渠道数', value: activeSources, icon: 'fas fa-route', color: '#8b5cf6' }
    ]
})

</script>

<template>
  <div class="admin-stats" v-loading="loading">
    <div class="page-header">
        <div class="header-left">
            <h2>流量分析看板</h2>
            <p class="subtitle">实时采集全渠道数据，洞察用户行为路径</p>
        </div>
        
        <div class="header-right">
            <el-radio-group v-model="timeRange" size="small" @change="handleTimeChange">
                <el-radio-button label="1d">今日</el-radio-button>
                <el-radio-button label="7d">近7天</el-radio-button>
                <el-radio-button label="30d">近30天</el-radio-button>
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="custom">自定义</el-radio-button>
            </el-radio-group>
            
            <el-date-picker
                v-if="timeRange === 'custom'"
                v-model="customDateRange"
                type="daterange"
                size="small"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="margin-left: 10px; width: 240px;"
                @change="handleTimeChange"
            />
        </div>
    </div>

    <!-- Summary Metrics -->
    <div class="metric-grid">
        <div class="metric-card" v-for="m in summaryMetrics" :key="m.label">
            <div class="metric-icon" :style="{ background: m.color + '15', color: m.color }">
                <i :class="m.icon"></i>
            </div>
            <div class="metric-content">
                <div class="metric-label">{{ m.label }}</div>
                <div class="metric-value">{{ m.value.toLocaleString() }}</div>
            </div>
        </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-row">
        <div class="chart-container trend-box">
            <div class="box-header">
                <h3>流量趋势分析</h3>
                <span class="tag">实时</span>
            </div>
            <div ref="trendChartRef" class="chart-body"></div>
        </div>
        
        <div class="chart-container device-box">
            <div class="box-header">
                <h3>终端分布</h3>
            </div>
            <div ref="deviceChartRef" class="chart-body"></div>
        </div>
    </div>

    <div class="data-row">
        <!-- Channel Table -->
        <div class="table-container channel-box">
            <div class="box-header">
                <h3>全渠道转化追踪</h3>
                <el-button type="primary" size="small" link @click="fetchAllStats">刷新</el-button>
            </div>
            <el-table :data="channelData" stripe height="350">
                <el-table-column prop="source" label="来源">
                    <template #default="{ row }">
                        <span class="source-tag" :class="{ 'is-direct': !row.source }">
                            {{ row.source || '直接访问' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="pv" label="PV" width="100" />
                <el-table-column prop="uv" label="UV" width="100" />
                <el-table-column label="活跃度">
                    <template #default="{ row }">
                        <el-progress :percentage="parseFloat(Math.min(100, (row.uv / (row.pv || 1)) * 100).toFixed(1))" :show-text="false" stroke-width="6"/>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- Top Pages -->
        <div class="rank-container pages-box">
            <div class="box-header">
                <h3>热门受访页面 TOP10</h3>
            </div>
            <div class="rank-list">
                <div class="rank-item" v-for="(p, idx) in topPages" :key="p.name">
                    <span class="rank-index" :class="'idx-' + (idx + 1)">{{ idx + 1 }}</span>
                    <span class="page-link" :title="p.name">{{ p.name }}</span>
                    <span class="page-count">{{ p.count }}</span>
                </div>
                <el-empty v-if="topPages.length === 0" description="暂无访问数据" :image-size="60" />
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.admin-stats { padding: 0; color: #1e293b; }

.page-header { 
    margin-bottom: 24px; 
    display: flex; 
    justify-content: space-between; 
    align-items: flex-end;
}

.page-header h2 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0; }
.subtitle { color: #64748b; font-size: 0.9rem; margin: 2px 0 0 0; }

.metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
.metric-card { 
    background: white; padding: 20px; border-radius: 12px; 
    box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 16px; 
}
.metric-icon { 
    width: 48px; height: 48px; border-radius: 10px; 
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem; 
}
.metric-label { font-size: 0.85rem; color: #64748b; margin-bottom: 4px; }
.metric-value { font-size: 1.5rem; font-weight: 700; color: #0f172a; }

.charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px; }
.chart-container { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.box-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.box-header h3 { margin: 0; font-size: 1rem; font-weight: 600; color: #334155; }
.chart-body { height: 300px; }

.tag { background: #fee2e2; color: #ef4444; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 600; }

.data-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.table-container, .rank-container { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.source-tag { font-size: 0.85rem; padding: 2px 8px; border-radius: 4px; background: #f1f5f9; color: #475569; }
.source-tag.is-direct { background: #e0f2fe; color: #0369a1; }

.rank-list { margin-top: 10px; }
.rank-item { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px dashed #f1f5f9; gap: 12px; }
.rank-index { width: 22px; height: 22px; border-radius: 6px; background: #f1f5f9; color: #64748b; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; }
.rank-index.idx-1 { background: #fef3c7; color: #d97706; }
.rank-index.idx-2 { background: #e0f2fe; color: #0284c7; }
.rank-index.idx-3 { background: #dcfce7; color: #16a34a; }

.page-link { flex: 1; font-size: 0.85rem; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.page-count { font-size: 0.85rem; font-weight: 600; color: #3b82f6; }

:deep(.el-table th) { background: #f8fafc !important; color: #64748b; font-size: 0.85rem; }
</style>