import Axios from "axios";
import {server} from './constants.js'
import auth from "./auth.js"

export async function getAllLunchesForUser(){
    const token = auth.parseJwt(window.sessionStorage.getItem("token"))
    return Axios.get(
        `${server}/accounts/${token.sub}/lunches`,
        {
            headers:{
                'Authorization' : `Bearer ${window.sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        }
    )
    .then(res =>{
        return res.data;
    })
    .catch(error =>{
        console.log(error)
        return null
    });
}

export async function addLunch(lunchDate){
    const token = auth.parseJwt(window.sessionStorage.getItem("token"))
    lunchDate.setHours(3)
    return Axios.post(
        `${server}/accounts/${token.sub}/lunches`,
        {
            date: lunchDate.toISOString()
        },
        {
            headers:{
                'Authorization' : `Bearer ${window.sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }
    )
    .then(res =>{
        return res;
    })
    .catch(error =>{
        console.log(error)
        return null;
    })
}

export async function deleteLunch(lunchId){
    const token = auth.parseJwt(window.sessionStorage.getItem("token"))
    return Axios.delete(`${server}/accounts/${token.sub}/lunches/${lunchId}`,
    {
        headers:{
            'Authorization' : `Bearer ${window.sessionStorage.getItem('token')}`
        }
    }).then(res =>{
        return res;
    })
    .catch(error =>{
        console.log(error);
        return null;
    })
}