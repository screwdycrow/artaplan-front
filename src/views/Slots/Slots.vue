<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <portal to="toolbar-title">
            Job Templates
        </portal>
        <portal to="toolbar-items">
            <v-dialog max-width="500" >
                <template v-slot:activator="{on}">
                    <v-btn  class="hidden-lg-and-up" color="primary" text v-on="on"> All</v-btn>
                </template>
                <v-card>
                    <slot-list/>
                </v-card>
            </v-dialog>
        </portal>
        <portal to="toolbar-actions">
            <v-btn color="primary"  to="/slots/new"  > <v-icon> mdi-plus</v-icon> New</v-btn>
        </portal>
        <v-row class>
            <v-col sm="12" lg="3" md="2" class="hidden-md-and-down">
                <slot-list/>
            </v-col>
            <v-col sm="12" lg="9" md="12">
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import SlotList from "@/components/Slots/SlotList";
    import SlotEditor from "@/components/Slots/SlotEditor";
    import {mapGetters} from "vuex"

    export default {
        name: "Slots",
        components: {SlotEditor, SlotList},
        created(){
          this.getAllSlots();
        },
        computed: {
            ...mapGetters('slots',[
                'slots',
                "slot",
            ]),
        },
        methods:{
          ...mapActions('slots',[
              'getAllSlots'
          ])
        }
    }
</script>

<style scoped>

</style>
