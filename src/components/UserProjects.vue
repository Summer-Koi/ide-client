<template>
    <el-container>
        <el-header>
            <div class="header">
                <div class="title">
                    全部项目
                </div>
                <el-button type="primary" :icon="Plus" class="create" @click="dialogFormVisible = true">
                    新建项目
                </el-button>
            </div>
        </el-header>
        <el-main style="height:0;">
            <el-scrollbar>
                <div style="margin-bottom: 15px"></div>
                <el-space fill wrap style="width: 100%">
                    <el-card v-for="proj in projectList" :key="proj['proj_id']" class="project_card" shadow="hover">
                        <div class="card_content" @click="cardClicked(proj)">
                            <div class="project_name">
                                {{ proj.proj_name }}
                            </div>
                            <div class="project_date">
                                {{ proj.date }}
                            </div>
                            <el-divider direction="vertical" />
                            <div class="project_info_icon">
                                <el-popover placement="left" :width="150" trigger="hover" :hide-after="100">
                                    <div class="more_wrapper">
                                        <el-space direction="vertical" size="small">
                                            <el-button plain class="info_bt" @click="infoButtonClicked(proj, 'rename')">
                                                重命名</el-button>
                                            <el-button type="danger" plain class="info_bt"
                                                @click="infoButtonClicked(proj, 'delete')">删除</el-button>
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

    <el-dialog v-model="dialogFormVisible" title="新建项目">
        <el-form :model="form">
            <el-form-item label="项目名" :label-width="formLabelWidth">
                <el-input v-model="form.proj_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="项目类型" :label-width="formLabelWidth">
                <el-select v-model="form.pl_type" placeholder="Please select">
                    <el-option label="Python" value="python" />
                    <el-option label="Javascript" value="javascript" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="create_cancel">取消</el-button>
                <el-button type="primary" @click="create_apply">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="renameFormVisible" title="项目重命名">
        <el-form :model="form">
            <el-form-item label="原项目名" :label-width="formLabelWidth">
                <div>{{renameTargetName}}</div>
            </el-form-item>
            <el-form-item label="新项目名" :label-width="formLabelWidth">
                <el-input v-model="renameForm.proj_name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="rename_cancel">取消</el-button>
                <el-button type="primary" @click="rename_apply">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, unref, onMounted } from 'vue'
import * as axios from 'axios'
import {
    MoreFilled,
    Plus
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const projectList = ref([])

onMounted(() => {
    refresh_list();
})

//
// load
//

const refresh_list = function () {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/'
    })
        .then((res) => {
            let proj = res.data['projects']
            console.log(proj)
            let i = 0;
            for (i = 0; i < proj.length; i++) {
                let raw = proj[i].date;
                proj[i].date = raw.slice(0, 10) + ' ' + raw.slice(11, 19)
            }
            projectList.value.splice(0)
            projectList.value.push(...proj)
        })
}

//
// create
// 

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    proj_name: '',
    pl_type: '',
    location: 'nihao'
})

const create_cancel = function () {
    dialogFormVisible.value = false
}

const create_apply = function () {
    if (form.proj_name === '' || form.pl_type === '') {
        ElMessage({
            message: '请完善表单内容',
            type: 'warning',
        })
    }
    else {
        dialogFormVisible.value = false;
        console.log(JSON.stringify(form));
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/create',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(form)
        })
            .then((res) => {
                console.log(res.data)
                refresh_list();
            })

    }
}

//
// card
//

const renameFormVisible = ref(false)
const renameTargetId = ref(0)
const renameTargetName = ref('')
const renameForm = reactive({
    proj_name: ''
})

const infoButtonClicked = function (e: object, type: string) {
    console.log('info')
    console.log(e.proj_id)
    console.log(type)
    // DELETE
    if (type == 'delete') {
        axios({
            method: 'DELETE',
            url: 'http://127.0.0.1:5000/proj/' + e.proj_id,
        })
            .then((res) => {
                console.log(res.data)
                refresh_list();
            })
    }
    // RENAME
    else {
        renameFormVisible.value = true;
        renameTargetId.value = e.proj_id;
        renameTargetName.value = e.proj_name;
    }

}

const rename_cancel = function () {
    renameFormVisible.value = false;
}

const rename_apply = function () {
    if (renameForm.proj_name == '') {
        ElMessage({
            message: '请完善表单内容',
            type: 'warning',
        })
    }
    else {
        renameFormVisible.value = false;
        console.log(JSON.stringify(renameForm))
        axios({
            method: 'PUT',
            url: 'http://127.0.0.1:5000/proj/' + renameTargetId.value,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(renameForm)
        })
            .then((res) => {
                console.log(res.data)
                refresh_list();
            })
    }
}

const cardClicked = function (e: object) {
    console.log('clicked')
    console.log(e.proj_id)
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
    font-size: xx-large;
}

.create {
    position: relative;
    float: right;
}
</style>