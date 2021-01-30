import Slot from "@/classes/Slot";
import axios from "@/api/axios";



export default {
    insertStageToSlot(stage) {
        return Promise.resolve(stage)
    },

    putSlot(slot){
        let  _slot = makeSlot(slot);
        return axios.put('/Slots/'+_slot.slotId,_slot).then(resp => {
            return Promise.resolve(resp.data);
        })
    },
    postSlot(slot) {
        let _slot = makeSlot(slot)
        return axios.post('/Slots', _slot).then(resp => {
            return Promise.resolve(resp.data);
        })
    },
    getSlots() {
        return axios.get('/Slots').then(resp => {
            return Promise.resolve(resp.data)
        });
    },
    getSlot(slotId) {
        return axios.get('/Slots/' + slotId)
            .then(resp => {
                return Promise.resolve(resp.data);
            })
    }
}

function makeSlot(slot) {

    let _slot = null;
    if (slot instanceof Slot) {
        _slot = slot
    } else {
        _slot = new Slot(slot)
        _slot.setStages(slot.stages)
    }
    return _slot
}