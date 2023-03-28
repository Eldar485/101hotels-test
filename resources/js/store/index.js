import {createStore} from "vuex";
import {commentsStore} from "./commentsStore";

export default createStore({
    modules: {
        comments: commentsStore
    }
})
