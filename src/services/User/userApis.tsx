import axios from "axios"

export const getUsers = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
}

export const getUserPosts = (userId: any) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
}
