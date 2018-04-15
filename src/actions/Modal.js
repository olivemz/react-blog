export const HIDE_MODAL="HIDE_MODAL"
export const SHOW_MODAL="SHOW_MODAL"


export function hideModal({modalType, modalProps}){
    return {
        type: HIDE_MODAL,
        modalType,
        modalProps
    }
}

export function showModal({modalType, modalProps}){
    return {
        type: SHOW_MODAL,
        modalType,
        modalProps
    }
}