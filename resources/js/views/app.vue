<template>
    <div class="app">
        <v-notification></v-notification>
        <div class="loader" v-if="getLoading">
            <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        </div>
        <div class="wrapper" v-if="!getLoading">
            <div class="comments">
                <div class="comments__sorting">
                    <button @click="sort = 0" :class="{'active-page': sort === 0}">Id по возрастанию</button>
                    <button @click="sort = 1" :class="{'active-page': sort === 1}">Id по убыванию</button>
                    <button @click="sort = 2" :class="{'active-page': sort === 2}">Date по возрастанию</button>
                    <button @click="sort = 3" :class="{'active-page': sort === 3}">Date по убыванию</button>
                </div>
                <div class="comments__list">
                    <comment @delete="deleteComment($event)" v-for="comment in pagination" :key="comment.id"
                             :comment="comment"></comment>
                </div>
                <div class="comments__pagination" v-if="getTotalCommentsCount > 0">
                    <div class="comments__page" @click="selectPage('prev')"><</div>
                    <div class="comments__page"
                         v-for="page in getTotalPages"
                         :class="{'active-page': page === getPage + 1}"
                         @click="selectPage(page)">
                        {{ page }}
                    </div>
                    <div class="comments__page" @click="selectPage('next')">></div>
                </div>
                <form class="form">
                    <input class="form__input" v-model="message.name"  placeholder="Пользователь"/>
                    <textarea class="form__textarea" v-model="message.text"  placeholder="Сообщение"/>
                    <date-picker class="form__datepicker" v-model="message.date" value-type="format" placeholder="Выберите дату"></date-picker>
                    <button class="form__button" @click="checkForm($event)">Отправить</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Comment from "../component/comment";
import store from "../store";
import VInput from "../component/UI/v-Input";
import DatePicker from "vue2-datepicker";
import VNotification from "../component/UI/v-notification";

const default_layout = "default";

export default {
    components: {VNotification, Comment, VInput, DatePicker},
    data() {
        return {
            message: {
                name: '',
                text: '',
                date: ''
            },
            sort: 0
        }
    },
    mounted() {
        store.dispatch('comments/fetchComments')
    },
    methods: {
        checkForm(e) {
            e.preventDefault();
            if (this.message.name !== '' && this.message.text !== '' && this.message.date !== '') {
                this.sendComment();
                this.message.name = '';
                this.message.text = '';
                this.message.date = '';
                return
            }
            if (this.message.name === '') {
                store.commit('comments/setNotifications', {
                    title: 'Ошибка',
                    description: 'Введите имя пользователя',
                    type: 'error'
                });
                return
            }
            if (this.message.text === '') {
                store.commit('comments/setNotifications', {
                    title: 'Ошибка',
                    description: 'Введите сообщение',
                    type: 'error'
                });
                return
            }
            if (this.message.date === '') {
                store.commit('comments/setNotifications', {
                    title: 'Ошибка',
                    description: 'Выберите дату',
                    type: 'error'
                });
            }
        },
        sendComment() {
            store.dispatch('comments/addComment', this.message)
        },
        deleteComment(id) {
            store.dispatch('comments/deleteComment', id)
        },
        selectPage(page) {
            if (Number.isInteger(page)) {
                store.commit('comments/setPage', page - 1)
            }
            if (page === 'prev' && store.getters["comments/getPage"] !== 0) {
                store.commit('comments/setPage', store.getters["comments/getPage"] - 1)
            }
            if (page === 'next' && store.getters["comments/getPage"] !== store.getters["comments/getTotalPages"] - 1) {
                store.commit('comments/setPage', store.getters["comments/getPage"] + 1)
            }
        }
    },
    computed: {
        getLoading() {
            return store.getters["comments/getLoading"]
        },
        getPage() {
            return store.getters["comments/getPage"]
        },
        getTotalCommentsCount() {
            return store.getters["comments/getTotalCommentsCount"]
        },
        getComments() {
            return store.getters["comments/getComments"]
        },
        getTotalPages() {
            return store.getters["comments/getTotalPages"]
        },
        sortedComments() {
            if (this.sort === 0) {
                return [...this.getComments].sort((comm1, comm2) => comm1.id - comm2.id)
            }
            if (this.sort === 1) {
                return [...this.getComments].sort((comm1, comm2) => comm2.id - comm1.id)
            }
            if (this.sort === 2) {
                return [...this.getComments].sort((comm1, comm2) => new Date(comm1.date) - new Date(comm2.date))
            }
            if (this.sort === 3) {
                return [...this.getComments].sort((comm1, comm2) => new Date(comm2.date) - new Date(comm1.date))
            }
        },
        pagination() {
            const start = store.getters["comments/getPage"] * 3, end = start + 3;
            return this.sortedComments.slice(start, end);
        }
    }
};
</script>

<style lang="scss">
@import url('../../css/normalize.css');

body {
    background-color: #0a192f;
}
.wrapper {
    max-width: 1110px;
    margin: 0 auto;
    border: none;
}

.comments {
    &__form {
        margin-top: 2rem;
    }

    &__list {
        min-height: 590px;
    }

    &__pagination {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
    }

    &__sorting {
        margin-top: 5rem;
        display: flex;
        justify-content: space-around;

        button {
            min-width: 200px;
            padding: 1rem;
            border: 1px solid #6fc;
            background: none;
            color: #ffffff;
            cursor: pointer;

            &:hover {
                background-color: #133040;
            }
        }
    }

    &__page {
        color: #6fc;
        font-size: 1.2rem;
        padding: 0.2rem 0.5rem;
        border: 1px solid #6fc;
        margin-right: 1rem;
        cursor: pointer;

        &:hover {
            background-color: #133040;
        }
    }
}
.active-page {
    background-color: #133040 !important;
}
.loader {
    margin: 0 auto;

    .spinner {
        animation: rotate 2s linear infinite;
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -25px 0 0 -25px;
        width: 50px;
        height: 50px;

        & .path {
            stroke: hsl(210, 70, 75);
            stroke-linecap: round;
            animation: dash 1.5s ease-in-out infinite;
        }

    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
}
.form {
    border: 2px solid #6fc;
    padding: 2rem;
    margin: 1rem;

    &__input, &__textarea, &__button {
        outline: none;
        padding: 0.5rem;
        color: #ffffff;
        background: none;
        display: block;
        border: 1px solid #6fc;
        margin: 1rem 0;

        &:active, &:focus {
            background-color: #133040;
        }

        &::placeholder {
            color: #ffffff;
        }
    }

    &__input {
        height: 2rem;
    }

    &__textarea {
        width: 98.2%;
    }

    &__datepicker {
        i {
            display: none;
        }
        input {
            outline: none;
            padding: 0.5rem;
            color: #ffffff;
            background: none;
            border: 1px solid #6fc;
            margin: 1rem 0;

            &::placeholder {
                color: #ffffff;
            }
        }
    }

    &__button {
        width: 100%;
        cursor: pointer;
        font-size: 1.5rem;

        &:hover {
            background-color: #133040;
        }
    }
}
.mx-datepicker-main, .mx-datepicker-popup {
    background: #ffffff;
    cursor: pointer;
}

@media (max-width: 850px) {
    .comments {
        &__list {
            max-width: 90%;
            margin: 0 auto;
        }
        &__sorting {
            flex-direction: column;
            align-items: center;

            & > * {
                margin-bottom: 1rem;
                width: 90%;
            }
        }
    }
}
</style>
