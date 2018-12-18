import React, { Component } from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import MainNavigator from './components/MainNavigator'
import UdaciStatusBar from './components/UdaciStatusBar'
import { purple } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

class App extends Component{
  componentDidMount() {
    setLocalNotification()  
  }

  render = () => (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <MainNavigator />
      </View>
    </Provider>
  )
}

export default App