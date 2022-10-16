<template>
  <div class="todoapp">
    <h1>{{titleH1}}</h1>
    <input
        class="new-todo"
        type="text"
        placeholder="New Task"
        v-model="newTodo"
        @keyup.enter="addToDo"
    />
    <div class="">
        <ToDoList
            :toDos="toDoFilterTask"
            @editItem="editToDo"
            @removeItem="removeToDo"
            @checkAllToDoTasks="checkAllToDoTasks"
        />
        <ToDoFilter
            :toDos="toDos"
            @changeFilter="toDos => this.toDoFilterTask = toDos"
            @clearCompletedTask="clearCompletedTask"
        />
    </div>
  </div>
</template>

<script>
import ToDoList from './ToDoList.vue';
import ToDoFilter from './ToDoFilter.vue';

import TodoDataService from "../services/TodoDataService";

export default {
    components: {
        ToDoList,
        ToDoFilter,
    },
    data: () => ({
        titleH1: 'ToDo App',
        newTodo: '',
        toDos: [],
        toDoFilterTask: [],
    }),
    mounted() {
        this.getToDos();
    },
    methods: {
        getToDos() {
            TodoDataService.getAll()
                .then(response => this.toDos = response.data)
                // Error service
                .catch(e => console.log(e));
        },
        addToDo() {
            const newTodo = this.newTodo.trim();
            if (!newTodo.length) return;

            const data = {
                title: newTodo,
                completed: false,
            };
            this.postRequestService(TodoDataService.create(data));

            this.newTodo = '';
        },
        editToDo(data) {
            this.postRequestService(TodoDataService.update(data.id, data));
        },
        removeToDo(id) {
            this.postRequestService(TodoDataService.delete(id));
        },
        checkAllToDoTasks(event) {
            this.postRequestService(Promise.all(this.toDos.map(async (toDo) => {
                toDo.completed = event.target.checked;
                await TodoDataService.update(toDo.id, toDo);
            })));
        },
        clearCompletedTask() {
            this.postRequestService(Promise.all(this.toDos.map(async (toDo) => {
                if (toDo.completed)
                    await TodoDataService.delete(toDo.id);
            })));
        },
        postRequestService(service) {
            service
                .then(response => this.getToDos())
                // Error service
                .catch(e => console.log(e));
        }
    }
}
</script>
