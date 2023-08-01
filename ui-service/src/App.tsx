import type { Component } from "solid-js";
import type { Message } from "./models";
import { createSignal, createEffect, on, For, onMount } from "solid-js";
import { createWS } from "@solid-primitives/websocket";

import axios from "axios";

import { createWSReceiver } from "./receiver"; 
import { Login } from './Login';

import styles from './App.module.css';


export const App: Component = () => {
    const [token, setToken] = createSignal("")
    
    const [msg, setMsg] = createSignal('')
   
    const ws = createWS("ws://service.me/ws/msg")
    ws.send(token())
    const wsObserver = createWSReceiver(ws)
    const [msgList, setMsgList] = createSignal([] as Message[])

    createEffect(on(wsObserver, (e) => 
        setMsgList(old => [...old, {id: 0, text: e.data}] as Message[])))
    
    onMount(async () => {
        const resp = await axios.get("http://service.me/msg/list") 
        setMsgList(resp.data)
    })

    const send = () => {
        setMsgList(old => [...old, {id: 0, text: msg()}] as Message[])
        ws.send(msg())
        setMsg("")
    }

    return <div class="content">
        <Login token={token} setToken={setToken}/>
        <div class={'input'}>
            <p>Message:</p><input value={msg()} onChange={e => setMsg(e.target.value)} />
            <button onClick={send}>Send</button>
        </div> 
        <div class={styles.messges}>
            <For each={msgList()}>{(m, _) => 
                <p>{m.text}</p>
            }</For>
        </div>
        </div>
}
