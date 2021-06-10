import moment from 'moment'
import TimeLog from "@/classes/TimeLog"
import Vue from 'vue'

export default ({
    namespaced: true,
    state: {
        mainFolder: null,
        folders: [],
    },
    actions: {

        grantFileSystemAccess({commit}) {

        },
        getFilesOfPath({commit}) {

        }
    },
    mutations: {

        setFolders(){

        },
        loadPathFromLocal() {
        }

    },
    getters: {
        hasAccess: (s) => {
        }
    },
});
