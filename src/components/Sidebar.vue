<template>
    <v-navigation-drawer
            color="primary darken-4"
            app
            left
            :mini-variant="show"
    >
        <v-toolbar color="primary" dark flat>
            <v-app-bar-nav-icon @click.stop="show = !show"/>
            <v-toolbar-title>
                <h1 class="headline"> ARTAPLAN</h1>
            </v-toolbar-title>
        </v-toolbar>
        <v-list >
            <v-list-item to="/slots">
                <v-list-item-icon><v-icon> mdi-brush</v-icon> </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
                        Slots
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/jobs">
                <v-list-item-icon><v-icon small> mdi-briefcase</v-icon></v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        Jobs
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Sidebar",
        props:{show:Boolean}
    }
</script>

<style scoped>

</style>
