<template>
    <div v-if="options.xaxis.categories.length>0 ">
        <apexchart width="100%" height="200" type="bar" :options='options' :series="series"/>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "workLoadChart",
        props: {
            showDays: {
                type: Number,
                default: 7
            },
            workload: Array,
        },
        data: () => ({
            options: {
                chart: {
                    id: "vuechart-example"
                },
                theme: {
                    mode: "light"
                },
                xaxis: {
                    categories: []
                }
            },
            workloadView: [],
            series: [],
        }),

        watch: {
            workload() {
                this.setWorkload();
                this.setSeries();
                this.setCategories();
            }
        },
        methods: {
            setWorkload() {
                let start = moment(Date.now());
                let end = start.clone().add(this.showDays, 'd');
                let now = start;
                let days = [];
                while (now <= end) {
                    days.push(now.format('DD/MM'));
                    now = now.clone().add(1, 'd')
                }
                this.workloadView = days.map(d => {
                    const workloadDay = this.workload.find(w => moment(w.date).format('DD/MM') === d);
                    return {
                        date: d,
                        hours: workloadDay ? workloadDay.hours : 0
                    }
                })
            },
            setSeries() {
                this.series = [
                    {
                        name: "hours",
                        data: this.workloadView.map(w => w.hours)
                    },
                ]
            },
            setCategories() {
                this.options.xaxis.categories = this.workloadView.map(w => w.date)
            }

        }
    }
</script>

<style scoped>

</style>
