import {connect} from 'react-redux'
import {UsersCatalogView} from '../ui/users_catalog_view'

const mapStateToProps=state=>{
      return {users:state.users}
}

export const UsersCatalog=connect(mapStateToProps,null)(UsersCatalogView)
