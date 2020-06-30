import React from 'react';
import {Feather} from '@expo/vector-icons';
import {HeaderButton} from 'react-navigation-header-buttons';

const CustomHeaderButton = props => {
    return(
        <HeaderButton {...props} IconComponent={Feather} color='white' iconSize={23} />
    )
}

export default CustomHeaderButton;