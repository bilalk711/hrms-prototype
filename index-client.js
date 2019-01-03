import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {hydrate} from 'react-dom'
import App from './src/App'
import store from './src/store/storeFactory'



hydrate(<Provider store={store}>
        <App />
        </Provider>,document.getElementById('wrapper'))

console.log(store.getState())
