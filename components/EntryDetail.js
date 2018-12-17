import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import MetricCard from './MetricCard'
import { formatDate } from '../utils/helpers'
import { white } from '../utils/colors'

class EntryDetail extends PureComponent { 
    static navigationOptions = ({navigation}) => {
        const { entryId } = navigation.state.params
        return {
            title: formatDate(entryId)
        }
    }

    render = () => {
        const { metrics } = this.props

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
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

export default connect(mapStateToProps)(EntryDetail)
