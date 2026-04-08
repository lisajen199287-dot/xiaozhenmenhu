<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as newApi from "@/api/newApi/index";

interface LumiBilling {
  scene: string;
  value: string;
  operateUserId: string;
  eventTime: number;
  status: string;
  userId: string;
  uniqueMeasureId: string;
  updatedAt: number;
  createdAt: number;
  isApaasUser: boolean;
  userName?: string;
}

interface Pagination {
  pageNo: number;
  pageSize: number;
  total: number;
}

// Reactive state
const billingList = ref<LumiBilling[]>([]);
const loading = ref(false);
const pagination = ref<Pagination>({
  pageNo: 1,
  pageSize: 10,
  total: 0,
});

const dateRange = ref([] as string[]);
const searchParams = ref({
  createTime: [] as string[],
  pageNo: "1",
  pageSize: "10",
});

// Format timestamp to date string
const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};

// Scene dictionary
const sceneDict = {
  'ai_video_generation': '智能视频',
  'ai_picture_generation': '智能生图',
  'custom_training': '风格定制',
  'workflow_square': 'workflow 广场',
  'workflow_workbench': 'workflow 工作台',
  'batch_flow': '数据批量',
  'model_center': '模型中心'
};

// Status dictionary
const statusDict = {
  'confirm': '确认扣减',
  'cancel': '取消扣减',
  'withholding': '预扣减',
  'expire': '过期自动取消'
};

// Get scene display text
const getSceneText = (scene: string): string => {
  return sceneDict[scene] || scene;
};

// Get status display text
const getStatusText = (status: string): string => {
  return statusDict[status] || status;
};

// Fetch billing data
const fetchBillingData = async () => {
  loading.value = true;
  try {
    const response = await newApi.apiLumiPage({
      createTime: searchParams.value.createTime,
      pageNo: searchParams.value.pageNo,
      pageSize: searchParams.value.pageSize,
    });

    billingList.value = response.list || [];
    pagination.value.total = response.total || 0;
  } catch (error) {
    console.error("Failed to fetch billing data:", error);
  } finally {
    loading.value = false;
  }
};

// Handle search
const handleSearch = () => {
  pagination.value.pageNo = 1;
  searchParams.value.pageNo = "1";
  fetchBillingData();
};

// Handle date range change
const handleDateRangeChange = (val: string[] | null) => {
  if (val && val.length === 2) {
    searchParams.value.createTime = val;
  } else {
    searchParams.value.createTime = [];
  }
};

// Handle page change
const handlePageChange = (page: number) => {
  pagination.value.pageNo = page;
  searchParams.value.pageNo = page.toString();
  fetchBillingData();
};

// Handle page size change
const handlePageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.pageNo = 1;
  searchParams.value.pageSize = size.toString();
  searchParams.value.pageNo = "1";
  fetchBillingData();
};

// Initial data fetch
onMounted(fetchBillingData);
</script>

<template>
  <div class="user-dashboard">
    <div class="page-header">
      <div class="header-text">
        <h2>Lumi 账单列表</h2>
        <p>查看您的 Lumi 账单详细记录</p>
      </div>
    </div>

    <!-- Search Form -->
    <div class="content-card search-section">
      <div class="card-header">
        <h3>搜索条件</h3>
      </div>
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
            @change="handleDateRangeChange"
            :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
            style="width: 400px"
          />
        </div>
        <el-button type="primary" @click="handleSearch">
          <i class="fas fa-search"></i> 搜索
        </el-button>
      </div>
    </div>

    <!-- Billing Table -->
    <div class="content-card">
      <div class="card-header">
        <h3>账单记录</h3>
      </div>

      <el-table v-if="!loading" :data="billingList" style="width: 100%" stripe>
        <el-table-column prop="userName" label="用户名称" />
        <el-table-column prop="userId" label="炉米用户ID" />

        <el-table-column label="场景类型">
          <template #default="scope">
            {{ getSceneText(scope.row.scene) }}
          </template>
        </el-table-column>
        <el-table-column prop="value" label="消耗量" />
        <el-table-column prop="operateUserId" label="用户火山侧ID" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'confirm' ? 'success' : scope.row.status === 'cancel' ? 'danger' : scope.row.status === 'withholding' ? 'warning' : 'info'">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template #default="scope">
            {{ formatDate(scope.row.updatedAt) }}
          </template>
        </el-table-column>
      </el-table>

      <div v-if="loading" class="loading-state">
        <el-icon class="is-loading"><i-ep-loading /></el-icon>
        <span>数据加载中...</span>
      </div>

      <div v-if="!loading && billingList.length === 0" class="empty-state">
        <el-empty description="暂无账单记录" />
      </div>

      <!-- Pagination -->
      <div v-if="!loading && pagination.total > 0" class="pagination">
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
.user-dashboard {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
}

.page-header {
  margin-bottom: 8px;
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

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #334155;
  margin: 0;
}

.search-form {
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.form-group {
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  margin-right: 10px;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-range input {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  width: 200px;
}

.date-separator {
  color: #94a3b8;
  font-weight: 600;
}

.btn-search {
  background: #0f172a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  height: fit-content;
}

.btn-search:hover {
  background: #1e293b;
}

.loading-state,
.empty-state {
  padding: 80px;
  text-align: center;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.pagination {
  padding: 20px 24px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.is-loading {
  font-size: 24px;
  color: #409eff;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .user-dashboard {
    padding: 16px;
  }

  .billing-table th,
  .billing-table td {
    padding: 10px 16px;
    font-size: 0.85rem;
  }

  .date-range input {
    width: 160px;
  }
}
</style>
