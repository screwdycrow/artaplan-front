<template>
    <list>
        <drop-list mode="cut" :items="entriesOfDay(day)" @insert="onInsert">
            <template v-slot:item="{entry}">
                <v-list-item>
                    <drag :key="entry.scheduleEntryId" :data="entry"  @cut="onCut">
                        <schedule-entry-item  :entry="entry">
                        </schedule-entry-item>
                    </drag>
                </v-list-item>
            </template>
            <template v-slot:inserting-drag-image="{entry}">
                <v-skeleton-loader
                        type="list-item-avatar-three-line"
                        :key="entry.scheduleEntryId"
                        style="border-left: 2px solid #1976D2; margin-left: -2px;"
                />
            </template>
        </drop-list>


    </list>

</template>

<script>
    import {Drag,DropList} from "vue-easy-dnd"
    import ScheduleEntryItem from "./ScheduleEntryItem"
    import {mapActions, mapGetters} from "vuex"
    import JobStage from "../../classes/JobStage"

    export default {
        name: "DayEntries",
        components: {ScheduleEntryItem,DropList,Drag},
        props: {
            day: String,
        },
        methods:{
            onCut(event){
            },
            onInsert(event){
                item = event.data;
                if(JobStage === typeof item){
                    this.addScheduleEntry(item).then(entry=>{

                    })
                }else{
                    this.changeDateEntry({
                        entry:item,
                        date:day
                    })
                }

            }
        },
        actions: {
            ...mapActions('schedule',
            [
                "addScheduleEntry",
                "updateScheduleEntry",
                "changeDateEntry"
            ]
            ),
                ...mapMutations('schedule',[
                    "addEntryToDay",
                    "removeEntryFromDay"
                ])
        },
        computed: {
            ...mapGetters('schedule', [
                "entriesOfDay",
            ])
        }

    }
</script>

<style scoped>

</style>