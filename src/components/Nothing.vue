<template>
    <button @click="testc">button</button>
    <div id="editor-container" class="code-editor"></div>
</template>

<script>
import { getCurrentInstance, onMounted, watch, ref } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
    getWorker(_, label) {
        console.log(label)
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    },
};
export default {
    props: {
        value: String,
    },
    setup(props, { emit }) {
        let monacoEditor = null;

        watch(
            () => props.value,
            (value) => {
                // 防止改变编辑器内容时光标重定向
                if (value !== monacoEditor?.getValue()) {
                    monacoEditor.setValue(value);
                }
            },
        );
        const mylinenum = function (num) {
            let tiangan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
            let dizhi = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
            return tiangan[Math.floor(((num-1) % 60) / 12)] + dizhi[((num-1) % 60) % 12]
        }
        onMounted(() => {
            monacoEditor = monaco.editor.create(document.getElementById('editor-container'), {
                value: props.value,
                readOnly: false,
                language: 'verilog',
                selectOnLineNumbers: true,
                renderSideBySide: false,
                lineNumbers: mylinenum
            });
            // 监听值变化
            monacoEditor.onDidChangeModelContent(() => {
                const currenValue = monacoEditor?.getValue();
                emit('update:value', currenValue);
            });
        });

        const testc = function () {
            monacoEditor.updateOptions(
                {
                    lineNumbers: 'off'
                }
            )
            console.log('clicked')
        }



        return {
            testc
        };
    },
};
</script>

<style>
.code-editor {
    width: 100%;
    height:1000px;
}
</style>