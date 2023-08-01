import type { Component, Setter, Accessor } from 'solid-js';
import { createSignal } from 'solid-js';

import axios from "axios";


export const Login: Component<{token: Accessor<string>, setToken: Setter<string>}> = (props) => {
    const [id, setId] = createSignal(0);
    
    const getToken = async () => {
        const resp = await axios.post( 
            'http://service.me/auth/login',
            {id: id()});
        props.setToken(resp.data.token);
    }

    return (
    <div class={"login"}>
        <p onClick={() => console.log(props.token())}>Token: { props.token() }</p>
        <p>ID: </p><input value={id()} type='number' onChange={e => setId(Number(e.target.value))} />
        <button onClick={getToken}>Send</button>
    </div>);
}
