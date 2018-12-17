import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import MetricCard from './MetricCard'
import TextButton from './TextButton'
import { formatDate, timeToString, getDailyReminderValue } from '../utils/helpers'
import { white } from '../utils/colors'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'

class EntryDetail extends Component { 
    static navigationOptions = ({navigation}) => {
        const { entryId } = navigation.state.params
        return {
            title: formatDate(entryId)
        }
    }

    reset = () => {
        const { remove, goBack, entryId } = this.props

        remove()
        goBack()
        removeEntry(entryId)
    }

    shouldComponentUpdate = (nextProps) => {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    render = () => {
        const { metrics } = this.props

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton 
                    onPress={this.reset}
                    style={{margin: 20}}
                >
                    Reset
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    }
})

const mapStateToProps = (state, {navigation}) => {
    const { entryId } = navigation.state.params

    return {
        entryId,
        metrics: state[entryId]
    }
}

const mapDispatchToProps = (dispatch, {navigation}) => {
    const { entryId } = navigation.state.params

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? getDailyReminderValue()
                : null
        })),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)
