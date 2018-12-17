import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import TabContainer from './components/TabContainer'

const App = () => (
  <Provider store={createStore(reducer)}>
    <View style={{flex: 1}}>
      <View style={{height: 20}} />
      <TabContainer />
    </View>
  </Provider>
)

export default App