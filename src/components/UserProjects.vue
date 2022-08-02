<template>
    <el-container>
        <el-header>
            <div class="header"> 
                <div class="title">
                    全部项目
                </div>
                <el-button type="primary" :icon="Plus" class="create">
                新建项目
            </el-button>
            </div>
        </el-header>
        <el-main style="height:0;">
            <el-scrollbar>
                <div style="margin-bottom: 15px"></div>
                <el-space fill wrap style="width: 100%">
                    <el-card v-for="proj in projectList" :key="proj['date']" class="project_card" shadow="hover">
                        <div class="card_content" @click="cardClicked">
                            <div class="project_name">
                                {{ proj.proj_name }}
                            </div>
                            <div class="project_date">
                                {{ proj.date }}
                            </div>
                            <el-divider direction="vertical" />
                            <div class="project_info_icon">
                                <el-popover placement="left" :width="150" trigger="hover"
                                    :hide-after="100">
                                    <div class="more_wrapper">  
                                        <el-space direction="vertical" size="small">
                                            <el-button plain class="info_bt" @click="infoButtonClicked(proj, 'rename')">重命名</el-button>
                                            <el-button type="danger" plain class="info_bt" @click="infoButtonClicked(proj, 'delete')">删除</el-button>
                                        </el-space>
                                    </div>
                                    <template #reference>
                                        <el-button :icon="MoreFilled" size="small" circle />
                                    </template>
                                </el-popover>
                            </div>
                        </div>
                    </el-card>
                </el-space>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'
import {
    MoreFilled,
    Plus
} from '@element-plus/icons-vue'

const currentDate = ref(new Date())

const projectList = [
    {
        date: '2202-12-12',
        proj_id: 1,
        proj_name: 'example project1',
        pl_type: 'python',
        ui_state:{
        }
    },
    {
        date: '1949-10-01',
        proj_id: 2,
        proj_name: 'example project2',
        pl_type: 'javascript',
        ui_state:{
        }
    },
    {
        date: '1926-08-17',
        proj_id: 3,
        proj_name: 'example project3',
        pl_type: 'javascript',
        ui_state:{
        }
    }
]

const selectedProject = ref('')
const infoButtonClicked = function (e:object, type:string) {
    console.log(e)
    console.log(type)
}
const cardClicked = function () {
    console.log('qaq')
}

</script>

<style scoped>
.project_card {
    text-align: left;
}

.card_content {
    display: flex;
    align-items: center;
}

.more_wrapper {
    text-align: center;
}

.info_bt {
    width: 140px;
    margin-left: 0;
}

.project_name {
    flex: 1 1 auto;
}

.project_date {
    flex: 0 0 auto;
    color: gray;
}

/* header */
.header {
    text-align: left;
}
.title {
    position: relative;
    top: 30px;
    left: 10px;
    font-size:xx-large;
}

.create {
    position: relative;
    float: right;
}
</style>