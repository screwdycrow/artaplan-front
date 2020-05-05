<template>
    <v-list-item>
        <v-list-item-action>
            <v-checkbox/>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title> Star Wars Chararacter</v-list-item-title>
            <v-list-item-subtitle class="text--primary">Flat Colouring</v-list-item-subtitle>
            <v-list-item-subtitle> Wynslow</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-action-text> 2 hours</v-list-item-action-text>
            <v-icon
                    v-if="!active"
                    color="grey lighten-1"
            >
                mdi-clock
            </v-icon>

        </v-list-item-action>
        <v-list-item-avatar>
            <v-img src="https://cdnb.artstation.com/p/assets/images/images/024/868/987/large/dimitris-tzilivakis-final.jpg?1583798280"></v-img>
        </v-list-item-avatar>
    </v-list-item>
</template>

<script>
    export default {
        name: "StageItem"
    }
</script>

<style scoped>

</style>