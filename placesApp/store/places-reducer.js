import { ADD_PLACE, SET_PLACES } from "./places-action";
import Place from "../model/Place";

const initialState ={
    places: []
}

const placesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_PLACES:
            return{
                places: action.places.map(place=> new Place(
                    place.id.toString(),
                    place.title,
                    place.imageUri,
                    place.address,
                    place.latitude,
                    place.longitude
                ))
            }
        case ADD_PLACE:
            const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.imageUri, action.placeData.address, action.placeData.coords.latitude, action.placeData.coords.longitude);
            return{
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}

export default placesReducer;