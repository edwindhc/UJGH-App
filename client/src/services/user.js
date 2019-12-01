import { header } from '../helpers'
import axios from 'axios';

const getCurrentUser = () => {
    let local = JSON.parse(localStorage.getItem('user'))
    return local.user
}

const listUsers = async (options = {}) => {
    try {
        const { role } = options;
        const getUser = await axios.get(`/user${role ? '?role=' + role : ''}`, header())
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

const get = async (id) => {
    try {
        const getUser = await axios.get(`/user/${id}`, header())
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

const create = async (user) => {
    try {
        const getUser = await axios.post(`/user`, user, header())
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

const drop = async (user) => {
    try {
        const getUser = await axios.delete(`/user/${user}`)
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

const update = async (user) => {
    try {
        const getUser = await axios.patch(`/user/${user.id}`, user, header())
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

export const user = {
    listUsers,
    drop,
    create,
    get,
    update
};