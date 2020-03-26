<template>
    <v-card>
        <v-toolbar flat>
            <v-toolbar-title > <h3 class="headline">  Active Slot </h3></v-toolbar-title>
            </v-toolbar>
        <v-tabs background-color="">
            <v-tab>Details/Stages</v-tab>
            <v-tab>Notes</v-tab>
            <v-tab>Past Commissions</v-tab>
            <v-tab-item>
                <v-card-text>
                    <v-row>
                        <v-col lg="4" md="4" sm="12">
                            <v-card flat class="mb-3">
                                <v-card-title> Slot Details</v-card-title>
                                <v-card-text>
                                    <v-text-field outlined v-model="slot.name" label="Name"/>
                                    <v-text-field outlined v-model="slot.price" label="Price" append-icon="mdi-cash"/>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col lg="8" md="8" sm="12">
                            <v-card flat class="mb-3">

                                <v-card-title> Slot Default Stages
                                </v-card-title>
                                <v-list >
                                    <v-list-item ripple link v-for="stage in slot.stages" :key="stage.stageId" >
                                        <v-list-item-content >
                                            <v-list-item-title> {{stage.name}}</v-list-item-title>
                                            {{stage.description}}
                                        </v-list-item-content>
                                        <v-list-item-icon><v-icon>mdi-clock</v-icon> {{stage.estimatedHours}} h</v-list-item-icon>
                                        <v-list-item-icon> Avg: {{stage.avgHours}}h</v-list-item-icon>
                                    </v-list-item>
                                </v-list>
                                <v-card-actions>
                                    <v-dialog
                                            v-model="stageListDialog"
                                            width="500"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on" text color="primary"><v-icon>mdi-pencil</v-icon> Manage Stages </v-btn>
                                        </template>
                                    </v-dialog>
                                </v-card-actions>
                            </v-card>

                        </v-col>
                    </v-row>
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
            <v-btn color="success" dark large text > Save
                <v-icon>mdi-save-disk</v-icon>
            </v-btn>
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
                "getSlot"
            ])

        },
        props: {slotId: Number, isNew: Boolean}
    }
</script>

<style scoped>

</style>
