<template>
    <v-app id="inspire"
    >
        <!--<v-navigation-drawer
                color="primary darken-4"
                app
                left
                :mini-variant="drawerRight"
        >
            <v-toolbar color="primary" dark flat>
                <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"/>
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
        </v-navigation-drawer> -->
        <sidebar :show="drawerRight" />
        <v-content>
            <v-container
                    class="pa-6 pt-2"
                    style="max-width: 1500px"
            >
                <v-btn
                        fixed
                        color="primary"
                        dark
                        bottom
                        right
                        fab
                >
                    <v-icon>mdi-calendar</v-icon>
                </v-btn>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Sidebar from "@/components/Sidebar";
    export default {
        name: 'App',

        components: {Sidebar},

        data: () => ({
            drawerRight: true
            //
        }),
    };
</script>
