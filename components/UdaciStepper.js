import React from 'react'
import { 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const UdaciStepper = ({max, unit, step, value, onIncrement, onDecrement}) => (
    <View>
        <View>
            <TouchableOpacity
                onPress={onDecrement}
            >
                <Ionicons name='ios-remove' size={30} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onIncrement}
            >
                <Ionicons name='ios-add' size={30} />
            </TouchableOpacity>
        </View>
        <View>
            <Text>{value}</Text>
            <Text>{unit}</Text>
        </View>
    </View>
)

export default UdaciStepper