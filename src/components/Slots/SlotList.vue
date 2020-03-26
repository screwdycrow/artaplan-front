<template>
    <v-card color="">
        <v-toolbar  flat>
            <v-toolbar-title>
              <h3 class="headline">  Your slots</h3>
            </v-toolbar-title>
        </v-toolbar>
        <v-list color="transparent">
            <v-list-item active-class="active" @click="active=slot.slotId" v-model="active===slot.slotId"
                         v-for="slot in slots" :key="slot.slotId">
                <v-list-item-title @click="editSlot"> {{slot.name}}</v-list-item-title>
                <v-list-item-icon>
                    <v-icon v-if="active===slot.slotId">mdi-chevron-right</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list>
        <v-card-actions >
            <v-btn color="primary" rounded text large> <v-icon> mdi-plus</v-icon> New slot</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('slots');
    export default {
        name: "slotList",
        data: () => ({
            active: 1
        }),
        computed: {
            ...mapGetters([
                "slots"
            ])
        },
        created() {
            this.getAllSlots();
        },
        methods: {
            editSlot(slot) {
                this.$emit("slotClicked", slot.slotId);
            },
            ...mapActions([
                "getAllSlots"
            ]),
            ...mapMutations([
                "pushSlotToList",
                "removeSlotFromList",

            ])
        }

    }

</script>

<style scoped>
    .active {

    }
</style>
