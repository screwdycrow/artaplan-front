<template>
  <apexchart width="100%" height="200" type="bar" :options='options' :series="[{data:data}]"/>
</template>

<script>
import moment from "moment";

export default {
  name: "EarningPerMonth",
  data: () => ({
    dates: [],
    data: [],
    options: {
      chart: {
        id: "vuechart-example"
      },
      theme: {
        mode: "light"
      },
      yaxis:{
        show:false
      },
      xaxis: {
        categories: []
      }
    },
    workloadView: [],
  }),
  props: {
    minus: {type: Number, default: -3},
    plus: {type: Number, default: 0},
    statsPerMonth: {type: Object},
  },
  watch: {
    statsPerMonth() {
      this.fillData();
    }
  }
  ,
  created() {
    let today = moment().startOf('day').format("YYYY-MM-DD");
    let i = 1;
    let j = 0;
    let datesBefore = [];
    let datesAfter = [];
    while (i > this.minus) {
      i--;
      let formatted = moment(today).add(i, 'months').format("YYYY-MM-DD")
      datesBefore.push(formatted);
    }
    while (j < this.plus) {
      let formatted = moment(today).add(j, 'months').format("YYYY-MM-DD")
      datesAfter.push(formatted);
      j++
    }
    this.dates = [].concat(datesBefore, datesAfter)
    this.data = this.dates.map(date => this.statsPerMonth[date])
    this.options.xaxis.categories = this.dates.map(date => (moment(date).format('MMMM')))
    this.fillData()
  },
  methods:{
    fillData(){
      this.data = this.dates.map(date => {
        let d = moment(date).format('YYYY-MM')
        console.log(d);
        if (this.statsPerMonth[d] !== undefined) {
          return this.statsPerMonth[d].totalPrice
        }else{
          return null
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
