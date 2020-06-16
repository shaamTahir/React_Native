export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggle_favourite = (id) => {
    return{
        type: TOGGLE_FAVOURITE,
        mealID : id
    }
}

export const set_filters = filterSettings => {
    return{
        type: SET_FILTERS,
        filters: filterSettings
    }
}