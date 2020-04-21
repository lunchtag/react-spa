import Axios from 'axios';
import { server } from './constants';

export async function getAllUsers() {
    return Axios.get(`${server}/account/all`,
        {
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            return res;
        })
        .catch(error => {
            return error;
        })
}


export async function getUserById() {

}

export async function disableById(id) {
    return Axios.delete(`${server}/deleteSingleUser/${id}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            return error;
        })
}