import React from 'react'
import { 
    View, 
    Text,
    Slider 
} from 'react-native'

const UdaciSlider = ({max, unit, step, value, onChange}) => (
    <View>
        <Slider
            value={value}
            step={step}
            maximumValue={max}
            minimumValue={0}
            onValueChange={onChange}
        />
        <View>
            <Text>{value}</Text>
            <Text>{unit}</Text>
        </View>
    </View>
)

export default UdaciSlider