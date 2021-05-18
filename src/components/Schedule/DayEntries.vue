<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card min-height="250" outlined :color="today === day?'secondary lighten-3':''">
        <v-toolbar dense flat>
            <v-toolbar-title>
                {{day | dayName}}
            </v-toolbar-title>
            <v-spacer/>
            {{day | format}}

        </v-toolbar>
        <v-list dense>
            <v-list-item dense v-for="j in deadlinesOfDay(day)">
                <v-list-item-action>
                    <v-icon color="#ff1b0e  ">mdi-flag-checkered</v-icon>
                </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title style="color:#ff1b0e;">{{j.name}}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <drop-list :key="v" style="min-height: 200px;" :class="day+' fill-height'" mode="cut"
                       :items="entriesOfDay(day)" @insert="onInsert">
                <template v-slot:item="{item}">
                    <drag :key="item.tempId" :data="item" @cut="onCut(item)">
                        <schedule-entry-item :entry="item" @onDone="v++" @onDelete="v++">
                        </schedule-entry-item>
                    </drag>
                </template> 
                <template v-slot:inserting-drag-image="{data}">
                    <v-list-item-avatar style="transform:translate(-50%, -50%) scale(1.5)">
                    </v-list-item-avatar>
                </template>
                <template v-slot:reordering-drag-image/>
                <template v-slot:feedback="{data}">
                    <v-skeleton-loader
                            type="list-item-two-line"
                            :key="data.tempId"
                            :style="'border-left: 4px solid; margin-left: -2px;'"
                    />
                </template>
            </drop-list>
        </v-list>
    </v-card>


</template>

<script>
    import {Drag, DropList} from "vue-easy-dnd"
    import ScheduleEntryItem from "./ScheduleEntryItem"
    import {mapActions, mapGetters, mapMutations} from "vuex"
    import JobStage from "../../classes/JobStage"
    import moment from "moment"

    export default {
        name: "DayEntries",
        components: {ScheduleEntryItem, DropList, Drag},
        props: {
            day: String,
            dayEntries: Array
        },
        data: () => ({
            v: 1,
            today: moment().format("YYYY-MM-DD"),
        }),
        filters: {

            format(date) {
                return moment(date).format('DD/MM')
            },
            dayName(date) {
                return moment(date).format('ddd')
            },
        },
        watch: {},
        methods: {
            ...mapActions('schedule',
                [
                    "addScheduleEntry",
                    "updateScheduleEntry",
                    "changeDateEntry"
                ]
            ),
            ...mapMutations('schedule', [
                "addEntryToDay",
                "removeEntryFromDay"
            ]),
            onCut(value) {
            },
            onInsert(event) {
                let item = event.data;
                console.log('start bonking ', item)
                if ( item instanceof JobStage) {
                    this.addScheduleEntry({jobStage: item, date: this.day}).then(entry => {
                        console.log('new bonk')
                        this.v++;
                    })
                } else {
                    this.changeDateEntry({
                        entry: item,
                        date: this.day
                    }).then(() => {
                        this.v++;

                    })
                }

            }
        },
        computed: {
            ...mapGetters('jobs',[
                "deadlinesOfDay"
            ]),
            ...mapGetters('schedule', [
                "entriesOfDay",
            ])
        }

    }
</script>

<style scoped>

</style>