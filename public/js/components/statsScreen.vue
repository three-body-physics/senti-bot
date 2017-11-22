<template>
  <div>

      <h2><i class="fa fa-rss" aria-hidden="true"></i>     Status</h2>
      <hr>
      <h3>hashtag: {{ "#" + hashtag }}</h3>
      <h3>Tweets: {{ tweetCount }}</h3>

  </div>
</template>

<script>
export default {
  name:"statsScreen",
  props: ["tweetCount", "hashtag"]

}
</script>



<style scoped>

@import url('https://fonts.googleapis.com/css?family=Tinos:400,700');

h2, h3 {
    font-family: 'Tinos', serif;
}

div {

height: 100%;
width: 100%;
padding: 0;
margin-left: 0;

}

h2 {
  font-weight: 200%;

}




</style>
