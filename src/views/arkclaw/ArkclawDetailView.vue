<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { scenarios } from '@/data/arkclawData';
import { ArrowLeft, ArrowRight, Document, Headset, Operation, Collection, Mic, Service, Grid, Picture } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const currentIndex = ref(0);

const menuItems = [
  // { name: '智能营销平台问答助手', icon: Headset },
  // { name: '销售通话总结', icon: Document },
  // { name: '汽车客户画像抽取', icon: Operation },
  // { name: '保险客户画像抽取', icon: Collection },
  // { name: '售后反馈业务分类', icon: Service },
  // { name: '试驾试乘接待质检', icon: Grid },
  // { name: '录音文件识别 Plus', icon: Mic },
];

onMounted(() => {
  const id = Number(route.query.id);
  if (!isNaN(id) && id >= 0 && id < scenarios.length) {
    currentIndex.value = id;
  }
});

const currentScenario = computed(() => {
  return scenarios[currentIndex.value] || scenarios[0];
});

const selectScenario = (index: number) => {
  currentIndex.value = index;
  router.replace({ query: { id: index } });
  // 清除之前的聊天记录
  messages.value = [];
  // 重置当前步骤索引
  currentStepIndex.value = -1;
};

const goBack = () => {
  router.push('/arkclaw');
};

const inputText = ref('');
const messages = ref<any[]>([]);
const dialogVisible = ref(false);
const previewImage = ref('');
const currentStepIndex = ref(-1);

const handleCardClick = (step: any) => {
  if (step.EffectUrl) {
    // 获取当前步骤在数组中的索引
    const stepIndex = currentScenario.value.steps.findIndex((s: any) => s === step);
    // 只有当点击的步骤在当前已选择步骤的后面时，才添加到消息中
    if (stepIndex > currentStepIndex.value) {
      messages.value.push({
        type: 'effect',
        content: step.EffectUrl,
        label: step.label
      });
      // 更新当前步骤索引
      currentStepIndex.value = stepIndex;
    }
  }
};

const handlePreview = (image: string) => {
  previewImage.value = image;
  dialogVisible.value = true;
};
</script>

<template>
  <div class="agent-layout">
    <!-- Left Sidebar -->
    <aside class="sidebar">
      <div class="logo-area">
        <span class="logo-text"
          >智能营销平台 <span class="tag">Demo</span></span
        >
      </div>
      <div class="menu-group">
        <div class="back-btn" @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
        </div>
        <h3 class="menu-title">
          <el-icon><Grid /></el-icon>
          <span>智能体</span>
        </h3>
        <ul class="menu-list">
          <li
            v-for="(item, index) in scenarios"
            :key="'scenario-' + index"
            :class="['menu-item', { active: currentIndex === index }]"
            @click="selectScenario(index)"
          >
            <el-icon><Document /></el-icon>
            <span class="text-truncate">{{ item.title }}</span>
          </li>

          <li
            v-for="(item, idx) in menuItems"
            :key="'mock-' + idx"
            class="menu-item mock-item"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span class="text-truncate">{{ item.name }}</span>
          </li>
          <!-- <li class="menu-item mock-item">
            <el-icon><Headset /></el-icon>
            <span class="text-truncate">智能语音交互问答助手</span>
            <span class="status-tag">即将上线</span>
          </li> -->
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="header-actions">
        <span class="help-text"
          ><el-icon><Service /></el-icon> 接入文档</span
        >
        <div class="avatar-circle"></div>
      </div>

      <div class="chat-area">
        <div class="welcome-msg">
          <h1>👋 你好！</h1>
          <h2 class="assistant-title">我是智能营销 <span class="highlight">{{ currentScenario.title }}</span></h2>
          <p class="assistant-desc">{{ currentScenario.desc }}</p>
        </div>

        <div class="cards-section">
          <p class="cards-hint">你可以点击下方文件体验，也可以自己输入或上传文档：</p>
          <div class="cards-grid">
            <div
              v-for="(step, index) in currentScenario.steps"
              :key="index"
              class="action-card"
              @click="handleCardClick(step)"
            >
              <div class="card-img-wrapper">
                <img :src="step.image" alt="Step" class="card-img" />
              </div>
              <div class="card-footer">
                <el-icon class="file-icon"><Document /></el-icon>
                <span class="card-label">{{ step.label }}</span>
                <el-icon class="arrow-icon"><ArrowRight /></el-icon>
              </div>
            </div>
          </div>
        </div>

        <div class="messages-section" v-if="messages.length > 0">
          <div 
            v-for="(msg, index) in messages" 
            :key="index" 
            class="message-item"
          >
            <div class="message-content">
              <div class="message-label">{{ msg.label }}</div>
              <div class="message-image" @click="handlePreview(msg.content)">
                <img :src="msg.content" alt="Effect" class="effect-image" />
                <div class="preview-overlay">
                  <el-icon class="preview-icon"><Picture /></el-icon>
                  <span>点击预览</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="input-area">
        <div class="input-box">
          <input
            type="text"
            v-model="inputText"
            placeholder="问我任何问题..."
          />
          <div class="input-actions">
            <el-icon class="action-icon"><Collection /></el-icon>
            <el-icon class="send-icon"><Service /></el-icon>
          </div>
        </div>
        <p class="disclaimer">
          试用体验内容均由人工智能模型生成，不代表平台立场
        </p>
      </div>
    </main>

    <!-- Right Sidebar -->
    <aside class="info-sidebar">
      <h3 class="info-title">智能体信息</h3>

      <div class="info-section">
        <h4>描述</h4>
        <p>{{ currentScenario.desc }}</p>
      </div>

      <div class="info-section">
        <h4>能力</h4>
        <div class="ability-tag">
          <el-icon><Document /></el-icon> 信息提取
        </div>
        <a href="#" class="config-link">查看抽签配置</a>
      </div>

      <!-- <div class="info-section">
        <h4>模型</h4>
        <div class="model-tag">
          <el-icon><Operation /></el-icon> Doubao-雷音大模型
        </div>
      </div> -->

      <div class="info-section">
        <h4>邀约数据</h4>
        <ul class="data-list">
          <li v-for="(step, index) in currentScenario.steps" :key="index">
            <el-icon><Document /></el-icon>
            <span class="text-truncate">{{ step.label }}</span>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Image Preview Dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="效果预览"
      width="80%"
      center
    >
      <div class="preview-container">
        <img 
          v-if="previewImage" 
          :src="previewImage" 
          alt="Preview" 
          class="preview-img"
        />
        <div v-else class="preview-placeholder">
          <el-icon class="placeholder-icon"><Picture /></el-icon>
          <p>暂无预览图片</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.agent-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Left Sidebar */
.sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
}

.logo-area {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  .logo-text {
    font-weight: 600;
    font-size: 16px;
    color: #303133;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tag {
    font-size: 12px;
    background: #f0f2f5;
    color: #909399;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: normal;
  }
}

.menu-group {
  padding: 10px 0;
  flex: 1;
  overflow-y: auto;
}

.back-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #dcdfe6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 20px 20px;
  cursor: pointer;
  color: #606266;

  &:hover {
    background: #f5f7fa;
  }
}

.menu-title {
  padding: 0 20px;
  font-size: 14px;
  color: #909399;
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  transition: all 0.3s;

  &:hover {
    background: #f5f7fa;
  }

  &.active {
    background: #f0f5ff;
    color: #409eff;
    border-right: 3px solid #409eff;
    font-weight: 500;
  }

  &.mock-item {
    color: #909399;
  }
}

.status-tag {
  font-size: 12px;
  background: #f0f2f5;
  color: #409eff;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: auto;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: relative;
}

.header-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 30px;
  gap: 20px;

  .help-text {
    font-size: 14px;
    color: #606266;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .avatar-circle {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
  }
}

.chat-area {
  flex: 1;
  padding: 20px 10%;
  overflow-y: auto;
}

.welcome-msg {
  margin-bottom: 40px;

  h1 {
    font-size: 28px;
    margin-bottom: 10px;
    color: #303133;
  }

  .assistant-title {
    font-size: 24px;
    color: #303133;
    margin-bottom: 16px;

    .highlight {
      color: #409eff;
    }
  }

  .assistant-desc {
    color: #606266;
    font-size: 14px;
  }
}

.cards-hint {
  color: #606266;
  font-size: 14px;
  margin-bottom: 16px;
}

.cards-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.action-card {
  width: 220px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  background: #fff;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #c0c4cc;
  }

  .card-img-wrapper {
    height: 120px;
    background: #f5f7fa;
    overflow: hidden;

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-footer {
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f0f5ff;

    .file-icon {
      color: #409eff;
    }

    .card-label {
      flex: 1;
      font-size: 13px;
      color: #303133;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .arrow-icon {
      color: #909399;
    }
  }
}

.input-area {
  padding: 20px 10%;
  background: #ffffff;

  .input-box {
    display: flex;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    padding: 12px 16px;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      color: #303133;

      &::placeholder {
        color: #c0c4cc;
      }
    }

    .input-actions {
      display: flex;
      gap: 16px;
      align-items: center;

      .action-icon {
        color: #909399;
        font-size: 18px;
        cursor: pointer;
      }

      .send-icon {
        color: #409eff;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }

  .disclaimer {
    text-align: center;
    font-size: 12px;
    color: #c0c4cc;
    margin-top: 12px;
  }
}

/* Right Sidebar */
.info-sidebar {
  width: 280px;
  background: #ffffff;
  border-left: 1px solid #ebeef5;
  padding: 24px;
  overflow-y: auto;
}

.info-title {
  font-size: 16px;
  color: #303133;
  margin-bottom: 24px;
  font-weight: 600;
}

.info-section {
  margin-bottom: 24px;

  h4 {
    font-size: 13px;
    color: #909399;
    margin-bottom: 12px;
    font-weight: normal;
  }

  p {
    font-size: 13px;
    color: #606266;
    line-height: 1.6;
  }
}

.ability-tag,
.model-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 13px;
  color: #303133;
}

.config-link {
  display: inline-block;
  margin-left: 12px;
  font-size: 13px;
  color: #409eff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.data-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    font-size: 13px;
    color: #409eff;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

/* Messages Section */
.messages-section {
  margin-top: 40px;
  border-top: 1px solid #ebeef5;
  padding-top: 20px;
}

.message-item {
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-content {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #ebeef5;
}

.message-label {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 12px;
}

.message-image {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  &:hover .preview-overlay {
    opacity: 1;
  }
}

.effect-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
  
  .preview-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  span {
    font-size: 14px;
    font-weight: 500;
  }
}

/* Preview Dialog */
.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 20px;
}

.preview-img {
  max-width: 100%;
  max-height: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.preview-placeholder {
  text-align: center;
  color: #909399;
  padding: 60px 0;
  
  .placeholder-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 16px;
  }
}
</style>