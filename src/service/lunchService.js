import Axios from "axios";
import {server} from './constants.js'
//import auth from "./auth.js"

export async function getAllLunchesForUser(){
    return Axios.get(
        `${server}/lunch`,
        {
            headers:{
                'Authorization' : `Bearer ${window.sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        }
    )
    .then(res =>{
        return res;
    })
    .catch(error =>{
        console.log(error)
        return error.response;
    });
}

export async function addLunch(lunchDate){
    lunchDate.setHours(3)
    return Axios.post(
        `${server}/lunch`,
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
        return error.response
    })
}

export async function deleteLunch(lunchId){
    // const token = auth.parseJwt(window.sessionStorage.getItem("token"))
    return Axios.delete(`${server}/lunch/${lunchId}`,
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