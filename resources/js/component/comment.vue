<template>
    <div class="comment">
        <div class="comment__title">
            <em class="comment__name">{{ comment.id }}. {{ comment.name }}</em>
            <button @click="deleteComment()"></button>
        </div>
        <div class="comment__text">{{ comment.text }}</div>
        <div class="comment__date">{{ comment.date }}</div>
    </div>
</template>

<script>

export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteComment() {
            this.$emit('delete', this.comment.id)
        }
    }
}
</script>

<style scoped lang="scss">
.comment {
    border: 2px solid #6fc;
    word-break: break-all;
    max-width: 90%;
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem auto;
    color: #ffffff;

    & > * {
        margin: 1rem 0;
    }

    &__text {
        margin: 2rem 0;
    }

    &__date {
        text-align: right;
    }

    &__name {
        font-size: 1.5rem;
    }

    &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 1rem;

        button {
            cursor: pointer;
            border: 1px solid #6fc;
            background-color: #0a192f;
            width: 2rem;
            height: 2rem;

            &:before {
                content: '';
                display: block;
                width: 1.5rem;
                height: 2px;
                background-color: #6fc;
                transform: rotate(45deg) translate(-1px, 3px);
            }
            &:after {
                content: '';
                display: block;
                width: 1.5rem;
                height: 2px;
                background-color: #6fc;
                transform: rotate(-45deg) translate(-1px, -2px);
            }

            &:hover {
                background-color: #133040;
            }
        }
    }
}
</style>
