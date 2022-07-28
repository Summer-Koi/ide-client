<template>
    <el-container>
        <el-header> Header </el-header>
        <el-main>
            <el-scrollbar height="500px">
            <el-space :fill="true" wrap>
                <el-card v-for="i in 10" :key="i" class="box-card" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span>Name</span>
                            <el-button class="button" text>Button</el-button>
                        </div>
                    </template>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{ 'List item ' + o }}
                    </div>
                </el-card>
            </el-space>
            </el-scrollbar>
        </el-main>
        <el-footer> Footer </el-footer>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentDate = ref(new Date())

const projectList = [
    {
        date: '123',
        proj_id: 1,
        proj_name: 'test',
        pl_type: 'p'
    },
    {
        date: '456',
        proj_id: 2,
        proj_name: 'test2',
        pl_type: 'j'
    },
]

</script>

<style>
</style>