import Place from '../models/Place';
import { ADD_PLACE, SET_PLACES } from "./places-action";

const initialState = {
    places: []
}

export default placesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_PLACES:
            return{
                places: action.places.map(pl => new Place(
                    pl.id.toString(),
                    pl.title,
                    pl.imageUri,
                    pl.address,
                    pl.latitude,
                    pl.longitude
                ))
            }
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.imageUri,
                action.placeData.address,
                action.placeData.coords.latitude,
                action.placeData.coords.longitude,
            )
            return{
                places: state.places.concat(newPlace)
            }
    }
    return state;
}