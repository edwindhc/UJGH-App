import { header } from '../helpers'
import axios from 'axios';

const getCurrentUser = () => {
    let local = JSON.parse(localStorage.getItem('user'))
    return local.user
}

const listProyects = async (user) => {
    try {
        const userId = getCurrentUser().id;
        const getUser = await axios.get(`/proyect?UserId=${userId}`, header())
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

const drop = async (proyect) => {
    try {

        const getUser = await axios.delete(`/proyect`, { data: { id: proyect } })
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

const download = async (proyect) => {
    try {
        const getUser = await axios.post(`/proyect/download`, proyect, header())
        if (getUser) return getUser;
    } catch (e) {
        console.log(e)
    }
}

export const proyect = {
    listProyects,
    drop,
    download
};