import { createStore,
            applyMiddleware,combineReducers } from 'redux'
import {project,projects,users,currentUser,rowData,admin} from './reducers/reducer'
import { reducer as formReducer } from 'redux-form'
import initialState from '../data/initialState.json'
import thunk from 'redux-thunk'

const reducers={project,projects,users,rowData,currentUser,admin,form:formReducer}

const stateData=[{
          title:'Regional Website',
          client:'Yenkai Chong',
          agency:'DT',
          employee:'Bilal Kazmi',
          date_started:new Date().toLocaleDateString(),
          description:'lorem ipsum dollar tipsum',
          status:'In Progress',
          project_id:'3e2abd32dcetfh_25'
}]


const logger = store => next => action => {
       let result
       console.groupCollapsed("dispatching", action.type)
       console.log('prev state', store.getState())
       console.log('action', action)
       result = next(action)
       console.log('next state', store.getState())
       console.groupEnd()
}

const middleware= [logger,thunk]

const storeFactory = (initialState=stateData) =>
       applyMiddleware(...middleware)(createStore)(
       combineReducers(reducers),
       stateData
 )
const store = storeFactory(initialState)
export default store
