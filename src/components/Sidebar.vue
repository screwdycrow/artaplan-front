<template>
    <v-navigation-drawer
            tile
            color="secondary"
            app
            dark
            left
            v-model="opened"
            :mini-variant="show"
    >
        <v-toolbar class="pt-4" extended extension-height="30" color="transparent" dark flat>
            <v-app-bar-nav-icon class="" color=""  @click.stop="show = !show"><v-icon>mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
            <v-toolbar-title>
                <h1 class="headline"> ARTAPLAN</h1>
            </v-toolbar-title>
        </v-toolbar>
        <v-list class="primary--text text--lighten-2">
            <v-list-item to="/">
                <v-list-item-icon><v-icon> mdi-home</v-icon> </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
                        Dashboard
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/slots">
                <v-list-item-icon><v-icon> mdi-brush</v-icon> </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
                        Job Templates
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
            <v-list-item to="/schedule">
                <v-list-item-icon><v-icon small> mdi-calendar</v-icon></v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        Schedule
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Sidebar",
        props:{show:Boolean,opened:Boolean}
    }
</script>

<style scoped>

</style>
