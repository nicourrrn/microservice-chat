import type { Accessor } from "solid-js";
import { createSignal } from "solid-js";


export const createWSReceiver = (ws: WebSocket): Accessor<MessageEvent> => {
    const [state, setState] = createSignal(new MessageEvent(""));
    ws.addEventListener('message', (msg) => {
        setState(msg);
    })
    return state;
}
