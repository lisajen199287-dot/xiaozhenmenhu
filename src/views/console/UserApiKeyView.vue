<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  defineAsyncComponent,
  nextTick,
  watch,
} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import { useUser } from "@/utils/userStore";

const route = useRoute();
import {
  apiGetApiKeys,
  apiCreateApiKey,
  apiDeleteApiKey,
  apiToggleApiKeyStatus,
  apiGetApiUsage,
  apiGetFullKey,
  apiGetApiCallLogs,
  apiGetUsageStats,
  apiGetModels,
  apiGetUserAuthors,
} from "@/api/newApi/index";
import { init } from "echarts";
import type { EChartsOption, EChartsType } from "echarts";

const ApiDocsTab = defineAsyncComponent(
  () => import("./components/ApiDocsTab.vue")
);

interface ApiKey {
  id: number;
  name: string;
  keyPreview: string;
  fullKey?: string;
  status: number;
  monthlyLimit: number;
  monthlyUsage: number;
  lastUsedAt: string;
  createTime: string;
}

interface LogItem {
  id: number;
  taskId: string;
  model: string;
  status: string;
  inputType: string;
  audioMode: string;
  seed: number | null;
  duration: number | null;
  resolution: string;
  ratio: string;
  actualTokens: number;
  generateAudio: boolean | null;
  draft: boolean | null;
  actualCost: number | null;
  createdAt: number | null;
  updatedAt: number | null;
  createTime: string;
  errorMsg: string;
  endpoint: string;
}

const { user } = useUser();

// API Key 列表
const apiKeys = ref<ApiKey[]>([]);
const loading = ref(false);
const loadedFullKeys = ref<Set<number>>(new Set());
const loadingFullKeys = ref<Set<number>>(new Set());
const createDialogVisible = ref(false);
const newKeyName = ref("");
const newCreatedKey = ref("");
const apiApplication = ref(false); // 控制创建按钮显示

// 当前显示的 Tab
const activeTab = ref(route.query.tab === "docs" ? "docs" : "keys");

// 今日统计
const todayCalls = ref(0);
const todayCredits = ref(0);

// ==================== 用量统计 ====================
const statsInterval = ref("Day");
const statsApiKey = ref<number | undefined>(undefined);
const statsModel = ref("");
const statsDateRange = ref<string[]>((() => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 6);
  const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return [fmt(start), fmt(end)];
})());
const statsMetric = ref("tokens"); // 'tokens' | 'credits'
const statsLoading = ref(false);
const statsDataPoints = ref<any[]>([]);
const statsModelDataPoints = ref<any[]>([]);
const MODEL_COLOR_PALETTE = [
  '#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#ec4899', '#f97316', '#14b8a6', '#6366f1',
  '#84cc16', '#e11d48', '#0ea5e9', '#a855f7', '#22c55e',
];
let chartInstance: EChartsType | null = null;
const chartRef = ref<HTMLElement | null>(null);
const modelOptions = ref<string[]>([]);

const fetchModels = async () => {
  try {
    const res = await apiGetModels();
    const list = Array.isArray(res) ? res : res?.data || [];
    modelOptions.value = list;
  } catch {
    modelOptions.value = [];
  }
};

// 获取用户权限信息
const fetchUserAuthors = async () => {
  try {
    const res = await apiGetUserAuthors();
    const data = res?.data || res;
    apiApplication.value = data?.apiApplication === true;
  } catch {
    apiApplication.value = false;
  }
};

// ==================== 调用日志 ====================
const logs = ref<LogItem[]>([]);
const logsLoading = ref(false);
const logsPage = ref(1);
const logsPageSize = ref(20);
const logsTotal = ref(0);
const logsModel = ref("");
const logsStatus = ref("");

// 获取使用量统计
const fetchUsage = async () => {
  try {
    const res = await apiGetApiUsage(1);
    const stats = res?.dailyStats || res?.data?.dailyStats || [];
    if (Array.isArray(stats) && stats.length > 0) {
      const today = stats[stats.length - 1];
      todayCalls.value = today.callCount || 0;
      todayCredits.value = today.actualTokens || 0;
    }
  } catch {
    // keep defaults
  }
};

// 获取 API Key 列表
const fetchApiKeys = async () => {
  loading.value = true;
  try {
    const res = await apiGetApiKeys();
    if (Array.isArray(res)) apiKeys.value = res;
    else if (res?.data && Array.isArray(res.data)) apiKeys.value = res.data;
    else if (res?.list && Array.isArray(res.list)) apiKeys.value = res.list;
    else apiKeys.value = [];
    loadedFullKeys.value.clear();
  } catch {
    apiKeys.value = [];
  } finally {
    loading.value = false;
  }
};

// 创建 API Key
const handleCreate = async () => {
  if (!newKeyName.value.trim()) {
    ElMessage.warning("请输入密钥名称");
    return;
  }
  try {
    const res = await apiCreateApiKey({ name: newKeyName.value });
    let key = typeof res === "string" ? res : res?.key || res?.data?.key || "";
    newCreatedKey.value = key;
    if (!key) {
      ElMessage.error("创建成功但未获取到密钥");
      createDialogVisible.value = false;
      newKeyName.value = "";
      fetchApiKeys();
      return;
    }
    ElMessageBox.alert(
      `<div style="margin:16px 0"><div style="margin-bottom:8px;font-weight:bold">密钥名称：${newKeyName.value}</div><div style="display:flex;align-items:center;gap:8px"><code style="background:#f1f5f9;padding:8px 12px;border-radius:4px;font-family:monospace;flex:1;word-break:break-all">${key}</code></div></div>`,
      "创建成功",
      {
        confirmButtonText: "我已保存",
        type: "success",
        dangerouslyUseHTMLString: true,
      }
    );
    createDialogVisible.value = false;
    newKeyName.value = "";
    fetchApiKeys();
  } catch (e: any) {
    ElMessage.error(e.message || "创建失败");
  }
};

const toggleShowFullKey = async (key: ApiKey) => {
  if (loadedFullKeys.value.has(key.id)) {
    loadedFullKeys.value.delete(key.id);
    return;
  }
  loadingFullKeys.value.add(key.id);
  try {
    const res = await apiGetFullKey(key.id);
    let fullKey =
      res?.fullKey ||
      res?.data?.fullKey ||
      (typeof res === "string" ? res : "");
    if (fullKey) {
      key.fullKey = fullKey;
      loadedFullKeys.value.add(key.id);
    } else ElMessage.error("获取完整密钥失败");
  } catch (e: any) {
    ElMessage.error(e.message || "获取完整密钥失败");
  } finally {
    loadingFullKeys.value.delete(key.id);
  }
};

const getDisplayKey = (key: ApiKey) =>
  loadedFullKeys.value.has(key.id) && key.fullKey
    ? key.fullKey
    : key.keyPreview;

const copyKey = async (key: ApiKey) => {
  if (!loadedFullKeys.value.has(key.id) || !key.fullKey) {
    ElMessage.warning("请先点击眼睛图标显示完整密钥");
    return;
  }
  try {
    await navigator.clipboard.writeText(key.fullKey);
    ElMessage.success("已复制");
  } catch {
    ElMessage.error("复制失败");
  }
};

const handleToggleStatus = async (key: ApiKey) => {
  const s = key.status === 1 ? 0 : 1;
  try {
    await apiToggleApiKeyStatus(key.id, s);
    ElMessage.success(s === 1 ? "已启用" : "已禁用");
    fetchApiKeys();
  } catch (e: any) {
    ElMessage.error(e.message || "操作失败");
  }
};

const handleDelete = async (key: ApiKey) => {
  try {
    await ElMessageBox.confirm(
      "删除后该密钥将立即失效，确定要删除吗？",
      "删除确认",
      { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
    );
    await apiDeleteApiKey(key.id);
    ElMessage.success("删除成功");
    fetchApiKeys();
  } catch (e: any) {
    if (e !== "cancel") ElMessage.error(e.message || "删除失败");
  }
};

const getStatusType = (status: number) => (status === 1 ? "success" : "danger");
const getStatusText = (status: number) => (status === 1 ? "启用" : "禁用");

// ==================== 用量统计图表 ====================
const statsTotalCalls = ref(0);
const statsTotalMetric = ref(0);

const fillTimeGaps = (points: any[], startDate: string, endDate: string, interval: string): any[] => {
  const map = new Map(points.map((p: any) => [p.timeKey, p]));
  const result: any[] = [];
  const fmtDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (interval === "Hour") {
    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T23:00:00");
    for (let d = new Date(start); d <= end; d.setHours(d.getHours() + 1)) {
      const key = fmtDate(d) + " " + String(d.getHours()).padStart(2, "0") + ":00";
      result.push(map.get(key) || { timeKey: key, callCount: 0, actualTokens: 0, totalCost: 0 });
    }
  } else {
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = fmtDate(d);
      result.push(map.get(key) || { timeKey: key, callCount: 0, actualTokens: 0, totalCost: 0 });
    }
  }
  return result;
};

const fillTimeGapsByModel = (
  modelPoints: any[],
  startDate: string,
  endDate: string,
  interval: string
): { timeKeys: string[]; models: string[]; dataMap: Map<string, Map<string, any>> } => {
  const modelSet = new Set<string>();
  modelPoints.forEach((p: any) => { if (p.model) modelSet.add(p.model); });
  const models = Array.from(modelSet);

  const dataMap = new Map<string, Map<string, any>>();
  modelPoints.forEach((p: any) => {
    if (!dataMap.has(p.timeKey)) dataMap.set(p.timeKey, new Map());
    dataMap.get(p.timeKey)!.set(p.model, p);
  });

  const fmtDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const timeKeys: string[] = [];

  if (interval === 'Hour') {
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T23:00:00');
    for (let d = new Date(start); d <= end; d.setHours(d.getHours() + 1)) {
      const key = fmtDate(d) + ' ' + String(d.getHours()).padStart(2, '0') + ':00';
      timeKeys.push(key);
    }
  } else {
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      timeKeys.push(fmtDate(d));
    }
  }

  const zeroPoint = (timeKey: string, model: string) => ({
    timeKey, model, callCount: 0, actualTokens: 0, totalCost: 0
  });
  timeKeys.forEach(tk => {
    if (!dataMap.has(tk)) dataMap.set(tk, new Map());
    models.forEach(m => {
      if (!dataMap.get(tk)!.has(m)) {
        dataMap.get(tk)!.set(m, zeroPoint(tk, m));
      }
    });
  });

  return { timeKeys, models, dataMap };
};

const fetchUsageStats = async () => {
  statsLoading.value = true;
  try {
    const params: any = { interval: statsInterval.value };
    if (statsDateRange.value && statsDateRange.value.length === 2) {
      const start = new Date(statsDateRange.value[0]);
      const end = new Date(statsDateRange.value[1]);
      const diffDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays > 30) {
        ElMessage.warning("时间跨度不能超过 30 天");
        statsLoading.value = false;
        return;
      }
      params.startDate = statsDateRange.value[0];
      params.endDate = statsDateRange.value[1];
    } else {
      params.days = 7;
    }
    if (statsApiKey.value) params.apiKeyId = statsApiKey.value;
    if (statsModel.value) params.model = statsModel.value;
    const res = await apiGetUsageStats(params);
    const data = res?.data || res;
    const rawPoints = data?.dataPoints || [];
    const rawModelPoints = data?.modelDataPoints || [];
    const sd = params.startDate || (() => { const d = new Date(); d.setDate(d.getDate() - 6); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();
    const ed = params.endDate || (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();
    const points = fillTimeGaps(rawPoints, sd, ed, statsInterval.value);
    statsDataPoints.value = points;
    statsModelDataPoints.value = rawModelPoints;
    statsTotalCalls.value = points.reduce((s: number, p: any) => s + (Number(p.callCount) || 0), 0);
    const metricKey = statsMetric.value === "tokens" ? "actualTokens" : "totalCost";
    statsTotalMetric.value = points.reduce((s: number, p: any) => s + (Number(p[metricKey]) || 0), 0);
    renderChart(points, rawModelPoints);
  } catch {
    // ElMessage.error("获取统计数据失败");
  } finally {
    statsLoading.value = false;
  }
};

const renderChart = (points: any[], modelPoints: any[] = []) => {
  if (!chartRef.value) return;
  if (!chartInstance) chartInstance = init(chartRef.value);
  const isTokens = statsMetric.value === "tokens";
  const metricKey = isTokens ? "actualTokens" : "totalCost";
  const yAxisName = isTokens ? "Tokens" : "积分";
  const isStacked = !statsModel.value && modelPoints.length > 0;

  let option: EChartsOption;

  if (isStacked) {
    const sd = statsDateRange.value?.[0] || '';
    const ed = statsDateRange.value?.[1] || '';
    const { timeKeys, models, dataMap } = fillTimeGapsByModel(modelPoints, sd, ed, statsInterval.value);

    const series = models.map((model, index) => ({
      name: model,
      type: 'bar' as const,
      stack: 'total',
      data: timeKeys.map(tk => {
        const p = dataMap.get(tk)?.get(model);
        return p ? Number(p[metricKey]) || 0 : 0;
      }),
      itemStyle: {
        color: MODEL_COLOR_PALETTE[index % MODEL_COLOR_PALETTE.length],
        borderRadius: index === models.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0],
      },
      barMaxWidth: 40,
    }));

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: models,
        top: 0,
        type: 'scroll',
      },
      grid: { left: 60, right: 30, top: 40, bottom: 30 },
      xAxis: {
        type: 'category',
        data: timeKeys,
        axisLabel: { rotate: timeKeys.length > 15 ? 45 : 0, fontSize: 11 },
      },
      yAxis: { type: 'value', name: yAxisName },
      series,
    };
  } else {
    const times = points.map((p: any) => p.timeKey);
    const values = points.map((p: any) =>
      Number(isTokens ? p.actualTokens || 0 : p.totalCost || 0)
    );
    const seriesName = isTokens ? "Tokens 消耗" : "积分消耗";
    const color = isTokens ? "#4f46e5" : "#f59e0b";
    option = {
      tooltip: { trigger: "axis" },
      grid: { left: 60, right: 30, top: 30, bottom: 30 },
      xAxis: {
        type: "category",
        data: times,
        axisLabel: { rotate: times.length > 15 ? 45 : 0, fontSize: 11 },
      },
      yAxis: { type: "value", name: yAxisName },
      series: [
        {
          name: seriesName,
          type: "bar",
          data: values,
          itemStyle: { color, borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 40,
        },
      ],
    };
  }

  chartInstance.setOption(option, true);
};

const handleResize = () => chartInstance?.resize();

// ==================== 调用日志 ====================
const fetchLogs = async () => {
  logsLoading.value = true;
  try {
    const params: any = { page: logsPage.value, size: logsPageSize.value };
    if (logsModel.value) params.model = logsModel.value;
    if (logsStatus.value) params.status = logsStatus.value;
    const res = await apiGetApiCallLogs(params);
    const data = res?.data || res;
    logs.value = data?.list || data?.records || [];
    logsTotal.value = data?.total || 0;
  } catch {
    // ElMessage.error("获取日志失败");
  } finally {
    logsLoading.value = false;
  }
};

const handleLogsPageChange = (page: number) => {
  logsPage.value = page;
  fetchLogs();
};

// Tab 切换时触发数据加载
watch(statsMetric, () => {
  if (statsDataPoints.value.length > 0) {
    const metricKey = statsMetric.value === "tokens" ? "actualTokens" : "totalCost";
    statsTotalMetric.value = statsDataPoints.value.reduce((s: number, p: any) => s + (Number(p[metricKey]) || 0), 0);
    renderChart(statsDataPoints.value, statsModelDataPoints.value);
  }
});

watch(activeTab, (tab) => {
  if (tab === "usage") {
    nextTick(() => fetchUsageStats());
  } else if (tab === "logs") {
    fetchLogs();
  }
});

onMounted(() => {
  fetchApiKeys();
  fetchModels();
  fetchUsage();
  fetchUserAuthors();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  chartInstance?.dispose();
});
</script>

<template>
  <div class="api-key-view">
    <div class="page-header">
      <div class="header-text">
        <h2>API Key 管理</h2>
        <p>管理您的 API 密钥，查看调用统计和使用量</p>
      </div>
      <button v-if="apiApplication" class="btn-primary" @click="createDialogVisible = true">
        <i class="fas fa-plus"></i> 创建密钥
      </button>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon"><i class="fas fa-key"></i></div>
        <div class="stat-info">
          <div class="stat-value">{{ apiKeys.length }}</div>
          <div class="stat-label">API Key 数量</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon calls"><i class="fas fa-chart-line"></i></div>
        <div class="stat-info">
          <div class="stat-value">{{ todayCalls }}</div>
          <div class="stat-label">今日调用次数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon tokens"><i class="fas fa-microchip"></i></div>
        <div class="stat-info">
          <div class="stat-value">{{ todayCredits.toLocaleString() }}</div>
          <div class="stat-label">今日 Tokens 消耗</div>
        </div>
      </div>
    </div>

    <!-- Tab 切换 -->
    <div class="tabs-wrapper">
      <div class="tabs">
        <button
          :class="['tab', { active: activeTab === 'keys' }]"
          @click="activeTab = 'keys'"
        >
          <i class="fas fa-key"></i> 密钥管理
        </button>
        <button
          :class="['tab', { active: activeTab === 'docs' }]"
          @click="activeTab = 'docs'"
        >
          <i class="fas fa-book"></i> API文档
        </button>
        <button
          :class="['tab', { active: activeTab === 'usage' }]"
          @click="activeTab = 'usage'"
        >
          <i class="fas fa-chart-area"></i> 用量统计
        </button>
        <button
          :class="['tab', { active: activeTab === 'logs' }]"
          @click="activeTab = 'logs'"
        >
          <i class="fas fa-list-alt"></i> 调用日志
        </button>
      </div>
    </div>

    <!-- 密钥管理 -->
    <div v-show="activeTab === 'keys'" class="content-card">
      <div v-if="loading" class="loading-state">加载中...</div>
      <div v-else-if="apiKeys.length === 0" class="empty-state">
        <i class="fas fa-key"></i>
        <p>暂无 API Key</p>
        <button v-if="apiApplication" class="btn-primary" @click="createDialogVisible = true">
          立即创建
        </button>
      </div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>名称</th>
            <th>密钥</th>
            <th>状态</th>
            <th>本月用量</th>
            <th>最后使用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="key in apiKeys" :key="key.id">
            <td class="key-name">{{ key.name }}</td>
            <td>
              <div class="key-display">
                <code class="key-value">{{ getDisplayKey(key) }}</code>
                <button
                  class="btn-icon"
                  @click="toggleShowFullKey(key)"
                  :disabled="loadingFullKeys.has(key.id)"
                >
                  <i
                    v-if="loadingFullKeys.has(key.id)"
                    class="fas fa-spinner fa-spin"
                  ></i>
                  <i
                    v-else
                    :class="
                      loadedFullKeys.has(key.id)
                        ? 'fas fa-eye-slash'
                        : 'fas fa-eye'
                    "
                  ></i>
                </button>
                <button
                  v-if="loadedFullKeys.has(key.id)"
                  class="btn-icon"
                  @click="copyKey(key)"
                >
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </td>
            <td>
              <span :class="['status-badge', getStatusType(key.status)]">{{
                getStatusText(key.status)
              }}</span>
            </td>
            <td>{{ key.monthlyUsage }} / {{ key.monthlyLimit || "不限" }}</td>
            <td class="text-muted">
              {{
                key.lastUsedAt
                  ? new Date(key.lastUsedAt).toLocaleString()
                  : "从未使用"
              }}
            </td>
            <td class="actions">
              <button
                :class="[
                  'btn-action',
                  key.status === 1 ? 'warning' : 'success',
                ]"
                @click="handleToggleStatus(key)"
              >
                <i
                  :class="key.status === 1 ? 'fas fa-pause' : 'fas fa-play'"
                ></i>
              </button>
              <button class="btn-action danger" @click="handleDelete(key)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- API文档 -->
    <div v-show="activeTab === 'docs'" class="content-card docs-card">
      <ApiDocsTab />
    </div>

    <!-- 用量统计 -->
    <div v-show="activeTab === 'usage'" class="content-card">
      <div class="filter-bar">
        <select v-model="statsApiKey" class="filter-select">
          <option :value="undefined">全部 Key</option>
          <option v-for="k in apiKeys" :key="k.id" :value="k.id">
            {{ k.name }}
          </option>
        </select>
        <select v-model="statsModel" class="filter-select">
          <option value="">全部模型</option>
          <option v-for="m in modelOptions" :key="m" :value="m">{{ m }}</option>
        </select>
        <div class="metric-toggle">
          <button
            :class="['metric-btn', { active: statsMetric === 'tokens' }]"
            @click="statsMetric = 'tokens'"
          >
            Tokens
          </button>
          <button
            :class="['metric-btn', { active: statsMetric === 'credits' }]"
            @click="statsMetric = 'credits'"
          >
            积分
          </button>
        </div>
        <el-date-picker
          v-model="statsDateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          :disabled-date="(d: Date) => d > new Date()"
          :clearable="true"
          style="width: 280px"
        />
        <select v-model="statsInterval" class="filter-select">
          <option value="Day">按天</option>
          <option value="Hour">按小时</option>
        </select>
        <button
          class="btn-primary btn-sm"
          @click="fetchUsageStats"
          :disabled="statsLoading"
        >
          {{ statsLoading ? "加载中..." : "查询" }}
        </button>
      </div>
      <div class="stats-summary" v-if="statsDataPoints.length > 0">
        <div class="summary-item">
          <span class="summary-label">调用次数</span>
          <span class="summary-value">{{ statsTotalCalls.toLocaleString() }}</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-item">
          <span class="summary-label">{{ statsMetric === 'tokens' ? 'Tokens 总量' : '积分总量' }}</span>
          <span class="summary-value">{{ statsTotalMetric.toLocaleString() }}</span>
        </div>
      </div>
      <div ref="chartRef" class="chart-container"></div>
    </div>

    <!-- 调用日志 -->
    <div v-show="activeTab === 'logs'" class="content-card">
      <div class="filter-bar">
        <select v-model="logsModel" class="filter-select">
          <option value="">全部模型</option>
          <option v-for="m in modelOptions" :key="m" :value="m">{{ m }}</option>
        </select>
        <select v-model="logsStatus" class="filter-select">
          <option value="">全部状态</option>
          <option value="succeeded">成功</option>
          <option value="failed">失败</option>
          <option value="queued">排队中</option>
          <option value="running">运行中</option>
        </select>
        <button
          class="btn-primary btn-sm"
          @click="
            logsPage = 1;
            fetchLogs();
          "
          :disabled="logsLoading"
        >
          {{ logsLoading ? "加载中..." : "查询" }}
        </button>
      </div>
      <div class="table-scroll">
        <table class="data-table logs-table">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>模型</th>
              <th>状态</th>
              <th>输入</th>
              <th>音频</th>
              <th>时长</th>
              <th>分辨率</th>
              <th>宽高比</th>
              <th>Token</th>
              <th>积分</th>
              <th>Draft</th>
              <th>创建时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="logsLoading && logs.length === 0">
              <td colspan="12" class="loading-state">加载中...</td>
            </tr>
            <tr v-else-if="logs.length === 0">
              <td colspan="12" class="empty-state small">暂无日志</td>
            </tr>
            <tr v-for="log in logs" :key="log.id">
              <td class="text-mono task-id-cell" :title="log.taskId">
                {{ log.taskId || "-" }}
              </td>
              <td>{{ log.model || "-" }}</td>
              <td>
                <span
                  :class="[
                    'status-badge',
                    log.status === 'succeeded' || log.status === '成功'
                      ? 'success'
                      : log.status === 'failed' || log.status === '失败'
                      ? 'danger'
                      : 'warning',
                  ]"
                  >{{ log.status }}</span
                >
              </td>
              <td>{{ log.inputType || "-" }}</td>
              <td>{{ log.audioMode || "-" }}</td>
              <td>{{ log.duration != null ? log.duration + "s" : "-" }}</td>
              <td>{{ log.resolution || "-" }}</td>
              <td>{{ log.ratio || "-" }}</td>
              <td>{{ log.actualTokens || 0 }}</td>
              <td>{{ log.actualCost || 0 }}</td>
              <td>{{ log.draft ? "是" : "否" }}</td>
              <td class="text-muted">
                {{
                  log.createTime
                    ? new Date(log.createTime).toLocaleString()
                    : log.createdAt
                    ? new Date(log.createdAt * 1000).toLocaleString()
                    : "-"
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="logsTotal > logsPageSize" class="pagination">
        <button
          class="btn-page"
          :disabled="logsPage <= 1"
          @click="handleLogsPageChange(logsPage - 1)"
        >
          上一页
        </button>
        <span class="page-info"
          >{{ logsPage }} / {{ Math.ceil(logsTotal / logsPageSize) }}</span
        >
        <button
          class="btn-page"
          :disabled="logsPage >= Math.ceil(logsTotal / logsPageSize)"
          @click="handleLogsPageChange(logsPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- 创建弹窗 -->
    <el-dialog v-model="createDialogVisible" title="创建 API Key" width="480px">
      <el-form label-width="80px">
        <el-form-item label="密钥名称">
          <el-input
            v-model="newKeyName"
            placeholder="请输入密钥名称，如：生产环境"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.api-key-view {
  max-width: 1200px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.header-text h2 {
  font-size: 1.8rem;
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 8px;
}
.header-text p {
  color: #64748b;
}

.btn-primary {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}
.btn-primary:hover {
  background: #4338ca;
}
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-sm {
  padding: 8px 16px;
  font-size: 0.85rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}
.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16px;
}
.stat-icon {
  width: 48px;
  height: 48px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}
.stat-icon.calls {
  background: #ecfdf5;
  color: #10b981;
}
.stat-icon.tokens {
  background: #fef3c7;
  color: #f59e0b;
}
.stat-value {
  font-size: 1.75rem;
  font-weight: 850;
  color: #0f172a;
}
.stat-label {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 600;
}

.tabs-wrapper {
  margin-bottom: 24px;
}
.tabs {
  display: flex;
  gap: 8px;
  background: white;
  padding: 6px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  width: fit-content;
}
.tab {
  background: none;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}
.tab:hover {
  color: #0f172a;
}
.tab.active {
  background: #4f46e5;
  color: white;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.docs-card {
  padding: 0;
  min-height: 600px;
}

.filter-bar {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  flex-wrap: wrap;
  align-items: center;
}
.filter-select,
.filter-input {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.85rem;
  background: white;
}
.filter-input {
  min-width: 150px;
}
.filter-select:focus,
.filter-input:focus {
  outline: none;
  border-color: #4f46e5;
}

.stats-summary {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 24px;
  border-bottom: 1px solid #f1f5f9;
}
.summary-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.summary-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
}
.summary-value {
  font-size: 1.1rem;
  color: #0f172a;
  font-weight: 800;
}
.summary-divider {
  width: 1px;
  height: 20px;
  background: #e2e8f0;
}

.chart-container {
  height: 380px;
  padding: 16px 24px;
}

.table-scroll {
  overflow-x: auto;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th {
  text-align: left;
  padding: 12px 16px;
  background: #f8fafc;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}
.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.85rem;
  color: #334155;
  white-space: nowrap;
}
.logs-table th,
.logs-table td {
  padding: 10px 12px;
  font-size: 0.8rem;
}

.key-name {
  font-weight: 700;
  color: #0f172a;
}
.key-display {
  display: flex;
  align-items: center;
  gap: 8px;
}
.key-value {
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.btn-icon {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: all 0.2s;
}
.btn-icon:hover:not(:disabled) {
  background: #f1f5f9;
  color: #4f46e5;
}
.btn-icon:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.status-badge {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}
.status-badge.success {
  background: #dcfce7;
  color: #166534;
}
.status-badge.warning {
  background: #fef3c7;
  color: #92400e;
}
.status-badge.danger {
  background: #fee2e2;
  color: #991b1b;
}

.text-muted {
  color: #94a3b8;
}
.text-mono {
  font-family: monospace;
  font-size: 0.8rem;
}
.task-id-cell {
  white-space: normal;
  word-break: break-all;
  max-width: 220px;
  min-width: 140px;
}

.metric-toggle {
  display: inline-flex;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}
.metric-btn {
  padding: 6px 16px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s;
}
.metric-btn.active {
  background: #4f46e5;
  color: white;
}
.metric-btn:hover:not(.active) {
  background: #f8fafc;
}

.actions {
  display: flex;
  gap: 8px;
}
.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.btn-action.success {
  background: #dcfce7;
  color: #166534;
}
.btn-action.warning {
  background: #fef3c7;
  color: #92400e;
}
.btn-action.danger {
  background: #fee2e2;
  color: #991b1b;
}
.btn-action:hover {
  transform: scale(1.1);
}

.empty-state {
  padding: 60px 24px;
  text-align: center;
  color: #94a3b8;
}
.empty-state.small {
  padding: 40px 24px;
}
.empty-state i {
  font-size: 3rem;
  margin-bottom: 16px;
  display: block;
}
.empty-state p {
  margin-bottom: 24px;
}
.loading-state {
  padding: 60px 24px;
  text-align: center;
  color: #94a3b8;
}

.pagination {
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #f1f5f9;
}
.btn-page {
  padding: 6px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-info {
  font-size: 0.85rem;
  color: #64748b;
}
</style>
