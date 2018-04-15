import {HIDE_MODAL, SHOW_MODAL} from "../actions/Modal";
const intialModalState = {
    modalType: null,
    modalProps: {}
}

export function modal (state = intialModalState, action){
    switch (action.type){
        case HIDE_MODAL:
            return {
                modalType: null,
                modalProps: {}
            }
        case SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        default:
            return state
    }
}