import {addComment, deleteComment, fetchComments} from "../http/commentsAPI";

export const commentsStore = {
    state: () => ({
        comments: [],
        totalCommentsCount: 0,
        totalPages: 0,
        page: 0,
        loading: false,
        notifications: []
    }),

    getters: {
        getComments: state => state.comments,
        getTotalCommentsCount: state => state.totalCommentsCount,
        getPage: state => state.page,
        getTotalPages: state => state.totalPages,
        getLoading: state => state.loading,
        getNotifications: state => state.notifications
    },
    mutations: {
        setNotifications(state, notification) {
            notification.id = Date.now().toLocaleString();
            state.notifications.unshift(notification);
            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id !== notification.id)
            }, 3000);
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setComments(state, comments) {
            state.comments = comments;
        },
        setTotalCommentsCount(state, count) {
            state.totalCommentsCount = count;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        }
    },
    actions: {
        async fetchComments({commit}) {
            commit('setLoading', true)
            try {
                const response = await fetchComments();
                commit('setTotalCommentsCount', response.data.length);
                commit('setTotalPages', Math.ceil(response.data.length / 3));
                commit('setComments', response.data);
            } catch (e) {
                commit('setNotifications', {
                    title: 'Ошибка',
                    description: 'Ошибка при подгрузки комментариев',
                    type: 'error'
                });
            } finally {
                commit('setLoading', false)
            }
        },
        async addComment({state, commit}, comment) {
            commit('setLoading', true)
            try {
                await addComment(comment);
                this.dispatch('comments/fetchComments');
                commit('setNotifications', {
                    title: 'Успешно',
                    description: 'Комментарий добавлен',
                    type: 'success'
                });
            } catch (e) {
                commit('setNotifications', {
                    title: 'Ошибка',
                    description: 'Ошибка при добавлении комментария',
                    type: 'error'
                });
            }
        },
        async deleteComment({state, commit}, id) {
            commit('setLoading', true)
            try {
                await deleteComment(id);
                this.dispatch('comments/fetchComments');
                commit('setPage', 0)
                commit('setNotifications', {
                    title: 'Успешно',
                    description: 'Комментарий удалён',
                    type: 'success'
                });
            } catch (e) {
                commit('setNotifications', {
                    title: 'Ошибка',
                    description: 'Ошибка при удалении комментария',
                    type: 'error'
                });
            }
        },
    },
    namespaced: true
}
