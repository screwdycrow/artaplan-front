<template>
    <div>
        <v-row>
            <v-col>
                <v-card>

                    <v-list>
                        <v-list-item>
                            <v-list-item-action>
                                <v-icon> mdi-account</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                {{job.customer.name}}
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>
                                <v-icon> mdi-brush</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                {{job.slot.name}}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-action>
                                <strong> Started: </strong>
                            </v-list-item-action>
                            <v-list-item-content>
                                {{job.startedAt | formatDate }}
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>
                                <strong> Deadline: </strong>
                            </v-list-item-action>
                            <v-list-item-content>
                                {{job.deadline | formatDate}}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col lg="2">
                <v-card>
                    <v-card-text>
                        <p>completed</p>
                        <span class="text-md-h3">{{job.getCompletionPercentage()}}%</span>
                    </v-card-text>
                    <v-progress-linear :color="job.color" style="position: absolute; bottom:0;"
                                       :value="job.getCompletionPercentage()"/>
                </v-card>
            </v-col>
            <v-col lg="2">
                <v-card>
                    <v-card-text>
                        <p> hours spent</p>
                        <span class="text-md-h3">{{job.getHoursSpent()}}hr</span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col lg="2">
                <v-card>
                    <v-card-text>
                        <p> hours left</p>
                        <span class="text-md-h3">{{job.getHoursLeft()}}hr</span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col lg="2">
                <v-card>
                    <v-card-text>
                        <p>earnings</p>
                        <span class="text-md-h3">{{job.price}} € </span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col lg="2">
                <v-card>
                    <v-card-text>
                        <p>value per hour</p>
                        <span class="text-md-h3">{{job.getValue() | fixed(2)}}€</span>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title> Description</v-card-title>
                    <v-card-text>
                        <span v-html="job.description"></span>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
      <v-row>
        <v-col>
          <v-row no-gutters>
            <div style="display: inline;" v-for="(hyperlink, index) in job.references.hyperlinks">
              <v-btn
                  class="mr-6"
                  target="_blank" :color="job.getFormatedColor(0.5)"
                  :href="hyperlink.url">
                <v-icon class="mr-2"> mdi-link</v-icon>
                {{ hyperlink.title || hyperlink.url }}
              </v-btn>
            </div>

          </v-row>
        </v-col>
      </v-row>
        <v-row>
            <v-col lg="2" v-for="(link, index) in job.references.links">
                <v-card>
                    <v-dialog
                            @input="repaint()"
                            max-width="800px"
                            transition="dialog-bottom-transition"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-img aspect-ratio="1" v-ripple v-on="on" v-bind="attrs"
                                   v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
                        </template>
                        <v-card>
                            <v-img v-ripple
                                   v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
                        </v-card>
                    </v-dialog>
                    <v-img v-ripple
                           v-if="link.type === 'url'" src="link.png"></v-img>
                </v-card>
            </v-col>
        </v-row>
    </div>

</template>

<script>
    import JobMixin from "./JobMixin"

    export default {
        data: () => ({
            hoursSpent: 0,
            hoursLeft: 0,
            valuePerHour: 0,
        }),
        watch: {},
        name: "JobOverview",
        mixins: [JobMixin]
    }
</script>

<style scoped>

</style>
