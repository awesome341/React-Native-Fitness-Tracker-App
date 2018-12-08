import React, { Component } from 'react'
import { 
    View,
    TouchableOpacity,
    Text,
} from 'react-native'

// Local 
import { 
    getMetricMetaInfo,
    timeToString,
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'

const INITIAL_STATE = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
}

const SubmitBtn = ({onPress}) => (
    <TouchableOpacity
        onPress={onPress}
    >
        <Text>SUBMIT</Text>
    </TouchableOpacity>
)

export default class AddEntry extends Component {
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
        
        // TODO: Update Redux

        this.setState( () => INITIAL_STATE)

        // TODO: Navigate to Home

        // TODO: Save to 'DB'

        // TODO: Clear local notification
    }
    
    render = () => {
        const metaInfo = getMetricMetaInfo()
        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map( key => {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
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
            </View>
        )
    }
}
