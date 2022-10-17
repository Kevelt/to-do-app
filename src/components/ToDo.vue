<template>
  <div class="todoapp">
    <h1>{{titleH1}}</h1>
    <input
        class="new-todo"
        type="text"
        placeholder="New Task"
        v-model="newTodo"
        @keyup.enter="addToDo"
        autofocus
    />
    <div :class="{hidden: !hiddenList}">
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
            const dataToUpdate = [];
            const newValue = event.target.checked;
            this.toDos.map(async (toDo) => {
                if (newValue !== toDo.completed) {
                    toDo.completed = newValue;
                    dataToUpdate.push(toDo);
                }
            });
            this.postRequestService(TodoDataService.updateMulti(dataToUpdate));
        },
        clearCompletedTask() {
            const dataToRemove = [];
            this.toDos.map(async (toDo) => {
                if (toDo.completed)
                    dataToRemove.push(toDo);
            });
            this.postRequestService(TodoDataService.deleteMulti(dataToRemove));
        },
        postRequestService(service) {
            service
                .then(response => this.getToDos())
                // Error service
                .catch(e => console.log(e));
        }
    },
    computed: {
        hiddenList(){
            return !!this.toDos.length;
        }
    }
}
</script>

<style>
    :focus {
        outline: 0;
    }

    .hidden {
        display: none;
    }

    .todoapp {
        background: #fff;
        margin: 130px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                    0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    .todoapp input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp h1 {
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }

    .new-todo,
    .edit {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .new-todo {
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
</style>
