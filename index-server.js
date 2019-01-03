import React from 'react'
import ignoreStyles from 'ignore-styles'
import app from './src/server/app'





global.React = React


      app.set('port', process.env.PORT || 3000)
       .listen(
       app.get('port'),
 () => console.log('HRMS running')
 )
