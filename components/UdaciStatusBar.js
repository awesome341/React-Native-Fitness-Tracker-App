import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

const UdaciStatusBar = ({ backgroundColor, ...props }) => (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
)

export default UdaciStatusBar