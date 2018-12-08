import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import AddEntry from './components/AddEntry'

export default class App extends React.Component {
  render = () => (
    <View>
      <AddEntry />
    </View>
  )
}
