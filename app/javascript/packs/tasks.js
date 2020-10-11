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
        taskInfoBool: false,
        msg: "test",
        tasks: [],
        form:{
            title:'',
            content:'',
            status: '',
            user_id: '',
            created_by: '',
        },
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
        setTaskInfo(id){
            axios.get(`tasks/${id}.json`).then(res => {
                this.taskInfo = res.data;
                this.taskInfoBool = true;
            });
        },
        showModal(){
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
        }

    }
});