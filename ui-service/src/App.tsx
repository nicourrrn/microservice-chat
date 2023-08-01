import type { Component, Accessor } from 'solid-js';
import { For, createSignal, onMount, createEffect, on } from 'solid-js';
import { createWS, createWSState } from '@solid-primitives/websocket'
import type { Message } from './models';

import axios from 'axios';

import styles from './App.module.css';

const createWSReceiver = (ws: WebSocket): Accessor<MessageEvent> => {
    const [state, setState] = createSignal<MessageEvent>(new MessageEvent(""));
    ws.addEventListener('message', msg => {
        setState(msg);
    })
    return state;
}

const App: Component = () => {
    
    const [userMsg, setUserMsg] = createSignal("");
    const [messages, setMessages] = createSignal([] as Message[]);
    
    onMount(async () => {
        const resp = await axios.get("http://service.me/msg/list") 
        setMessages(resp.data);
    })

    const rawWs = createWS("ws://service.me/ws/msg");
    const msgReceiver = createWSReceiver(rawWs);
    createEffect(on(msgReceiver, msg => 
        setMessages(old => [...old, {id: 0, text: msg.data}])))
      
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
