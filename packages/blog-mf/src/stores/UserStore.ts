import { defineStore } from 'pinia'
import { ref } from 'vue';
import axios from 'axios';

export const UserStore = defineStore('user', () => {
    const username_ = ref('');
    const mail_ = ref('');
    const password_ = ref('');
    const status_ = ref('');

    const login = (username: string, password: string) => {
        username_.value = username;
        password_.value = password;
        
        axios.post('http://localhost:3000/api/auth/login', {
            "username": "any",
            "password": "any"
        }).then((res) => {
            console.log(res);
            status_.value = 'logged in';
            return res;
        }).catch((err) => {
            status_.value = err.response.data.error;
            console.log(err.response.data.error);
        });
        
        
        console.log('Login', username_.value, password_.value, status_.value);
    }
    
    return { login, username_, mail_, status_ }
},
{
    persist: false
})
