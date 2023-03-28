import axios from "axios";

export const fetchComments = async () => {
    return await axios.get('http://localhost/api/comments')
}

export const addComment = async ({name, text, date}) => {
    return await axios.post('http://localhost/api/comments', {
        name, text, date
    })
}

export const deleteComment = async (id) => {
    return await axios.delete(`http://localhost/api/comments/${id}`)
}
