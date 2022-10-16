<template>
    <main class="main">
        <input
            class="toggle-all"
            type="checkbox"
            :checked="anyRemaingTask"
            @change="e => $emit('checkAllToDoTasks', e)"
        />
        <label>Check All</label>
        <ul class="todo-list">
            <li
                v-for="(toDo, index) in toDos"
                :key="toDo.id"
                :index="index"
                :class="{ editing : toDo.editing, completed : toDo.completed }"
            >
                <input type="checkbox" class="toggle" v-model="toDo.completed" />
                <label
                    class="view"
                    @dblclick="editToDo(toDo)"
                >{{toDo.title}}</label>
                <input
                    class="edit"
                    type="text"
                    v-model="toDo.title"
                    @blur="doneEdit(toDo)"
                    @keyup.enter="doneEdit(toDo)"
                    v-focus
                />
                <div
                    class="destroy"
                    @click="$emit('removeItem', index)"
                ></div>
            </li>
        </ul>
    </main>
</template>

<script>
    export default ({
        props: {
            toDos: {
                type: Array,
                required: false,
                default : [],
            },
        },
        data: () => ({
            cacheEdit: '',
        }),
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus();
                }
            }
        },
        methods: {
            editToDo(toDo) {
                this.cacheEdit = toDo.title;
                toDo.editing = true;
            },
            doneEdit(toDo) {
                if (!toDo.title.trim()) {
                    toDo.title = this.cacheEdit;
                }
                toDo.editing = false;
            },
        },
        computed: {
            anyRemaingTask() {
                return !this.toDos?.filter(toDo => !toDo.completed).length;
            },
        },
    })
</script>
