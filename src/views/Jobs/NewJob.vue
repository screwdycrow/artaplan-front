<template>
  <v-card>
    <v-card-title> New Job</v-card-title>
    <v-card-text>
      <v-stepper v-model="el">
        <v-stepper-header>
          <v-stepper-step :complete="el > 1" step="1">Select Slot</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="el > 2" step="2"> Job Details</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="el > 3" step="3">Job Stage</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card color="transparent">
              <v-toolbar color="transparent" flat dense>
                <v-toolbar-title> Pick a slot</v-toolbar-title>
              </v-toolbar>
              <v-list>
                <v-list-item-group v-model="job.slot">
                  <v-list-item :value="slot" v-for="slot in slots">
                    <v-list-tile-content>
                      <v-list-item-title> {{ slot.name }}</v-list-item-title>
                    </v-list-tile-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-card-actions>
                <v-btn v-if="job.slot" @click="finishSlotStep()" color="primary"> Next</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card color="transparent">
              <v-card-text>
                <v-form>
                  <strong> Customer </strong>
                  <v-row>
                    <v-col>
                      <v-autocomplete :rules="rules.required" return-object required
                                      label="select customer(*)" filled item-text="name"
                                      v-model="job.customer" :items="customers"/>
                    </v-col>
                  </v-row>
                  <strong> Details </strong>
                  <v-row>
                    <v-col lg="2">
                      <v-switch label="This is a task." v-model="isTask" @change="job.price = 0;">
                      </v-switch>
                    </v-col>
                    <v-col lg="10">
                      <v-alert type="info" outlined>
                        By making this job a task, it won't be listed with the regular jobs and job statistics but will appear normally for scheduling. Price will automatically be zero.
                      </v-alert>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col lg="10">
                      <v-text-field :rules="rules.required" required filled type="text"
                                    label="Job Name (*)"
                                    v-model="job.name"/>
                    </v-col>
                    <v-col lg="2">
                      <v-text-field v-if="!isTask" :rules="rules.price" required filled type="number"
                                    min="1"
                                    label="Job Price (*) " v-model.number="job.price"
                                    append-icon="mdi-cash"/>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col lg="10">
                      <label> Description </label>
                      <ckeditor v-model="job.description" :config="editorConfig"></ckeditor>
                    </v-col>
                    <v-col lg="2">
                      <v-color-picker v-model="job.color"></v-color-picker>
                    </v-col>
                  </v-row>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="goBack"> Back</v-btn>
                <v-btn color="primary" @click="finishDetailsStep()"
                       :disabled="!(job.customer && job.name && (job.price || job.price === 0))"> Next
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card color="transparent">
              <v-card-text>
                <draggable v-model="stages" @change="onDragEnd()">
                  <v-list-item ripple v-for="js in stages">
                    <v-list-item-action>
                      <v-icon>mdi-drag</v-icon>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-checkbox @change="hackUpdate++" hide-details v-model="js.selected"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ js.stage.name }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-text-field @change="hackUpdate++" label="Hours needed" style="width:100px;" filled hide-details
                                    type="number" v-model.number="js.jobHours"/>
                    </v-list-item-action>
                  </v-list-item>
                </draggable>
              </v-card-text>
              <v-card-title> Sum</v-card-title>
              <v-card-text>
                You are planning to spend around
                <strong> {{ totalHours }} </strong> hours for a job of this template <span v-if="totalHours>0 && job.price>0 "> and you'll gain <strong>{{
                  job.price / totalHours |fixed(2)
                }}</strong> per hour </span>
              </v-card-text>
              <v-card-text v-if="totalHours === 0 ">
                Add some stages first.
              </v-card-text>
              <v-card-actions>
                <v-btn @click="goBack"> Back</v-btn>
                <v-btn color="primary" @click="finishStageStep()"
                       :disabled="!(job.customer && job.name && (job.price || job.price === 0 )  )"> Next
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>

    </v-card-text>
  </v-card>
</template>

<script>

import Job from "@/classes/Job";
import moment from "moment"
import JobStage from "@/classes/JobStage";
import draggable from 'vuedraggable';

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: "NewJob",
  components: {draggable},
  data: () => ({
    el: 1,
    isTask: false,
    hackUpdate: 0,
    customer: {
      customerId: null,
      name: null,
      email: null,
    },
    stages: [],
    job: {
      slot: null,
      slotId: null,
      price: 0,
      priority: 0,
      status: Job.STATUS.IDLE,
      insertedAt: moment(Date.now()).toISOString(),
      startedAt: null,
      deadline: null,
      estimatedDays: 5,
      customerId: null,
      customer: {},
      color: "#cccccc",
      jobStages: [],
      name: "",
      description: "",
    },
    rules: {
      price: [
        value => (!!value || value === 0) || 'required'
      ],
      required: [
        value => !!value || 'Required.',
      ]
    },
    steps: {
      jobDetails: {
        valid: false

      },
      jobStages: {
        valid: false
      },
      jobAppearance: {
        valid: false
      },
      jobSlot: {
        valid: false,
      }
    }
  }),
  computed: {
    ...mapGetters("slots", [
      "slots"
    ]),
    ...mapState("customers", [
      "customers"
    ]),
    totalHours() {
      this.hackUpdate;
      return this.stages.filter(js => js.selected).reduce((acc, b) => {
        return acc + b.jobHours;
      }, 0);
    },

  },
  created() {
    this.getAllSlots();
    this.getAllCustomers();
  },
  methods: {
    ...mapActions(
        "jobs", [
          "addJob"
        ]
    ),
    ...mapActions(
        "customers",
        [
          "getAllCustomers"
        ]
    ),
    ...mapActions(
        "slots",
        [
          "getAllSlots"
        ]),

    goBack() {
      this.el--;
    },
    finishStageStep() {
      this.job.jobStages = this.stages.filter(js => js.selected)
      this.addJob(this.job).then(
          this.$router.push('/jobs')
      )

    },
    finishDetailsStep() {
      this.job.customerId = this.job.customer.customerId;
      this.el = 3;
    },
    onDragEnd() {
      this.stages.forEach((js, index) => {
        js.order = index;
        console.log(this.job.jobStages);
      });
    },
    finishSlotStep() {
      this.job.slotId = this.job.slot.slotId;
      if(this.job.slot.price === 0 ) this.isTask = true;
      this.stages = this.job.slot.stages.map(s => {
        let js = new JobStage({});
        js.fillJobStageFromStage(s);
        js['selected'] = true;
        return js
      });
      this.job.description = this.job.slot.description;
      this.job.price = this.job.slot.price;
      this.el = 2;
    }
  }
}
</script>

<style scoped>

</style>
