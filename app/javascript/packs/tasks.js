import Vue from 'vue/dist/vue.esm';
import axios from 'axios';
axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

Vue.use(window["vue-js-modal"].default);

new Vue({
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
            user_name: '',
            created_by: '',
            created_name: '',
        },
        editIndex: -1,
        createFlg: false,
    },
    mounted: function() {
        this.fetchTasks();
    },
    methods: {
        fetchTasks() {
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
                //this.taskInfoBool = true;
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
            const task = Object.assign({},this.form);


            axios.post('tasks.json', { task: this.form }).then((res) => {
                //this.$router.push({ path: '/' });
                this.tasks.push(task);
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