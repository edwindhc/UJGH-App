import axios from 'axios';

function currentUser(input = '') {
    let local = JSON.parse(localStorage.getItem('user'))
    if (local) {
        if (input === 'rol' || input === 'role') return local.user.role
        if (input === 'id') return local.user.id
        if (input === 'token') return local.token.accessToken
        return local;
    }
}

const register = async (user) => {
    const getUser = await axios.post('/auth/register', user)
    if (getUser) localStorage.setItem('user', JSON.stringify(getUser.data));
    return getUser;
}

const login = async (user) => {
    const getUser = await axios.post('/auth/login', user)
    if (getUser) localStorage.setItem('user', JSON.stringify(getUser.data));
    return getUser;
}
export const auth = {
    login,
    register,
    currentUser
};