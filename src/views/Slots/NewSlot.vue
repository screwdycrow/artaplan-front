<template>
  <v-card>
    <v-card-title> New Job Template</v-card-title>
    <v-card-text>
      <v-stepper v-model="el">
        <v-stepper-header>
          <v-stepper-step :complete="el > 1" step="1">Template Details</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="el > 2" step="2"> Template Stages</v-stepper-step>
          <v-divider></v-divider>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form v-model="steps.slotDetails.valid">
              <v-card-text>
                <strong> Details </strong>
                <v-row>
                  <v-col lg="9">
                    <v-text-field v-model="slot.name" label="Title" :rules="rules.required"></v-text-field>
                  </v-col>
                  <v-col lg="3">
                    <v-text-field v-model.number="slot.price" type="number" label="base price"
                                  :rules="rules.required"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea v-model="slot.description" label="Description"></v-textarea>
                  </v-col>
                </v-row>
                <v-btn
                    :disabled="!steps.slotDetails.valid"
                    color="primary"
                    class="mr-4"
                    @click="el++"
                >
                  Next Step
                </v-btn>
              </v-card-text>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card-title> Stages </v-card-title>
            <v-card-text>
              <v-form>
                <v-row>
                  <v-col>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-row dense>
                            <v-col>
                              <v-text-field type="text" label="Stage Title" v-model="stage.name"></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field  type="number" placeholder="3" label="Estimated Hours"
                                             v-model.number="stage.estimatedHours"></v-text-field>
                            </v-col>
                          </v-row>

                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn color="primary" fab @click="addStage()"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <draggable v-model="slot.stages" @change="onDragEnd()">
                        <v-list-item ripple v-for="(slot,index) in slot.stages">
                          <v-list-item-action>
                            <v-icon>mdi-drag</v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ slot.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-text-field label="Hours needed" style="width:100px;" filled hide-details
                                          type="number" v-model.number="slot.estimatedHours"/>
                          </v-list-item-action>
                          <v-list-item-action>
                            <v-btn icon @click="removeStage(index)">
                              <v-icon> mdi-delete</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </draggable>
                    </v-list>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                      color="success"
                      class="mr-4"
                      @click="el--"
              >
                back
              </v-btn>
              <v-btn
                      color="success"
                      class="mr-4"
                      @click="insert()"
                      :disabled="!slot.stages.length"
              >
                Submit
              </v-btn>

            </v-card-actions>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>

  </v-card>

</template>

<script>
import {mapGetters,mapActions} from "vuex";
import draggable from "vuedraggable";
import slots from "@/api/slots";

export default {
  name: "NewSlot",
  components: {
    draggable
  },
  data: () => ({
    el: 1,
    stage: {
      name: null,
      description: null,
      estimatedHours: null,
    },
    steps: {
      slotDetails: {
        valid: false
      },
      slotStages: {
        valid: false
      },
    },
    totalHours: 0,
    slot: {
      description: null,
      price: null,
      insertedAt: null,
      notes: null,
      name: null,
      stages: [],
      userId: null
    },
    rules: {
      required: [
        value => !!value || 'Required.',
      ]
    },
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.slot.userId = this.user.userId
  },
  methods: {
    ...mapActions("slots",[
        "addSlot"
    ]),

    insert(){
      this.addSlot(this.slot).then(resp=>{
        this.$router.push('/slots')
      })
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
}
</script>

<style scoped>

</style>
