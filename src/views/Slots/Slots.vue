<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <portal to="toolbar-title">
            Job Templates
        </portal>
        <portal to="toolbar-items">
        </portal>
        <portal to="toolbar-actions">
            <v-btn color="primary" to="/newSlot">
                <v-icon> mdi-plus</v-icon>
                New
            </v-btn>
        </portal>
        <v-row class>
            <v-col sm="12" lg="3" md="2">
                <v-card flat class="fill-height">
                    <slot-list/>
                </v-card>
            </v-col>
            <v-col sm="12" lg="9" md="12">
                <router-view></router-view>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import SlotList from "@/components/Slots/SlotList";
    import SlotEditor from "@/components/Slots/SlotEditor";
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "Slots",
        components: {SlotEditor, SlotList},
        computed: {
            ...mapGetters('slots', [
                'slots',
                "slot",
            ]),
        },
        methods: {
            ...mapActions('slots', [
                'getAllSlots'
            ])
        }
    }
</script>

<style scoped>

</style>
