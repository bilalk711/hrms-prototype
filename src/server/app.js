import express from 'express'
import fs from 'fs'
import path from 'path'
import { firebase } from './firebase/admin'
import { refProjects, fromStore, app } from '../db/firebase'
import App from '../App'
import { compose } from 'redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import bodyParser from 'body-parser'
import userCommands from './userCommands'
import router from './routes'
import store from '../store/storeFactory'
import initialState from '../data/initialState.json'
const cookieParser = require('cookie-parser')
const cors = require('cors')({origin: true})


store.subscribe(() =>{
 fs.writeFile(path.join(__dirname, '../data/initialState.json'),
 JSON.stringify(store.getState()),
 error => (error) ?
 console.log("Error saving state!", error) :
 null
 )
 fromStore(store.getState(), app)
}
)


const validateFirebaseIdToken = async (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    res.status(403).json({"error":"Unauthorized"});
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).json({"error":"Unauthorized"});
    return;
  }

  try {
    const decodedIdToken = await firebase.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    res.json({"user":decodedIdToken})
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).json({"error":error});
    return;
  }
}

const removeUser=function (req,res,next){
      try{
          firebase.auth().deleteUser(req.params.uid)
          res.json({"message":"User Deleted Permanently"})
      }
      catch(error){
          console.log(error)
          res.status(403).json({"error":error})
      }
}

const fileAssets = express.static(
 path.join(__dirname,  '../../assets')
)
const stylesheets = express.static(
  path.join(__dirname, '../stylesheets')
)
const images = express.static(
  path.join(__dirname,'../../images')
)

const renderComponentsToHTML = ({url, store}) =>
                               ({
                                 state: store.getState(),
                                 html: renderToString(
                                     <Provider store={store}>
                                     <StaticRouter location={url} context={{}}>
                                     <App />
                                     </StaticRouter>
                                     </Provider>
                                 )
                               })

const buildHTMLPage = ({html,state}) =>
                        `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                         <meta charset="utf-8">
                         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                         <meta name="theme-color" content="#000000">
                         <title>HRMS</title>
                         <style type="text/css" rel="stylesheet" href="/index.css">
                         </style>
                         </head>
                         <body>
                         <div id="wrapper">${html}</div>
                         <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
                         <script src="/bundle.js"></script>
                         </body>
                        </html>`

const makeClientStoreFrom = store => url =>
                         ({
                         store: store,
                         url
                         })

const htmlResponse = compose(
                          buildHTMLPage,
                          renderComponentsToHTML,
                          makeClientStoreFrom(store)
                         )

const addStoreToRequestPipeline = (req, res, next) => {
                                  req.store = store
                                  next()
                       }

const logger = (req, res, next) => {
       console.log(`${req.method} request for '${req.url}'`)
       next()
}

const respond = (req, res) =>
   res.status(200).send(htmlResponse(req.url))

export default express()
 .use(logger)
 .use(stylesheets)
 .use(fileAssets)
 .use(images)
 .use(bodyParser.json())
 .use(addStoreToRequestPipeline)
 .use('/api', router)
 .use('/admin',userCommands)
 .get('/login/authenticate',validateFirebaseIdToken)
 .use(respond)
