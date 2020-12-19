import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import {whitesmoke} from "color-name"

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark:true,
        themes: {
            dark:{
                    topbar:"#151516",
                    faded:"#35363a",
                    primary: '#cf52b0',
                    secondary: '#3933a9',
                    anchor: '#8c9eff',
                    background: '#151516'
            },
            light: {
                topbar:"#f5f5f5",
                primary: '#f378ca',
                secondary: '#525adb',
                anchor: '#8c9eff',
                background: '#f5f5f5'
            },
        },
    },
});
