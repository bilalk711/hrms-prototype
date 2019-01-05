

const initialModalState = {
        modalType: null
}
export const modal=(state = initialModalState, action)=>{
        const newState = Object.assign({}, state)
                    switch (action.type) {
                        case SHOW_MODAL:
                          newState.modalType = action.modalType;
                          break
                        case HIDE_MODAL:
                          return initialModalState;
                        default:
                          return state;
                    }
        return newState
}
export const project=(state={},action)=>{
                     switch (action.type) {
                            case 'ADD_PROJECT':
                                  return action.payload
                            case 'EDIT_PROJECT':
                                   const newProject=action.payload
                                   return(newProject.id===state.id) ? newProject : state
                           case 'FETCH_PROJECT':
                                   return (state.project_id===action.payload.project_id) ? state : state
                            default:
                                            return state
                   }
                    }

export const projects=(state=[],action)=>{
                      switch (action.type) {
                             case 'ADD_PROJECT':
                                      return [...state,project({}, action)]
                             case 'REMOVE_PROJECT':
                                      return state.filter(c => c.id !== action.payload.id)
                             case 'EDIT_PROJECT':
                                      return state.map(s=>project(s,action))
                             case 'CHANGE_STATE_PROJECTS':
                                      return action.payload.state
                             case 'FETCH_PROJECT':
                                      return state.map(s=>project(s,action))
                             default:
                                      return state
                    }
}
export const users=(state=[],action)=>{
                     switch (action.type) {
                             case 'SIGNUP_USER':
                                   return [...state,{
                                     username:action.payload.email,
                                     name:action.payload.name,
                                     email:action.payload.email,
                                     id:action.payload.id,
                                     picture:action.payload.picture,
                                     employee_id:action.payload.employee_id,
                                     createdAt:action.payload.createdAt
                                   }]
                            case 'EDIT_USER':
                                     return state.map(s=>user(s,action))
                            case 'REMOVE_USER':
                                     return state.filter(s=>user(s,action))
                            case 'CHANGE_STATE_USERS':
                                  return action.payload.state
                            default:
                                   return state
                   }
}
export const user=(state={},action)=>{
                 switch (action.type) {
                   case 'LOGIN_USER':
                            return (state.payload.id===action.payload.id) ? {...state,loggedin:true} : state
                   case 'LOGOUT_USER':
                            return (action.payload.id===state.payload.id) ? {...state,loggedin:false} : state
                   case 'EDIT_USER':
                            const newUser=action.payload
                            return(newUser.id===state.id) ? {...newUser,createdAt:state.createdAt,employee_id:state.employee_id} : state
                   case 'REMOVE_USER':
                            return state.id!==action.payload.id
                   default:
                            return state
                 }
}
export const currentUser=(state={},action)=>{
                  switch (action.type) {
                    case 'CURRENT_USER':
                          return {
                                  email:action.payload.user.email,
                                  username:action.payload.user.email,
                                  name:action.payload.user.name,
                                  id:action.payload.user.user_id,
                                  picture:action.payload.user.picture
                                }
                    default:
                            return state
                  }
}
export const rowData=(state=[],action)=>{
                 switch (action.type) {
                   case 'SAVE_DATA_GRID':
                         return action.payload.rowData
                   default:
                         return state
                 }
}
