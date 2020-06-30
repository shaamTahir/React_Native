import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import Env from '../Env';

const MapPreview = props => {
    let imagePreviewUrl;
    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.latitude},${props.location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.latitude},${props.location.longitude}&key=${Env.googleApiKey}`;

    }

    return (
        <TouchableOpacity style={{...styles.locationPreview, ...props.style}}onPress={props.onSelect} activeOpacity={0.5}>
           {props.location ? <Image source={{uri: imagePreviewUrl}} style={styles.image} /> : props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    locationPreview: {
        justifyContent :"center",
        alignItems :"center"
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;