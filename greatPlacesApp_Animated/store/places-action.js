import * as FileSystem from 'expo-file-system';
import { insertData, fetchPlaces } from '../helpers/db';
import Env from '../Env';

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, imageUri, location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${Env.googleApiKey}`);
        const resData = await response.json();
        // console.log(resData);
        const address = resData.results[0].formatted_address;

        const fileName = imageUri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        await FileSystem.moveAsync({
            from: imageUri,
            to: newPath
        });
        const dbResult = await insertData(title, newPath, address, location.latitude, location.longitude);
        // console.log(newPath);
        console.log(dbResult);
        dispatch({
            type: ADD_PLACE,
            placeData: {
                id: dbResult.insertId,
                title: title,
                imageUri: newPath,
                address: address,
                coords: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
            }
        })
    }
}

export const fetchAllPlaces = () => {
    return async dispatch => {
        const dbResult = await fetchPlaces();
        // console.log(dbResult);
        dispatch({
            type: SET_PLACES,
            places: dbResult.rows._array
        })
    }
}