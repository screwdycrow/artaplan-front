<template>
    <v-card width="240" class="mb-3 mr-3 d-flex" >
        <v-img src="https://cdnb.artstation.com/p/assets/images/images/024/868/987/large/dimitris-tzilivakis-final.jpg?1583798280"
               class="pa-2 white--text align-end text-center text-wrap"
               gradient="to bottom, rgba(0,0,0,.1), #3933a9"
               height="240px"
        >
            <v-row dense>
                <v-col lg="9" sm="12">
                    Star wars character design werw rwrw
                </v-col>
                <v-col>
                    50$
                </v-col>
            </v-row>
            <v-progress-linear height="3" color="primary" value="10" ></v-progress-linear>
        </v-img>
    </v-card>
</template>

<script>
    export default {
        name: "JobCard"
    }
</script>

<style scoped>

</style>