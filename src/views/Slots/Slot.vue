<template>
    <v-card>
        <v-toolbar   flat color="faded">
            <v-toolbar-title><h2 class="headline"> {{slot.name}}</h2></v-toolbar-title>
        </v-toolbar>
        <v-tabs show-arrows=""  background-color="faded">
            <v-tab>Details</v-tab>
            <v-tab>Stages</v-tab>
            <v-tab>Past Jobs</v-tab>
            <v-tab-item>
                <v-card-text>
                    <v-text-field outlined v-model="slot.name" label="Name"/>
                    <v-text-field outlined v-model="slot.price" label="Price" append-icon="mdi-cash"/>
                    <v-textarea outlined v-model="slot.description" label="Description"/>
                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                        <v-card-text>

                        <v-list>
                            <v-list-item ripple @click="toggleStageDefault(stage)" link v-for="stage in slot.stages"
                                         :key="stage.stageId">
                                <v-list-item-content>
                                    <v-list-item-title> {{stage.name}}</v-list-item-title>
                                    {{stage.description}}
                                </v-list-item-content>
                                <v-list-item-action class="text-center">
                                        <v-list-item-action-text>
                                            Estimated
                                        </v-list-item-action-text>
                                        <v-icon>mdi-clock</v-icon>
                                        {{stage.estimatedHours}} h

                                </v-list-item-action>
                                <v-list-item-action class="text-center">
                                    <v-list-item-action-text>
                                        Average
                                    </v-list-item-action-text>
                                    <v-icon>mdi-clock</v-icon>
                                    {{stage.avgHours}} h
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        </v-card-text>
            </v-tab-item>
        </v-tabs>
    </v-card>

</template>

<script>
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "Slot",
        created() {
        },
        data:()=>({
            stage: {
                name: null,
                description: null,
                estimatedHours: null,
            },
        }),
        watch:{
            $route (to, from){
                this.getSlot(this.$route.params.id).then(slot=>{

                })
            }

        },
        computed:{
          ...mapGetters('slots',[
              "slot"
          ])
        },
        methods:{
            ...mapActions('slots',[
                "getSlot"
            ])
        },
        onDragEnd() {
            this.slot.stages.forEach((slot, index) => {
                slot.order = index;
                console.log(this.slot.stages);
            });
        },
        removeStage(index) {
            this.slot.stages.splice(index, 1);
        },
        addStage() {
            this.slot.stages.push(this.stage);
            this.stage = {
                name: null,
                description: null,
                estimatedHours: null,
            }
        }
    }

</script>

<style scoped>

</style>