<template>
    <div>
        <v-toolbar extended color="transparent" flat> <h1>Manage Slots</h1> </v-toolbar>
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
    import SlotList from "@/components/Slots/SlotList";
    import SlotEditor from "@/components/Slots/SlotEditor";
    export default {
        name: "Slots",
        components: {SlotEditor, SlotList}
    }
</script>

<style scoped>

</style>
