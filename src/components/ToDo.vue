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

export default {
    components: {
        ToDoList,
        ToDoFilter,
    },
    data: () => ({
        titleH1: 'ToDo App',
        newTodo: '',
        idForTodo: 0,
        toDos: [],
        toDoFilterTask: [],
    }),
    methods: {
        addToDo() {
            if (!this.newTodo.trim().length) return;
            this.toDos.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
                editing: false,
            });

            this.newTodo = '';
            this.idForTodo++;
        },
        removeToDo(index) {
            this.toDos.splice(index, 1);
        },
        checkAllToDoTasks(event) {
            this.toDos.forEach((toDo) => toDo.completed = event.target.checked);
        },
        clearCompletedTask() {
            this.toDos = this.toDos.filter(toDo => !toDo.completed);
        },
    }
}
</script>
