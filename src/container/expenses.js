import {connect} from 'react-redux'
import {ExpensesView} from '../ui/expenses_view'

const mapStateToProps=state=>{
      return {rowData:state.rowData}
}
const mapDispatchToProps = dispatch =>
     ({
       addData(rowData) {
           dispatch(rowData)
        }
     })


export const Expenses=connect(mapStateToProps,mapDispatchToProps)(ExpensesView)
