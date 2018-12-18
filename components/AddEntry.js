import React, { Component } from 'react'
import { 
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Platform,
    StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

// Local 
import { 
    getMetricMetaInfo,
    timeToString,
    getDailyReminderValue,
    clearLocalNotifications,
    setLocalNotification,
} from '../utils/helpers'
import {
    removeEntry,
    submitEntry,
} from '../utils/api'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { addEntry } from '../actions'
import { 
    white, 
    purple, 
    blue,
} from '../utils/colors'

const INITIAL_STATE = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
}

const SubmitBtn = ({onPress}) => (
    <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
        onPress={onPress}
    >
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
)

class AddEntry extends Component {
    state = INITIAL_STATE

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        this.setState( (state) => {
            const count = state[metric] + step
            
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state
        const { addEntry, toHome } = this.props
        
        addEntry(key, entry)

        this.setState( () => INITIAL_STATE)

        toHome()

        submitEntry(key, entry)

        clearLocalNotifications()
            .then(setLocalNotification)
    }

    reset = () => {
        const key = timeToString()
        const { addEntry, toHome } = this.props

        addEntry(key, getDailyReminderValue())

        toHome()

        removeEntry(key)
    }
    
    render = () => {
        const metaInfo = getMetricMetaInfo()

        if ( this.props.alreadyLogged ) {
            return (
                <View style={styles.center}>
                    <Ionicons 
                        name='ios-rocket'
                        color={blue}
                        size={100}
                    />
                    <Text>You already logged your information for today</Text>
                    <TextButton 
                        style={{padding: 10}}
                        onPress={this.reset}
                    >
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <ScrollView style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map( key => {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View 
                            key={key}
                            style={styles.row}
                        >
                            {getIcon()}
                            {type === 'slider'
                                ? <UdaciSlider 
                                    value={value}
                                    onChange={(value) => this.slide(key, value)} 
                                    {...rest}
                                  />
                                : <UdaciStepper 
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                  />
                            }
                        </View>
                    )
                })}

                <SubmitBtn onPress={this.submit}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 3,
        paddingTop: 3,
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})

const mapStateToProps = (state) => ({
    alreadyLogged: state[timeToString()] && typeof state[timeToString()].today === 'undefined'
})

const mapDispatchToProps = (dispatch, {navigation}) => ({
    addEntry: (key, value) => dispatch(addEntry({ [key]: value })),
    toHome: () => navigation.dispatch(NavigationActions.back({
        key: 'AddEntry'
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry)