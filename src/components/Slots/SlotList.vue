<template>
    <v-card  color="transparent" flat class="fill-height">
        <v-toolbar flat color="transparent">
            <v-toolbar-title>
              <strong class="text--primary"> Your Templates </strong>
            </v-toolbar-title>
            <v-toolbar-items>
                <v-menu></v-menu>
            </v-toolbar-items>
        </v-toolbar>

        <v-list color="transparent">
            <v-list-item  v-model="activeSlotId===slot.slotId"
                         v-for="slot in slots"
                          :key="slot.slotId"
                          @click="editSlot(slot)"
            >
                <v-list-item-title > {{slot.name}}</v-list-item-title>
                <v-list-item-icon>
                    <v-icon v-if="activeSlotId===slot.slotId">mdi-chevron-right</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('slots');
    export default {
        name: "slotList",
        data: () => ({
            sorters:{

            }
        }),
        computed: {
            ...mapGetters([
                "slots",
                "activeSlotId"
            ])
        },
        created() {
            this.getAllSlots();
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
