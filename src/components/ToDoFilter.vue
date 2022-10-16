<template>
    <footer class="footer">
        <div class="todo-count"><strong>{{remainingTask}}</strong> Items Left</div>
        <ul class="filters">
            <li
                v-for="(filter, key) of filters"
                :key="key"
            >
                <router-link :to="key">{{filter.title}}</router-link>
            </li>
            <li>
                <a
                    v-if="showClearBtn"
                    @click="$emit('clearCompletedTask')"
                >Clear Completed</a>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default ({
        props: {
            toDos: {
                type: Array,
                required: false,
                default : [],
            }
        },
        data: () => ({
            filters: {
                all: {
                    title: 'All',
                    condicion: toDo => toDo,
                },
                active: {
                    title: 'Active',
                    condicion: toDo => !toDo.completed,
                },
                completed: {
                    title: 'Completed',
                    condicion: toDo => toDo.completed,
                },
            },
        }),
        computed: {
            remainingTask() {
                return this.toDoFilterTask.length;
            },
            showClearBtn() {
                return !!this.toDos?.filter(toDo => toDo.completed).length;
            },
            toDoFilterTask() {
                let toDos = [...this.toDos];
                const currentFilter = this.$route?.params?.filter;
                const filter = this.filters[currentFilter];
                if (filter) toDos = toDos.filter(filter.condicion);
                return toDos;
            }
        },
        watch: {
            toDoFilterTask() {
                this.$emit('changeFilter', this.toDoFilterTask);
            }
        },
        mounted() {
            // Optional
            this.$emit('changeFilter', this.toDoFilterTask);
        },
    })
</script>
