<template>
    <v-list-item :value="slotObj">
        <v-list-item-title> {{slotObj.name}}</v-list-item-title>
        <v-list-item-icon>
            <v-icon v-if="showAction">mdi-chevron-right</v-icon>
        </v-list-item-icon>
    </v-list-item>
</template>

<script>
    import Slot from "@/classes/Slot";

    export default {
        name: "SlotListItem",
        props: {
            slotObj: Slot,
            showAction: Boolean
        }
    }
</script>

<style scoped>

</style>
