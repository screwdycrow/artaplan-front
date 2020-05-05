import slotApi from '../../api/slots'
import Vue from 'vue'

function findSlot(id) {
    return (s) => s.slotId === id;
}

export default ({
    namespaced: true,
    state: {
        activeSlotId: null,
        showSlotEditor: false,
        slots: [],
        slot: {},
        defaultSlot: {
            name: "",
            price: 45,
            notes: [],
            stages: [],
        }
    },
    actions: {
        insertStageToSlot({commit}, stage) {
            slotApi.insertStageToSlot({commit}, stage)
                .then(stage => {
                    commit("pushStageToSlot", stage)
                })
        },
        toggleStageDefault({commit}, stage) {
            stage.isDefault = !stage.isDefault
            slotApi.toggleStageDefault(stage).then(stage => {
                commit('setStageInSlot', stage)
            })
        },
        getAllSlots({commit}) {
            slotApi.getSlots().then(slots => {
                commit("setSlots", slots)
                if(slots.length>0)commit("setActiveSlot",slots[0])
            })
        },
        getSlot({commit}, id) {
            slotApi.getSlot(id).then(slot => commit('setSlot', slot))
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

        setSlot(state, slot) {
            state.slot = Object.assign({}, slot)
        },
        toogleEditor(state) {
            state.showSlotEditor = !state.showSlotEditor;
        },
        setActiveSlot(state, slot){
            state.activeSlotId = slot.slotId;
        },
        setSlots(state, slots) {
            state.slots = slots
        },
        pushSlotToList(state, slot) {
            state.slots.push(Object.assign({}, slot))
        },
        setSlotInList({state}, slot) {
            const index = state.slots.findIndex(findSlot(slot.slotId));
            if (index !== -1) Vue.set(state.slots, index, slot)
        },
        removeSlotFromList({state}, slot) {
            const index = state.slots.findIndex(findSlot(slot.slotId));
            if (index !== -1) {
                state.slots.splice(index, 1)
            }
        }

    },
    getters: {
        activeSlotId: (s) => s.activeSlotId,
        slots: (s) => s.slots,
        slot: (s) => Object.assign(s.slot),
        showSlotEditor: (s) => s.showSlotEditor,
    },
});
