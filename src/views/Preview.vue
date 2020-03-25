<template>
    <div>
        <v-toolbar prominent extended color="transparent" flat> <h1>Manage Slots</h1> </v-toolbar>
        <v-row>
            <v-col sm="12" lg="3">
                <slot-list/>
            </v-col>
            <v-col sm="12" lg="9">
                <slot-editor :slot-id="1"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import SlotList from "@/components/slots/slotList";
    import SlotEditor from "@/components/slots/slotEditor";
    export default {
        name: "Preview",
        components: {SlotEditor, SlotList}
    }
</script>

<style scoped>

</style>
