import * as FileSystem from 'expo-file-system';
import { insertData, fetchPlaces } from '../helpers/db';
import Env from '../Env';

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const add_place = (title, imageUri, location) => {
    // console.log('placesAction: ' + title);
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${Env.googleApiKey}`)
        const responseData = await response.json();
        // console.log(responseData);
        const address = responseData.results[0].formatted_address;
        // console.log(address);


        const fileName = imageUri.split('/').pop();
        const newImagePath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: imageUri,
                to: newImagePath
            });
            const dbResultOnInsertion = await insertData(title, newImagePath, address, location.latitude, location.longitude);
            // console.log(dbResultOnInsertion);

            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResultOnInsertion.insertId,
                    title: title,
                    imageUri: newImagePath,
                    address: address,
                    coords: {
                        latitude: location.latitude,
                        longitude: location. longitude
                    }
                }
            });
        } catch (error) {
            console.log('PlacesActions, FileSystem Error || Insertion to DB Error');
        }

    }
}

export const fetch_places = () => {
    return async dispatch => {
        try {
            const dbResultOnFetch = await fetchPlaces();
            // console.log(dbResultOnFetch);
            dispatch({
                type: SET_PLACES,
                places: dbResultOnFetch.rows._array
            })
        } catch (error) {
            console.log('Fetching data from db Error!');
            console.log(error);
        }
    }
}