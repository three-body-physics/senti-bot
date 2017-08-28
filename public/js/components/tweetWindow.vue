<template lang="html">
  <div>
    <h3 v-for="tweet in messages">{{ tweet.text }}</h3>
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

<style scoped>
@media (max-width: 48em) {

  p {

    border: 1px solid grey;
    margin: 2px;
    padding: 0;
    text-align: center;
    font-size: 1em;
  }
}

@media (min-width: 49em) and (max-width: 64em) {

  p {

    border: 1px solid grey;
    margin: 2px;
    padding: 0;
    text-align: center;
    font-size: 1.5em;
  }
}

@media (min-width: 65em) {

  h3 {
    display: inline-block;
    width: 100%;
    height: 15%;
    text-overflow: ellipsis;
    border: 1px solid grey;
    margin: 2px;
    padding: 0;
    text-align: center;
    font-size: 1.8em;
    font-family: 'Alegreya', serif;
  }
}
</style>
