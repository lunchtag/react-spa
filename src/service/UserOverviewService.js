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


export async function updateUser() {
    return Axios.put(`${server}/account`,
        {
            lastName: "test"
        },
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

export async function disableById(id) {
    return Axios({
        method: 'POST',
        url: `${server}/account/disable/${id}`,
        headers: {
            'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log(error);
            return error;
        })
}