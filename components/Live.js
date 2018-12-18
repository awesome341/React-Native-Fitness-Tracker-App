import React, { Component } from 'react'
import { 
    View, 
    Text, 
    ActivityIndicator, 
    TouchableOpacity, 
    StyleSheet,
    Animated,
} from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { Location, Permissions } from 'expo'

import { purple, white, orange, gray } from '../utils/colors'
import { calculateDirection } from '../utils/helpers'

class Live extends Component {
    state = {
        coords: null,
        status: null,
        direction: '',
        bounceValue: new Animated.Value(1)
    }

    componentDidMount() {
        Permissions.getAsync(Permissions.LOCATION)
            .then(({status}) => {
                if ( status === 'granted' ) {
                    return this.setLocation()
                }

                this.setState(() => ({status}))
            })
            .catch( err => {
                console.warn('Error getting location permission: ', err)
                this.setState(() => ({status: 'undetermined'}))
            })
    }

    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({status}) => {
                if ( status === 'granted' ) {
                    return this.setLocation()
                }

                this.setState(() => ({ status }))
            })
            .catch( err => console.warn('Error asking Location permission: ', err) )
    }

    setLocation = () => {
        Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 1,
            distanceInterval: 1,
        }, ({coords}) => {
            const newDirection = calculateDirection(coords.heading)
            const { direction, bounceValue } = this.state

            if ( direction !== newDirection ) {
                Animated.sequence([
                    Animated.timing(bounceValue, {duration: 200, toValue: 1.04}),
                    Animated.spring(bounceValue, {toValue: 1, friction: 4})
                ]).start()
            }

            this.setState(() => ({
                coords,
                status: 'granted',
                direction: newDirection
            }))
        })
    }

    render() {
        const {status, coords, direction, bounceValue} = this.state

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
                        onPress={() => this.askPermission()}  
                    >
                        <Text style={styles.btnText}>
                            Enable
                        </Text>
                    </TouchableOpacity>
                </View >
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.directionContainer}>
                    <Text style={styles.header}>
                        You're heading
                    </Text>
                    <Animated.Text style={[styles.direction, {transform: [{scale: bounceValue}]}]}>
                        {direction}
                    </Animated.Text>
                </View>
                <View style={styles.metricContainer}>
                    <View style={styles.metric}>
                        <Text style={[styles.header, {color: white}]}>
                            Altitude
                        </Text>
                        <Text style={[styles.subHeader, { color: white }]}>
                            {Math.round(coords.altitude)} Meters
                        </Text>
                    </View>
                    <View style={styles.metric}>
                        <Text style={[styles.header, { color: white }]}>
                            Speed
                        </Text>
                        <Text style={[styles.subHeader, { color: white }]}>
                            {(coords.speed * 3.6).toFixed(1)} KM/H
                        </Text>
                    </View>
                </View>
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
    },
    directionContainer: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        textAlign: 'center',
    },
    direction: {
        color: purple,
        fontSize: 100,
        textAlign: 'center',
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: purple,
    },
    metric: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    subHeader: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 5,
    }
})

export default Live