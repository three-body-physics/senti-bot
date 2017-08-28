// import { Bar, mixins } from 'vue-chartjs'
// const { reactiveProp } = mixins
//
// export default Bar.extend({
//   name:"chart1",
//   mixins: [reactiveProp],

  // props: ["chartData"],

  // computed: {
  //   chartData() {
  //     return this.data;
  //   }
  // },

  // mounted () {
  //  this.reRenderChart();
  //
  // },
  //
  // methods: {
  //   reRenderChart() {
  //     this.renderChart({
  //           labels: ["Very Negative", "Negative", "Slightly Negative", "Neutral", "Slightly Positive", "Positive", "Very Positive"],
  //           datasets: [
  //             {
  //               label: 'Tweet Count',
  //               backgroundColor: '#f87979',
  //               data: this.chartData
  //             }
  //           ]
  //         }, { responsive: true, maintainAspectRatio: false });
  //   }
  // },

  // watch: {
  //   data: function() {
  //    console.log(this.chartData);
  //   }
  // }
  // watch: {
  //   chartData: function () {
  //     this._chart.destroy();
  //     this.renderChart({
  //           labels: ["Very Negative", "Negative", "Slightly Negative", "Neutral", "Slightly Positive", "Positive", "Very Positive"],
  //           datasets: [
  //             {
  //               label: 'Tweet Count',
  //               backgroundColor: '#f87979',
  //               data: this.chartData
  //             }
  //           ]
  //         })
  //     this._chart.update();
  //     console.log(this.chartData);
  //   }
  // }
})
