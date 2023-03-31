import * as React from "react";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import axios from "axios"

export default function Register() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (event) => {
        event.preventDefault();
        const data = {
           
            email: email,
            password: password
        }
        
        await axios.post('/api/register', data);
        signIn("credentials", {
            email, password, callbackUrl: `${window.location.origin}/create`, redirect: false }
        ).then(function(result) {
            router.push(result.url)
        }).catch(err => {
            alert("Failed to register: " + err.toString())
        });
    }

    return (
        <>
            <h1>Register</h1>

            <form onSubmit={registerUser}>
               
                <label>
                    Email: <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type='submit'>Register User</button>

                <Link href='/register'>Register</Link>
            </form>
        </>
    )
}