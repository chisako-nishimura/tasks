// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue/dist/vue.esm';
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import axios from 'axios';
axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

Vue.use(window["vue-js-modal"].default);
Vue.use(Vuetify);

new Vue({
    vuetify: new Vuetify(),
    // icons: {
    //     iconfont:  'mdi'
    // },
    el: '.js-tasksIndex',
    data: {
        taskInfo: {},
        tasks: [],
        form:{
            id: '',
            title:'',
            content:'',
            status: '',
            user_id: '',
            user: '',
            creator: '',
        },
        valid: false,
        titleRules: [
            v => !!v || 'タイトルは必須です',
        ],
        contentRules: [
            v => !!v || '内容は必須です',
        ],
        creatorRules: [
            v => !!v || '担当者は必須です',
        ],
        statuses: [
            {text: '未処理', value: 'todo'},
            {text: '処理中', value: 'doing'},
            {text: '完了', value: 'done'}
        ],
        editIndex: -1,
        createFlg: false,
    },
    mounted: function() {
        this.fetchTasks();
    },
    methods: {
        fetchTasks() {
            this.tasks = [];
            axios.get('tasks.json').then((res) => {
                //console.dir(res.data)
                for(var i = 0; i < res.data.length; i++) {
                    this.tasks.push(res.data[i]);
                }
            }, (error) => {
                console.log(error);
            });
        },
        showModal(id){
            axios.get(`tasks/${id}.json`).then(res => {
                this.taskInfo = res.data;
                this.$modal.show('task-show-modal');
            });
        },
        showFormModal(task){
            if (task == null) {
                this.createFlg = true;
            } else {
                this.createFlg = false;
                this.editIndex = this.tasks.indexOf(task);
                this.form = Object.assign({}, task);
            }
            this.$modal.show('task-modal');
        },
        createTask: function (e) {
            this.$refs.form.validate();
            const task = Object.assign({},this.form);
            axios.post('tasks.json', { task: this.form }).then((res) => {
                this.tasks.unshift(res.data);
                this.$modal.hide('task-modal');
            }, (error) => {
                console.log(error);
            });
            e.preventDefault();
        },
        updateTask : function(e) {
            const task = this.tasks[this.editIndex];
            axios.patch('tasks/'+task.id+'.json', { task: this.form }).then((res) => {
                Object.assign(this.tasks[this.editIndex], this.form);
                this.$modal.hide('task-modal');
            }, (error) => {
                console.log(error);
            });
            e.preventDefault();
        },
        deleteTask(task) {
            if (!confirm('削除しますか？')) {
                return;
            }
            axios.delete('tasks/'+task.id+'.json').then((res) => {
                const index = this.tasks.indexOf(task);
                this.tasks.splice(index, 1);
            }, (error) => {
                console.log(error);
            });
        }
    }
});
