import React from 'react'
import { 
    TouchableOpacity,
    Text
} from 'react-native'

const TextButton = ({children, onPress}) => (
    <TouchableOpacity
        onPress={onPress}
    >
        <Text>{children}</Text>
    </TouchableOpacity>
)

export default TextButton