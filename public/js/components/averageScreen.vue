<template>
  <div>

      <h2><i class="fa fa-fire" aria-hidden="true"></i>   Sentiment:</h2>
      <hr>
      <h3>Positive tweets: {{ positiveCount }}</h3>      
      <h3>Negative tweets: {{ negativeCount }}</h3>

  </div>
</template>

<script>
export default {
  name:"averageScreen",
  props: ["average", "positiveCount", "negativeCount"]

}
</script>

<style scoped>

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
