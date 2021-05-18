<template>
    <div>
        <v-toolbar flat color="transparent">
            <v-toolbar-title>
                <h3>Details</h3>
            </v-toolbar-title>
        </v-toolbar>
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col lg="10">
                            <v-text-field hide-details required outlined type="text"
                                          label="Job Name (*)"
                                          v-model="job.name"/>
                        </v-col>
                        <v-col lg="2">
                            <v-dialog
                                    ref="menu2"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon large outlined="" v-on="on" rounded :color="job.color">
                                        <v-icon>mdi-palette</v-icon>
                                    </v-btn>
                                </template>
                                <v-color-picker v-model="job.color"></v-color-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col lg=6>
                            <v-text-field
                                    outlined
                                    hide-details
                                    required type="number"
                                    label="Job Price (*) " v-model.number="job.price"
                                    append-icon="mdi-cash"/>

                        </v-col>
                        <v-col lg="6">
                            <v-menu
                                    ref="menu1"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            outlined
                                            readonly
                                            hide-details
                                            :value="job.deadline|formatDate"
                                            label="Deadline"
                                            persistent-hint
                                            append-icon="mdi-calendar"
                                            v-bind="attrs"
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        v-model="job.deadline"
                                        no-title
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-toolbar flat color="transparent">
                <v-toolbar-title>
                    <h3>Description</h3>
                </v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-card-text>
                    <ckeditor v-model="job.description" :config="editorConfig"></ckeditor>

                </v-card-text>
            </v-card>

    </div>
</template>

<script>
    import JobMixin from "./JobMixin"

    export default {
        name: "JobDetails",
        data:()=>({
            editorConfig: {
            }
        }),
        mixins: [JobMixin]
    }
</script>

<style scoped>

</style>