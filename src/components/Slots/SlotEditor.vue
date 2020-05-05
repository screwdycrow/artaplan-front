<template>
    <v-card>
        <v-toolbar   flat color="faded">
            <v-toolbar-title><h2 class="headline"> {{slot.name}}</h2></v-toolbar-title>
        </v-toolbar>
        <v-tabs show-arrows=""  background-color="faded">
            <v-tab>Details</v-tab>
            <v-tab>Stages</v-tab>
            <v-tab>Notes</v-tab>
            <v-tab>Past Commissions</v-tab>
            <v-tab-item>
                <v-card-text>
                <v-card flat class>
                    <v-card-text>
                        <v-text-field outlined v-model="slot.name" label="Name"/>
                        <v-text-field outlined v-model="slot.price" label="Price" append-icon="mdi-cash"/>
                        <v-textarea outlined v-model="slot.description" label="Description"/>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="success" dark outlined > Save
                            <v-icon>mdi-save</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                <v-card-text>
                    <v-card flat class="mb-3">
                        <v-list>
                            <v-list-item ripple @click="toggleStageDefault(stage)" link v-for="stage in slot.stages"
                                         :key="stage.stageId">
                                <v-list-item-icon>
                                    <v-icon :color="stage.isDefault? 'yellow accent-4' : 'grey'">mdi-star</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title> {{stage.name}}</v-list-item-title>
                                    {{stage.description}}
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>mdi-clock</v-icon>
                                    {{stage.estimatedHours}} h
                                </v-list-item-icon>
                                <v-list-item-icon> Avg: {{stage.avgHours}}h</v-list-item-icon>
                            </v-list-item>
                        </v-list>
                        <v-card-actions>
                            <v-spacer/>
                            <v-dialog
                                    v-model="stageListDialog"
                                    width="500"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn v-on="on"  color="primary" outlined>
                                        <v-icon>mdi-plus</v-icon>
                                        Add Stage
                                    </v-btn>
                                </template>
                            </v-dialog>
                        </v-card-actions>
                    </v-card>
                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                <v-card-text>
                    <v-card outlined class="mb-3">
                        <v-card-title> Messages</v-card-title>
                        <v-card-text>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                <v-card-text>
                    <v-card outlined class="mb-3">
                        <v-card-title> Past Commissions</v-card-title>
                        <v-card-text>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-tab-item>
        </v-tabs>
        <v-card-actions>

        </v-card-actions>
    </v-card>

</template>

<script>
    import {createNamespacedHelpers} from "vuex";

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('slots');
    export default {
        name: "slotEditor",
        data() {
            return {stageListDialog: false}
        },

        computed: {
            ...mapGetters([
                "slot",
            ]),

            heading() {
                return this.isNew ? "New Slot" : this.slot.name;
            }
        },
        watch: {
            slotId(newValue) {
                this.getSlot(newValue)
            }
        },
        created() {
            this.init(this.slotId)
        },
        methods: {

            init(slotId) {
                this.getSlot(slotId)
            },
            ...mapActions([
                "insertStageToSlot",
                "getSlot",
                "toggleStageDefault"
            ])

        },
        props: {slotId: Number, isNew: Boolean}
    }
</script>

<style scoped>

</style>
