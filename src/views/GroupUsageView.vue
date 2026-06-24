<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUser } from "@/utils/userStore";
import * as newApi from "@/api/newApi/index";

interface UsageItem {
  id: number;
  settleTime: string;
  userId: number;
  userName: string;
  model: string;
  resolution: string;
  ratio: string;
  duration: number;
  actualCost: number;
  inputType: string;
  audioMode: string;
  framespersecond: number;
}

interface Pagination {
  pageNo: number;
  pageSize: number;
  total: number;
}

const router = useRouter();
const { logout } = useUser();

const loading = ref(false);
const list = ref<UsageItem[]>([]);
const dateRange = ref<string[]>([]);
const pagination = ref<Pagination>({
  pageNo: 1,
  pageSize: 10,
  total: 0,
});

const totalCost = computed(() => {
  return list.value.reduce((sum, item) => sum + (item.actualCost || 0), 0);
});

const formatDateTime = (value: string): string => {
  return value ? value.replace("T", " ") : "-";
};

const formatInputType = (value: string): string => {
  if (value === "with_video") return "参考视频";
  return "无参考";
};

const formatAudioMode = (value: string): string => {
  if (value === "audio") return "有音频";
  return "无声";
};

const setDefaultDateRange = () => {
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) => {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  dateRange.value = [fmt(start), fmt(end)];
};

const fetchData = async () => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    ElMessage.warning("请选择时间范围");
    return;
  }
  loading.value = true;
  try {
    const res = await newApi.getGroupApiKeyTaskUsagePage({
      startTime: dateRange.value[0],
      endTime: dateRange.value[1],
      pageNo: pagination.value.pageNo,
      pageSize: pagination.value.pageSize,
    });
    list.value = res.list || [];
    pagination.value.total = res.total || 0;
  } catch (error: any) {
    ElMessage.error(error?.message || "查询失败");
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  pagination.value.pageNo = 1;
  fetchData();
};

const handleDateRangeChange = (val: string[] | null) => {
  if (!val || val.length !== 2) {
    dateRange.value = [];
  }
};

const handlePageChange = (page: number) => {
  pagination.value.pageNo = page;
  fetchData();
};

const handlePageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.pageNo = 1;
  fetchData();
};

const handleExport = async () => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    ElMessage.warning("请选择时间范围");
    return;
  }
  try {
    const blob = await newApi.exportGroupApiKeyTaskUsage({
      startTime: dateRange.value[0],
      endTime: dateRange.value[1],
    });
    const url = window.URL.createObjectURL(blob as Blob);
    const link = document.createElement("a");
    const startStr = dateRange.value[0].split(" ")[0];
    const endStr = dateRange.value[1].split(" ")[0];
    link.href = url;
    link.download = `积分消耗明细_${startStr}_${endStr}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    ElMessage.error(error?.message || "导出失败");
  }
};

const handleLogout = async () => {
  try {
    await logout();
  } catch {
    // ignore logout API error
  }
  router.push("/login/password");
};

onMounted(() => {
  setDefaultDateRange();
  fetchData();
});
</script>

<template>
  <div class="group-usage-page">
    <div class="page-header">
      <div class="header-text">
        <h2>积分消耗明细</h2>
        <p>查看您所在用户组的积分消耗记录</p>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="handleExport">
          <i class="fas fa-download"></i> 导出数据
        </el-button>
        <el-button @click="handleLogout">退出登录</el-button>
      </div>
    </div>

    <div class="content-card search-section">
      <div class="search-form">
        <div class="form-group">
          <label>时间范围</label>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
            :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
            @change="handleDateRangeChange"
            style="width: 400px"
          />
        </div>
        <el-button type="primary" @click="handleSearch">
          <i class="fas fa-search"></i> 查询
        </el-button>
      </div>
      <div class="summary">
        共 <span class="highlight">{{ pagination.total }}</span> 条，合计积分消耗
        <span class="highlight">{{ totalCost }}</span>
      </div>
    </div>

    <div class="content-card">
      <el-table v-loading="loading" :data="list" style="width: 100%" stripe>
        <el-table-column prop="settleTime" label="日期 & 时间" width="180">
          <template #default="scope">
            {{ formatDateTime(scope.row.settleTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="model" label="模型" />
        <el-table-column prop="resolution" label="分辨率" />
        <el-table-column prop="ratio" label="比例" />
        <el-table-column prop="duration" label="时长" />
        <el-table-column prop="inputType" label="输入类型">
          <template #default="scope">
            {{ formatInputType(scope.row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column prop="audioMode" label="音频模式">
          <template #default="scope">
            {{ formatAudioMode(scope.row.audioMode) }}
          </template>
        </el-table-column>
        <el-table-column prop="actualCost" label="积分消耗" />
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.pageNo"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handlePageSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-usage-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  min-height: 100vh;
  background: #f8fafc;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.header-text h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.header-text p {
  color: #64748b;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 20px 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.search-form {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  color: #334155;
  font-size: 0.9rem;
}

.summary {
  margin-top: 16px;
  color: #475569;
}

.highlight {
  color: #4f46e5;
  font-weight: 700;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
