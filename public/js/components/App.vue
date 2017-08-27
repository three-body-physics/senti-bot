<template>
<div id="app">
  <app-header></app-header>
  <app-tweetW v-bind:messages="messages"></app-tweetW>
</div>
</template>

<script>
import header from "./header.vue";
import chart1 from "./chart1.vue";
import chart2 from "./chart2.vue";
import chart3 from "./chart3.vue";
import tweetWindow from "./tweetWindow.vue";




export default {
  name: "app",
  components: {
    "app-header": header,
    "app-chart1": chart1,
    "app-chart2": chart2,
    "app-chart3": chart3,
    "app-tweetW": tweetWindow
  },
  data() {
    return {
      messages: [],
      tweetCount: 0,
      cumulativeScore: 0,
      averageScore: 0,
      sentimentMap: {
        somewhatN: {
          count: 0,
          score: "-1",
          rating: "somewhat negative"
        },
        negative: {
          count: 0,
          score: "-2",
          rating: "negative"
        },
        veryNegative: {
          count: 0,
          score: "<=-3",
          rating: "very negative"
        },
        neutral: {
          count: 0,
          score: "0",
          rating: "neutral"
        },
        somewhatP: {
          count: 0,
          score: "1",
          rating: "somehwat positive"
        },
        positive: {
          count: 0,
          score: "2",
          rating: "positive"
        },
        veryPositive: {
          count: 0,
          score: ">=3",
          rating: "positive"
        },
      }
    }
  },

  sockets: {
    connect() {
      this.$socket.emit("query", "Sony");
    },

    tweetReceived(tweet) {
      if (this.messages.length >= 8) {
        this.messages.shift();
      }
      this.messages.push(tweet);
      this.processTweets(tweet);

    }
  },

  methods: {
    processTweets(tweet) {
      this.tweetCount++;
      this.cumulativeScore = this.cumulativeScore + tweet.score;
      this.averageScore = this.cumulativeScore / this.tweetCount;

      if (tweet.score == 0) {
        this.sentimentMap.neutral.count++;
      } else if (tweet.score == 1) {
        this.sentimentMap.somewhatP.count++;
      } else if (tweet.score == 2) {
        this.sentimentMap.positive.count++;
      } else if (tweet.score >= 3) {
        this.sentimentMap.veryPositive.count++;
      } else if (tweet.score == -1) {
        this.sentimentMap.somewhatN.count++;
      } else if (tweet.score == -2) {
        this.sentimentMap.negative.count++;
      } else if (tweet.score <= -3) {
        this.sentimentMap.veryNegative.count++;
      }

    },

  }
}
</script>

<style scoped media="screen">

</style>
