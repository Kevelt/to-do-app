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
                :class="{ editing : (toDo.id === currentEditID), completed : toDo.completed }"
            >
                <input
                    type="checkbox"
                    class="toggle"
                    v-model="toDo.completed"
                    @click="e => handleToggle(toDo)"
                />

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
                    @click="$emit('removeItem', toDo.id)"
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
            currentEditID: null
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
                this.currentEditID = toDo.id;
            },
            doneEdit(toDo) {
                const newTitle = toDo.title.trim();
                if (newTitle) {
                    this.$emit('editItem', {
                        ...toDo,
                        title: newTitle,
                    });
                }
                else {
                    toDo.title = this.cacheEdit;
                }
                this.currentEditID = null;
            },
            handleToggle(toDo) {
                this.$emit('editItem', {
                    ...toDo,
                    completed: !toDo.completed,
                });
            }
        },
        computed: {
            anyRemaingTask() {
                return !this.toDos?.filter(toDo => !toDo.completed).length;
            },
        },
    })
</script>
