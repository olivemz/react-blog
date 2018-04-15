import {GET_ALL_CATEGORIES} from "../actions/Categories";

const initialCategoryState = []

export function category (state = initialCategoryState, action) {

    switch (action.type) {
        case GET_ALL_CATEGORIES :
            const {data} = action
            if (!('categories' in data)) return state
            return data.categories
        default :
            return state
    }
}