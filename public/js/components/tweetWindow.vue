<template lang="html">
  <div>
    <p v-for="tweet in messages">{{ tweet.text }} + {{ tweet.score }}</p>
  </div>

</template>

<script>
export default {
  name: "tweetWindow",
  props: ["messages"],
  data() {
    return {

    }
  }
}
</script>

<style lang="css">

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
