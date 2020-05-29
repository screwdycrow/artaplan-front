<template>
    <v-card color="transparent" flat class="fill-height">
        <v-toolbar flat color="transparent">
            <v-toolbar-title>
                <strong class="text--primary"> Your Templates </strong>
            </v-toolbar-title>
            <v-toolbar-items>
                <v-menu></v-menu>
            </v-toolbar-items>
        </v-toolbar>

        <v-list color="transparent">
            <slot-list-item
                    v-for="slot in slots"
                    :slot-obj="slot"
                    :show-action="slot.slotId === activeSlotId"
                    :key="slot.slotId"
                    @click="editSlot(slot)"/>
        </v-list>
    </v-card>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex'
    import SlotListItem from "@/components/Slots/SlotListItem";

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('slots');
    export default {
        name: "slotList",
        components: {SlotListItem},
        data: () => ({
            sorters: {}
        }),
        computed: {
            ...mapGetters([
                "slots",
                "activeSlotId"
            ])
        },
        created() {
            this.getAllSlots().then(s => console.log(this.slots))

        },
        methods: {
            editSlot(slot) {
                this.setActiveSlot(slot);
                this.$emit("slotClicked", slot.slotId);
            },
            ...mapActions([
                "getAllSlots"
            ]),
            ...mapMutations([
                "pushSlotToList",
                "removeSlotFromList",
                "setActiveSlot"

            ])
        }

    }

</script>

<style scoped>
</style>
