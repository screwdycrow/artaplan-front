<template>
    <v-card>
        <v-tabs>
            <v-tab>
                Stages
            </v-tab>
            <v-tab>
                Stages of other Slots.
            </v-tab>
            <v-tab-item>
                <v-card-text>

                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                <v-card-text>

                </v-card-text>
            </v-tab-item>
        </v-tabs>

    </v-card>
    
</template>

<script>
    import {createNamespacedHelpers} from "vuex";
    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('stages');
    export default {
        name: "StageList"
    }
</script>

<style scoped>

</style>
