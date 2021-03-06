import axios from 'axios';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { authorized } from '../_actions/userAction';

import { API_DOMAIN } from '../utils/Env';

export default function (SpectificComponent, option){
    function AuthenticationCheck(props) {
        
        const dispatch = useDispatch();
        const refresh = () => {
            axios.defaults.baseURL = API_DOMAIN;
            axios.defaults.headers = {
                'Authorization' : "expired Token"
            }
            return axios.get("/auth/refresh", { withCredentials : true });
        }

        useEffect(() => {
            const accessToken = localStorage.getItem("token");
            
            if(accessToken != null){
                dispatch(authorized()).then(response => {
                    console.log("AuthenticationCheck=", response)
                    if(response.payload == 401){
                        refresh()
                        .then(response => {
                            localStorage.setItem('token', response.data.token)
                        })
                        .catch(() => {
                            props.history.push("/logout")
                        })
                    }
                }); 
            } else {
                if(option) {
                    props.history.push("/")
                }
            }
        }, [])

        return (
            <SpectificComponent />
        )
    }

    return AuthenticationCheck
}