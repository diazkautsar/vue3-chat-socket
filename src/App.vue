<!-- <script setup>
import { defineComponent } from 'vue'
import { socket } from './socket'

socket.on('welcome', () => { console.log('welcome') })
  
</script> -->

<template>
  <div v-for="(item, index) in messages" :key="index">
    {{  item.name  }} : {{ item.message }}
  </div>
  <div v-if="modal.buttonMessage">
    <div> Hi {{ name }} please enter your message and enjoy. </div>
  </div>
  <div v-if="modal.buttonName">
    <input type="text" v-model="name" placeholder="Enter your name">
    <button @click="submitFormName">Submit</button>
  </div>

  <div v-if="modal.buttonMessage">
    <input type="text" v-model="message" placeholder="Enter your message">
    <button @click="submitFormMessage">Submit</button>
  </div>
</template>

<script>
import { socket } from './socket'

export default {
  data() {
    return {
      name: '',
      emit: '',
      message: '',
      modal: {
        buttonName: true,
        buttonMessage: false
      },
      messages: []
    };
  },
  methods: {
    submitFormName() {
      if (this.name.length) {
        this.modal.buttonName = false
        this.modal.buttonMessage = true
      }
    },
    submitFormMessage () {
      socket.emit('chat', { name: this.name, message: this.message })
      this.message = ''
    }
  },
  mounted() {
    socket.on('chat', (msg) => {
      this.messages.push(msg)
    })
  }
};
</script>
