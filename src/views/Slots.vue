<template>
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
                <slot-editor v-if="activeSlotId || activeSlotId === 0  " :slot-id="activeSlotId"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import SlotList from "@/components/Slots/SlotList";
    import SlotEditor from "@/components/Slots/SlotEditor";
    import {createNamespacedHelpers} from "vuex";

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('slots');
    export default {
        name: "Slots",
        components: {SlotEditor, SlotList},
        computed: {
            ...mapGetters([
                "slot",
                "activeSlotId"
            ]),
        }
    }
</script>

<style scoped>

</style>
