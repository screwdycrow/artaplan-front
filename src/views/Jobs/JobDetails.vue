<template>
    <div>
      <add-reference/>
      <v-card flat>
              <v-card-title>
                Details
              </v-card-title>
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
                        <v-col lg=4>
                            <v-text-field
                                    outlined
                                    hide-details
                                    required type="number"
                                    label="Job Price (*) " v-model.number="job.price"
                                    append-icon="mdi-cash"/>

                        </v-col>
                        <v-col lg="4">
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
                      <v-col lg="4" v-if="job.status !== 'idle'">
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
                                :value="job.startedAt|formatDate"
                                label="Started"
                                persistent-hint
                                append-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="job.startedAt"
                              no-title
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <v-card class="mt-3" flat>
              <v-card-title>
                Description
              </v-card-title>
                <v-card-text>
                    <ckeditor v-model="job.description" :config="editorConfig"></ckeditor>
                </v-card-text>
            </v-card>
            <v-card flat class="mt-3" >
              <v-card-title>
                Stages
              </v-card-title>
              <v-card-text>
                    <v-list-item  v-for="(js,index) in job.jobStages">

                      <v-list-item-content>
                        <v-list-item-title>
                          {{js.stage.name}}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text> Hours Spent</v-list-item-action-text>
                        {{js.workHours}}
                      </v-list-item-action>
                      <v-list-item-action>
                        <v-text-field label="Hours needed" style="width:100px;" filled hide-details
                                      type="number" v-model.number="js.jobHours"/>
                      </v-list-item-action>

                    </v-list-item>
              </v-card-text>
            </v-card>

    </div>
</template>

<script>
    import JobMixin from "./JobMixin"
    import AddReference from "./components/AddReference"

    export default {
        name: "JobDetails",
      components: {AddReference},
      data:()=>({
            editorConfig: {
            }
        }),
        mixins: [JobMixin]
    }
</script>

<style scoped>

</style>
