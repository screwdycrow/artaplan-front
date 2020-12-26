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
            <v-list-item v-for="slot in slots" :to="'/slots/'+slot.slotId">
                <v-list-item-content>
                    <v-list-item-title> {{slot.name}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('slots');
    export default {
        name: "slotList",
        components: {},
        data: () => ({
            sorters: {}
        }),
        computed: {
            ...mapGetters([
                "slots",
            ])
        },
        created() {
            this.getAllSlots();
        },
        methods: {

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
