import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import PropTypes from 'prop-types';


export default function CustomButton({onPress, title}) {
    return (
        <TouchableOpacity
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="items-center p-4 rounded-full w-full"
            onPress={onPress}
        >
            <Text className="text-white text-lg font-medium">{title}</Text>
        </TouchableOpacity>
    )
}
//ensuring props receive the correct data types and values.
CustomButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}