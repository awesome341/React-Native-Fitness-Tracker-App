import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'

import { purple, white } from '../utils/colors'

class Live extends Component {
    state = {
        coords: null,
        status: 'undetermined',
        direction: '',
    }

    askPermission = () => {

    }

    render() {
        const {status, coords, direction} = this.state

        if ( status === null ) {
            return <ActivityIndicator style={{marginTop: 30}} />
        }

        if ( status === 'denied' ) {
            return (
                <View>
                    <Text>Denied</Text>
                </View >
            )
        }

        if ( status === 'undetermined' ) {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text>
                        This app need location services.
                    </Text>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.askPermission}  
                    >
                        <Text style={styles.btnText}>
                            Enable
                        </Text>
                    </TouchableOpacity>
                </View >
            )
        }

        return (
            <View>
                <Text>Live</Text>
                <Text>{JSON.stringify(this.state)}</Text>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'space-between',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    btn: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20
    },
    btnText: {
        color: white,
        fontSize: 20,
    }
})

export default Live