<template>

<div id="app">
  <p v-for="tweet in messages">{{ tweet.text }} + {{ tweet.score }}</p>
  <p>{{ cumulativeScore }}</p>
</div>

</template>

<script>

export default {
  name: "app",
  data() {
    return {
      messages: [],
      tweetCount: 0,
      cumulativeScore: 0,
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
      if(this.messages.length >= 8) {
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
