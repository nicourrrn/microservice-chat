import type { Component } from 'solid-js';
import { For, createSignal, onMount, createEffect, on } from 'solid-js';
import { createWS, createWSState } from '@solid-primitives/websocket'
import type { Message } from './models';

import axios from 'axios';

import styles from './App.module.css';

const App: Component = () => {
    
    const [userMsg, setUserMsg] = createSignal("");
    const [messages, setMessages] = createSignal([] as Message[]);
    
    onMount(async () => {
        const resp = await axios.get("http://service.me/msg/list") 
        setMessages(resp.data);
    })

    const rawWs = createWS("ws://service.me/ws/msg");

    rawWs.addEventListener('message', msg => {
        setMessages(old => [...old, {id: 0, text: msg.data}] as Message[]);
    })
      
    return (
        <div class={'content'}>
        <div class={'input'}>
            <input type='text' onChange={msg => setUserMsg(msg.target.value)}
                value={userMsg()} />
            <input onClick={() => rawWs.send(userMsg())} type="button" value="send" />
        </div>
        <div class={'messages'}>
            <For each={messages()}>{(m, _) => 
                <p>{m.text}</p>
            }
            </For>
        </div>
        </div>
    );
};

export default App;
