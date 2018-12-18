import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'

import { purple, white, orange, gray } from '../utils/colors'

class Live extends Component {
    state = {
        coords: null,
        status: 'denied',
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
                <View style={styles.center}>
                    <Foundation name='alert' size={50} color={orange} />
                    <Text style={styles.alertText}>
                        You denied your location.
                    </Text>
                    <Text style={styles.alertInfoText}>
                        Fix this by visiting settings and enabling location services for this app.
                    </Text>
                </View >
            )
        }

        if ( status === 'undetermined' ) {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50} color={orange} />
                    <Text style={styles.alertText}>
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
    alertText: {
        fontSize: 20,
        color: purple,
        textAlign: 'center',
        justifyContent: 'center',
    },
    alertInfoText: {
        fontSize: 15,
        color: gray,
        margin: 20,
        textAlign: 'center',
        justifyContent: 'center',
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