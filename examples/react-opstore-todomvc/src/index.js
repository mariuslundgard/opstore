import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'opstore'
import App from './containers/App'
import {Provider} from 'react-opstore'
import 'todomvc-app-css/index.css'

const store = createStore({
  todo: {
    filter: location.hash.substr(2),
    items: []
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
