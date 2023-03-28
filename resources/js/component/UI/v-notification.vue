<template>
    <div class="v-notification">
        <transition-group tag="div" class="messages_list">
            <div class="v-notification__content" :class="notification.type" v-for="notification in getNotifications" :key="notification.id">
                <div class="content__icon"></div>
                <div class="content__text">
                    <div class="text__title">{{ notification.title }}</div>
                    <div class="text__description">{{ notification.description }}</div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
import store from "../../store";

export default {
    computed: {
        getNotifications() {
            return store.getters["comments/getNotifications"]
        }
    },
    methods: {
        hideNotification() {
            let vm = this;
            if (this.getNotifications.length) {
                setTimeout(function() {
                    vm.getNotifications.splice(vm.getNotifications.length - 1, 1)
                }, 3000)
            }
        }
    },
}
</script>

<style scoped lang="scss">
.v-notification {
    position: fixed;
    top: 80px;
    right: 16px;
    z-index: 30;
    min-width: 20rem;

    &__content {
        z-index: 30;
        min-width: 10rem;
        padding: 16px;
        border-radius: 14px;
        color: #ffffff;
        display: flex;
        align-items: center;
        height: 50px;
        margin-bottom: 16px;
    }
}

.content__icon {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
}

.text {
    &__title {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
    }
}

.success {
    border: 2px solid #6fc;
    background: #133040;

    .content__icon {
        background: center / contain no-repeat url("../../../assets/icons/checked.svg")
    }
}
.error {
    border: 2px solid #6fc;
    background: #133040;

    .content__icon {
        background: center / contain no-repeat url("../../../assets/icons/error.png")
    }
}
.warning {
    border: 2px solid #6fc;
    background: #133040;

    .content__icon {
        background: center / contain no-repeat url("../../../assets/icons/warning.png")
    }
}

.v-transition-animate {
    &-enter-from {
        transform: translateX(120px);
        opacity: 0;
    }
    &-enter-active {
        transition: all .6s ease;
    }
    &-enter-to {
        opacity: 1;
    }
    &-leave-from {
        height: 50px;
        opacity: 1;
    }
    &-leave-active {
        transition: transform .6s ease, opacity .6s, height .6s .2s;
    }
    &-leave-to {
        height: 0;
        transform: translateX(120px);
        opacity: 0;
    }
    &-move {
        transition: transform .6s ease;
    }
}
</style>
