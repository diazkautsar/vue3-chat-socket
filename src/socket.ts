import { reactive } from "vue";
import { io, Socket } from "socket.io-client";


export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const URL = "http://localhost:8080";

export const socket: Socket = io(URL)

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});