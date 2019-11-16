import axios from 'axios';

const register = async (user) => {
    const getUser = await axios.post('/auth/register', user)
    if (getUser) localStorage.setItem('user', JSON.stringify(getUser.data));
    return getUser;
}

const login = async (user) => {
    const getUser = await axios.post('/auth/login', user)
    if (getUser) localStorage.setItem('user', JSON.stringify(getUser.data));
    console.log(getUser, ' getUser')
    return getUser;
}
export const auth = {
    login,
    register
};