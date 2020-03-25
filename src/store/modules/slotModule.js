import slotApi from '../../api/slots'

function findSlot(id) {
    return (s) => s.slotId === id;
}
export default ({
    namespaced: true,
    state: {
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
        getAllSlots({commit}) {
            slotApi.getSlots().then(slots => {
                commit("setSlots", slots)
            })
        },
        getSlot({commit}, id) {
            slotApi.getSlot(id).then(slot => commit('setSlot', slot))
        }
    },
    mutations: {
        setSlot(state, slot) {
            state.slot = Object.assign({}, slot)
        },
        toogleEditor(state) {
            state.showSlotEditor = !state.showSlotEditor;
        },
        setSlots(state, slots) {
            state.slots = slots
        },
        pushSlotToList(state, slot) {
            state.slots.push({}, Object.assign(slot))
        },
        updateSlotInList({state}, slot) {
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
        slots: (s) => s.slots,
        slot: (s) => Object.assign(s.slot),
        showSlotEditor: (s) => s.showSlotEditor,
    },
});
