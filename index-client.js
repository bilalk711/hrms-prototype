import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {hydrate} from 'react-dom'
import App from './src/App'
import store from './src/store/storeFactory'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}
hydrate(<Provider store={store}>
        <App />
        </Provider>,document.getElementById('wrapper'))

console.log(store.getState())
