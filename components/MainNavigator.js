import React from 'react'
import { Platform } from 'react-native'
import { 
    createBottomTabNavigator, 
    createAppContainer,
    createStackNavigator,
} from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import AddEntry from './AddEntry'
import History from './History'
import EntryDetail from './EntryDetail'
import Live from './Live'
import { purple, white } from '../utils/colors'

const TabContainer = createBottomTabNavigator({
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        }
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: 'Add Entry',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    },
    Live: {
        screen: Live,
        navigationOptions: {
            tabBarLabel: 'Live',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
        }
    }
}, 
{
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowOpacity: 1,
            shadowRadius: 6,
        }
    }
})

const MainNavigator = createStackNavigator({
    Home: {
        screen: TabContainer
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        }
    },
})

export default createAppContainer(MainNavigator)