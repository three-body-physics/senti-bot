<template>
<div id="app">
  <app-header v-on:startStream="startStream($event)"></app-header>
  <div class="chartArea">
    <div v-if="error" class="error-window">
      <h2>Error occured please try another search term</h2>
    </div>
    <div class="chartWrapper">
      <bar-chart :chart-data="chartData"></bar-chart>
    </div>
    <div class="chartWrapper">
      <radar-chart :chart-data="chartDataNoNeutral"></radar-chart>
    </div>
    <div class="chartWrapper">
      <doughnut-chart :chart-data="chartDataNoNeutral"></doughnut-chart>
    </div>
    <div class="windowWrapper">
      <app-statsScreen :tweet-count="tweetCount" :hashtag="hashtag"></app-statsScreen>
    </div>
    <div class="windowWrapper">
      <app-averageScreen :average="averageScore" :positive-count="positiveCount" :negative-count="negativeCount"></app-averageScreen>
    </div>
    <div class="windowWrapper">
      <app-tweetW :messages="messages"></app-tweetW>
    </div>
  </div>

</div>
</template>

<script>
import header from "./header.vue";
import tweetWindow from "./tweetWindow.vue";
import statsScreen from "./statsScreen.vue";
import averageScreen from "./averageScreen.vue";
import VueCharts from 'vue-chartjs';
import Vue from "vue";


Vue.component('bar-chart', {
  extends: VueCharts.HorizontalBar,
  mixins: [VueCharts.mixins.reactiveProp],
  props: ["chartData", 'options'],
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false
    })
  }
})

Vue.component('radar-chart', {
  extends: VueCharts.Radar,
  mixins: [VueCharts.mixins.reactiveProp],
  props: ["chartData", 'options'],
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      }
    });
  }
})

Vue.component('doughnut-chart', {
  extends: VueCharts.Doughnut,
  mixins: [VueCharts.mixins.reactiveProp],
  props: ["chartData", 'options'],
  mounted() {
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
    "app-tweetW": tweetWindow,
    "app-statsScreen": statsScreen,
    "app-averageScreen": averageScreen
  },
  data() {
    return {
      messages: [],
      hashtag: "",
      tweetCount: 0,
      tweetCountNoNeutral: 0,
      cumulativeScore: 0,
      averageScore: 0,
      countInstances: [0, 0, 0, 0, 0, 0, 0],
      parcentageData: [0, 0, 0, 0, 0, 0, 0],
      parcentageDataNoNeutral: [0, 0, 0, 0, 0, 0],
      chartData: {},
      chartDataNoNeutral: {},
      positiveCount: 0,
      negativeCount: 0,
      error: false


    } //return
  }, //data

  sockets: {

    tweetReceived(tweet) {
      if (this.messages.length >= 3) {
        this.messages.shift();
      }
      this.messages.push(tweet);
      this.processTweets(tweet);
      this.changeData();

    },

    errorEvent(errorMsg) {
      this.error = true;

      setTimeout(()=> {
        this.error = false;
      })
    }
  }, //sockets

  methods: {
    processTweets(tweet) {
      this.tweetCount++;
      this.cumulativeScore = this.cumulativeScore + tweet.score;
      this.averageScore = this.cumulativeScore / this.tweetCount;

      if (tweet.score == 0) {
        this.countInstances[3]++;
        this.parcentageData[3] = Math.floor((this.countInstances[3] / this.tweetCount) * 100);

      } else if (tweet.score == 1) {
        this.countInstances[4]++;
        this.positiveCount++;
        this.tweetCountNoNeutral++;
        this.parcentageDataNoNeutral[3] = Math.floor((this.countInstances[4] / this.tweetCountNoNeutral) * 100);
        this.parcentageData[4] = Math.floor((this.countInstances[4] / this.tweetCount) * 100);

      } else if (tweet.score == 2) {
        this.countInstances[5]++;
        this.positiveCount++;
        this.tweetCountNoNeutral++;
        this.parcentageDataNoNeutral[4] = Math.floor((this.countInstances[5] / this.tweetCountNoNeutral) * 100);
        this.parcentageData[5] = Math.floor((this.countInstances[5] / this.tweetCount) * 100);

      } else if (tweet.score >= 3) {
        this.countInstances[6]++;
        this.positiveCount++;
        this.tweetCountNoNeutral++;
        this.parcentageDataNoNeutral[5] = Math.floor((this.countInstances[6] / this.tweetCountNoNeutral) * 100);
        this.parcentageData[6] = Math.floor((this.countInstances[6] / this.tweetCount) * 100);

      } else if (tweet.score == -1) {
        this.countInstances[2]++;
        this.negativeCount++;
        this.tweetCountNoNeutral++;
        this.parcentageDataNoNeutral[2] = Math.floor((this.countInstances[2] / this.tweetCountNoNeutral) * 100);
        this.parcentageData[2] = Math.floor((this.countInstances[2] / this.tweetCount) * 100);

      } else if (tweet.score == -2) {
        this.countInstances[1]++;
        this.negativeCount++;
        this.tweetCountNoNeutral++;
        this.parcentageDataNoNeutral[1] = Math.floor((this.countInstances[1] / this.tweetCountNoNeutral) * 100);
        this.parcentageData[1] = Math.floor((this.countInstances[1] / this.tweetCount) * 100);

      } else if (tweet.score <= -3) {
        this.countInstances[0]++;
        this.negativeCount++;
        this.tweetCountNoNeutral++;
        this.parcentageDataNoNeutral[0] = Math.floor((this.countInstances[0] / this.tweetCountNoNeutral) * 100);
        this.parcentageData[0] = Math.floor((this.countInstances[0] / this.tweetCount) * 100);

      }

    },

    changeData() {

      this.chartData = {
        labels: ["Very Negative", "Negative", "Slightly Negative", "Neutral", "Slightly Positive", "Positive", "Very Positive"],
        datasets: [{
          label: "Percentage of tweets",
          backgroundColor: [
            'rgba(232, 0, 0, 1)',
            'rgba(0, 81, 164, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1',
            'rgba(205, 129, 44, 1)'
          ],
          borderWidth: 1,
          data: this.parcentageData
        }]
      };

      this.chartDataNoNeutral = {
        labels: ["Very Negative", "Negative", "Slightly Negative", "Slightly Positive", "Positive", "Very Positive"],
        datasets: [{
          label: "Percentage of tweets",          
          backgroundColor: [
            'rgba(225, 0, 0, 0.8)',
            'rgba(255, 127, 0, 1)',            
            'rgba(255, 180, 0, 1)',
            'rgba(0, 157, 255, 1)',
            'rgba(0, 29, 255, 1)',
            'rgba(19, 114, 0, 1)'
          ],
          borderWidth: 1,
          data: this.parcentageDataNoNeutral
        }]
      };

    },

    startStream(data) {
      this.$socket.emit("query", data);
      this.hashtag = data;

    }

  }
}
</script>


<style scoped>

@import url('https://fonts.googleapis.com/css?family=Tinos:400,700');
* {
  font-family: 'Tinos', serif;
}
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(238, 238, 238);
}

.chartArea {

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  background: rgb(238, 238, 238);
  position: relative;
}

.error-window {
  width: 30%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 1000;
  border: 1px solid black;
}

.chartArea div div {

  margin: 0;
  padding: 0;
  background: white;
  border-radius: 5%;
}

.chartWrapper {

  width: 100%;
  height: 100%;
  margin: 0.5%;
  padding: 0;
  background: white;
  overflow: hidden;
  position: relative;
  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
}

.windowWrapper {

  width: 100%;
  height: 100%%;
  margin: 0.5%;
  padding: 0;
  background: white;
  overflow: hidden;
  position: relative;
  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
}


@media (min-width: 65em) {

  .chartWrapper {

    width: 32%;
    height: 100%;
    margin: 0.5%;
    padding: 0;
    background: white;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  }

  .windowWrapper {

    width: 32%;
    height: 20%;
    margin: 0.5%;
    padding: 0;
    background: white;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  }
}

@media (min-width: 49em) and (max-width: 64em) {


  .chartWrapper {

    width: 47%;
    height: 100%;
    margin: 0.5%;
    padding: 0;
    background: white;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  }

  .windowWrapper {

    width: 47%;
    height: 481px;
    margin: 0.5%;
    padding: 0;
    background: white;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  }
}

@media only screen and (max-width: 40em) { 


  .error-window {
  width: 100%;
}

}
</style>
