<template>
<div id="app">
  <app-header></app-header>
  <div class="chartArea">
      <bar-chart :chart-data="chartData"></bar-chart>
  </div>
  <!-- <app-tweetW v-bind:messages="messages"></app-tweetW> -->
</div>
</template>

<script>
import header from "./header.vue";
import tweetWindow from "./tweetWindow.vue";
import VueCharts from 'vue-chartjs';
import Vue from "vue";

Vue.component('bar-chart', {
  extends: VueCharts.Bar,
  mixins: [VueCharts.mixins.reactiveProp],
  props: ["chartData", 'options'],
  mounted() {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false
    })
  }
})


export default {
  name: "app",
  components: {
    "app-header": header,
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
        }
      }, // sentimentMap

      // chartData: [0, 2, 5, 6, 2, 3, 7]

      // dataLabels: ["Very Negative", "Negative", "Slightly Negative", "Neutral", "Slightly Positive", "Positive", "Very Positive"],
      countInstances: [0, 0, 0, 0, 0, 0, 0],
      chartData: {}
    } //return
  }, //data

  sockets: {
    connect() {
      this.$socket.emit("query", "trump");
    },

    tweetReceived(tweet) {
      if (this.messages.length >= 8) {
        this.messages.shift();
      }
      this.messages.push(tweet);
      this.processTweets(tweet);
      this.changeData();


    }
  }, //sockets

  methods: {
    processTweets(tweet) {
      this.tweetCount++;
      this.cumulativeScore = this.cumulativeScore + tweet.score;
      this.averageScore = this.cumulativeScore / this.tweetCount;

      if (tweet.score == 0) {
        this.sentimentMap.neutral.count++;
        this.countInstances[3]++;
      } else if (tweet.score == 1) {
        this.sentimentMap.somewhatP.count++;
        this.countInstances[4]++;
      } else if (tweet.score == 2) {
        this.sentimentMap.positive.count++;
        this.countInstances[5]++;
      } else if (tweet.score >= 3) {
        this.sentimentMap.veryPositive.count++;
        this.countInstances[6]++;
      } else if (tweet.score == -1) {
        this.sentimentMap.somewhatN.count++;
        this.countInstances[2]++;
      } else if (tweet.score == -2) {
        this.sentimentMap.negative.count++;
        this.countInstances[1]++;
      } else if (tweet.score <= -3) {
        this.sentimentMap.veryNegative.count++;
        this.countInstances[0]++;
      }

    },

    changeData() {

      this.chartData = {
        labels: ["Very Negative", "Negative", "Slightly Negative", "Neutral", "Slightly Positive", "Positive", "Very Positive"],
        datasets: [{
          label: "Tweet count",
          backgroundColor: "#f87979",
          data: this.countInstances
        }]
      };

    }

  }
}
</script>

<style scoped>
#app {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chartArea {
  height: 300px;
  width: 400px;
  display: flex;
  flex-direction: row;
}



</style>
