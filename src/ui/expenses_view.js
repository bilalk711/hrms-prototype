import React from 'react'
import propTypes from 'prop-types'
import {Navigation} from './navigation_view'
import { AgGridReact } from 'ag-grid-react'
import {Header} from '../container/header'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import {Pdf} from './pdf_generator'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'


Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += Number(this[i][prop])
    }
    return total
}
class ExpensesView extends React.Component{
              constructor(props){
                    super(props)
                    this.state={row:2,error:false,name:'',department:'',startDate:new Date(),endDate:new Date(),total:0,expensePeriod:null,
                                columnDefs: [
                                  {headerName: "#", field:"row"},
                                  {headerName: "Date", field: "date",editable: true},
                                  {headerName: "Description", field: "description",editable: true},
                                  {headerName: "Category", field: "category",editable: true},
                                  {headerName: "Amount", field:"amount",editable:true,cellRenderer: 'numberFormatter'}
                              ],
                              rowData: [
                                  {row:'1',date:'',description:'',category:'',amount:0.00},
                              ],
                              frameworkComponents: {'numberFormatter': NumberFormatter},preview:false
                            }
                    this.submit=this.submit.bind(this)
                    this.addNewLine=this.addNewLine.bind(this)
                    this.addTotal=this.addTotal.bind(this)
                    this.setName=this.setName.bind(this)
                    this.setDepartment=this.setDepartment.bind(this)
                    this.start=this.start.bind(this)
                    this.end=this.end.bind(this)
                    this.saveData=this.saveData.bind(this)
              }
              saveData(){
                    this.props.addData({type:'SAVE_DATA_GRID',payload:{rowData:this.state.rowData}})
              }
              componentDidMount(){
                    if(this.props.rowData.length>0){
                         this.setState({rowData:this.props.rowData})
                    }
              }
              start(date){
                    this.setState({startDate:date})
              }
              end(date){
                    this.setState({endDate:date})
              }
              setName(e){
                    this.setState({name:e.target.value})
              }
              setDepartment(e){
                    this.setState({department:e.target.value})
              }
              submit(e){
                    e.preventDefault()
              }
              addNewLine(){
                    this.setState({row:this.state.row+1})
                    const line={row:this.state.row,date:'',description:'',category:'',amount:0}
                    const oldData=this.state.rowData
                    if(oldData.length<=9){
                      const newData=[...oldData,line]
                      this.setState({rowData:newData})
                    }
                    else{
                      this.setState({error:true})
                    }
              }
              addTotal(){
                    const total=this.state.rowData.sum('amount')
                    this.setState({total})
              }
              render(){
                if(!this.state.preview){
                 return(
                   <div className='JSX-container'>
                   <Header/>
                   <div className='page'>
                   <Navigation/>
                   <div className='page-content'>
                   <div className='page-header-group'>
                   <div className='page-header'>
                   <h3>Expenses</h3>
                   </div>
                   <div className='total-details'>
                   <h2>Amount</h2>
                   <h1>RM{this.state.total}</h1>
                   </div>
                   <form className='forms'>
                   <div className='form-input-containers'>
                   <label className='input-labels'>
                   Name
                   </label>
                   <input type='text' className='expenses-form-input' onChange={this.setName}/>
                   </div>
                   <div className='form-input-containers'>
                   <label className='input-labels'>
                   Expenses Period
                   </label>
                   <DayPickerInput
          onDayChange={this.start}
        /> <DayPickerInput
          onDayChange={this.end}
        />
                   </div>
                   <div className='form-input-containers'>
                   <label className='input-labels'>
                   Department
                   </label>
                   <input type='text' className='expenses-form-input' onChange={this.setDepartment}/>
                   </div>
                   </form>
                   </div>
                   <div className='expenses-list-container'>
                   <div
                className="ag-theme-balham"
                style={{ height: '200px', width: '600px' }}
            >
                <div className='ag-grid-container'>
                <AgGridReact
                    pagination={false}
                    columnDefs={this.state.columnDefs}
                    enableColResize={true}
                    rowData={this.state.rowData} enableSorting={true}
                    frameworkComponents={this.state.frameworkComponents}
                    >
                </AgGridReact>
                </div>
               </div>
               <div class='ag-button'>
                    {!this.state.error?
                    <input type='button' class='form-controls sheet-buttons' onClick={this.addNewLine} value='Add Line'/>
                    :
                    <input type='button' class='form-controls sheet-buttons' value='Max limit'/>
                    }
                    <input type='button' class='form-controls sheet-buttons' onClick={()=>this.setState({rowData:[],row:1})} value='Reset'/>
                    <input type='button' class='form-controls sheet-buttons' onClick={this.saveData} value='Save'/>
                    <input type='button' class='form-controls sheet-buttons' onClick={this.addTotal} value='Sum'/>
                    <input type='button' class='form-controls sheet-buttons' onClick={()=>this.setState({preview:true})} value='Preview'/>
               </div>
               </div>
               </div>
               </div>
               </div>
             )}
             else{
                 return <Pdf total={this.state.total} name={this.state.name} department={this.state.department} columnDefs={this.state.columnDefs} rowData={this.state.rowData} startDate={this.state.startDate} endDate={this.state.endDate}/>
               }
              }
  }

  class NumberFormatter extends React.Component {
    render() {
        const value = Number(this.props.value);
        const text = 'RM'+value.toLocaleString(undefined, 'RM');

        return (
            <span>{text}</span>
        )
    }
}

  export {ExpensesView}
