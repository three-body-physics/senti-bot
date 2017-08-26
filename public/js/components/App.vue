<template>

<div id="app">
  <p v-for="tweet in messages">{{ tweet.text }} + {{ tweet.score }}</p>
</div>

</template>

<script>

export default {
  name: "app",
  data() {
    return {
      messages: []
    }
  },

  sockets: {
    connect() {
      this.$socket.emit("query", "Sony");
    },

    tweetReceived(tweets) {
      if(this.messages.length >= 8) {
        this.messages.shift();
      } else {
        this.messages.push(tweets);
      }
    }
  }
}

</script>

<style scoped media="screen">
  p {
    display: block;
    height: 50px;
    border: 2px solid grey;
    margin: 5px;
    padding: 0;
    text-align: center;
    line-height: 50px;
  }
</style>
