import axios from 'axios';
import { header } from '../helpers'

const getCurrentUser = () => {
    let local = JSON.parse(localStorage.getItem('user'))
    return local.user
}
function currentUser(input = '') {
    let local = JSON.parse(localStorage.getItem('user'))
    if (local) {
        if (input === 'rol' || input === 'role') return local.user.role
        if (input === 'id') return local.user.id
        if (input === 'token') return local.token.accessToken
        return local;
    }
}

const listProyects = async (user) => {
    try {
        const userId = getCurrentUser().id;
        console.log(userId, ' userId')
        const getUser = await axios.get(`/proyects?UserId=${userId}`, header())
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

const register = async (user) => {
    const getUser = await axios.post('/auth/register', user)
    if (getUser) localStorage.setItem('user', JSON.stringify(getUser.data));
    return getUser;
}

const login = async (user) => {
    try {
        const getUser = await axios.post('/auth/login', user)
        if (getUser.status === 201 || getUser.status === 200) localStorage.setItem('user', JSON.stringify(getUser.data));
        return getUser;
    } catch (e) {
        return { status: 400, message: 'No hay conexión con el servidor' }
    }
}
export const auth = {
    login,
    register,
    currentUser,
    listProyects
};