import Axios from "axios";
import { server } from "../pages/constants";

export async function pinLogin(pin, email){
    return Axios.post(
        `${server}/auth/pincode`,
        {
            email: email,
            pincode: pin
        }
    ).then(res => {
        return res;
    })
    .catch(error =>{
        console.log(error);
        return error.response;
    }
    )
}