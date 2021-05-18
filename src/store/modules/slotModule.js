import slotApi from '../../api/slots'
import Vue from 'vue'
import Slot from "@/classes/Slot";
import Messages from "@/store/Messages";
import _ from 'lodash'

export default ({
    namespaced: true,
    state: {
        slots: [],
        slot: {},

    },
    actions: {
        putSlot({commit},slot){
            commit('setLoading', true, {root: true})
            return  slotApi.putSlot(slot).then(resp => {
                commit('updateSlotInList',slot)
                commit('setLoading', false, {root: true})
                commit('pushMessage',{type:'success',text:'updated'},{root:true})
                return Promise.resolve(resp)
            });
        },
        addSlot({commit}, slot) {
            commit('setLoading', true, {root: true})
           return  slotApi.postSlot(slot).then(resp => {
                commit('setLoading', false, {root: true})
                commit('pushMessage',{type:'success',text:Messages.SLOT_ADDED},{root:true})
                return Promise.resolve(resp)
            });
        },
        insertStageToSlot({commit}, stage) {
            slotApi.insertStageToSlot({commit}, stage)
                .then(stage => {
                    commit("pushStageToSlot", stage)
                })
        },
        getAllSlots({commit}) {
            commit('setLoading', true, {root: true})
            return slotApi.getSlots().then(slots => {
                commit("setSlots", slots);
                commit('setLoading', false, {root: true})
                Promise.resolve(slots);
            })
        },

        getSlot({commit}, id) {
            commit('setLoading', true, {root: true})
            return slotApi.getSlot(id).then(slot => {
                commit('setLoading', false, {root: true})
                commit('setSlot', slot)
                return Promise.resolve(slot)
            })
        }
    },
    mutations: {
        setStageInSlot(state, stage) {
            const index = state.slot.stages.findIndex(s => s.stageId === stage.stageId);
            Vue.set(state.slot.stages, index, stage)
        },
        pushStageToSlot(state, stage) {
            state.slot.stages.push(Object.assign({}, stage))
        },
        updateSlotInList(state, slot){
            const index = state.slots.findIndex((s) => s.slotId === slot.slotId);
            if (index !== -1) {
                Vue.set(state.slots,index,slot)
            }
        },
        setSlot(state, slot) {
            state.slot = new Slot(slot)
        },

        setSlots(state, slots) {
            state.slots = slots.map(s => new Slot(s))
        },
        pushSlotToList(state, slot) {
            state.slots.push(Object.assign({}, slot))
        },
        removeSlotFromList({state}, slot){
            const index = state.slots.findIndex((s) => s.slotId === slot.slotId);
            if (index !== -1) {
                state.slots.splice(index, 1)
            }
        },

    },
    getters: {
        slots: (s) => s.slots,
        slot: (s) => s.slot,
        slotId: (s) => s.slotId,
    },
});
