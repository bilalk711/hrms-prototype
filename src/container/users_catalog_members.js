import {connect} from 'react-redux'
import {UsersCatalogMembersView} from '../ui/users_catalog_members_view'

const mapStateToProps=state=>{
      return {users:state.users}
}

export const UsersCatalogMembers=connect(mapStateToProps,null)(UsersCatalogMembersView)
