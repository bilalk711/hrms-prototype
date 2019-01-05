import React from 'react'
import { PDFExport } from '@progress/kendo-react-pdf'
import dreamteam from './dreamteam-logo.png'
import './pdfStyles.css'

class Pdf extends React.Component{
                constructor(props){
                          super(props)
                          this.exportPDF=this.exportPDF.bind(this)
                          this.state={row:0,preview:false}
                          this.preview=this.preview.bind(this)
                          this.closePreview=this.closePreview.bind(this)
                }
                exportPDF(){
                                  this.resume.save();
                              }
                preview(){
                                  this.setState({preview:true},
                                    document.addEventListener('click',this.closePreview))
                          }
                closePreview(e){
                            const {cross} = this.refs
                            if(cross.contains(e.target)){
                                  this.setState({preview:false},
                                    document.removeEventListener('click',this.closePreview)
                                  )
                            }
                          }
                render(){
                const {rowData,start,end,name,department,total,startDate,endDate}=this.props
                return(
                <div>
                <input type='button' class='form-controls sheet-buttons' onClick={this.preview} value='Preview'/>
                {this.state.preview&&
                <div className='form-backdrop'>
                <div className='wrapper-pdf form-container'>
                <button onClick={this.exportPDF}>Download</button>
                <PDFExport paperSize='A4'
                            fileName="expenses.pdf"
                            title=""
                            subject=""
                            keywords=""
                            ref={(r) => this.resume = r}>
                <div className='main-header'>
                     <img src={dreamteam} className='logo-dreamteam'/>
                     <div className='page-info'>
                     <h2> EXPENSES CLAIM </h2>
                     </div>
                     <div className='cross' ref='cross'>✖</div>
                </div>
                <div className='expenses-info'>
                     <div>
                     <h3>Name</h3>
                     <h3 className='inputs-info'>{name}</h3>
                     <h3>Department</h3>
                     <h3 className='inputs-info'>{department}</h3>
                     </div>
                     <div className='expenses-period'>
                     <h3>Expenses Period</h3>
                     <div class='date-box'><h3>From </h3><h3 class='dates'>{startDate.toDateString()}</h3></div>
                     <div class='date-box'><h3>To </h3><h3 class='dates'>{endDate.toDateString()}</h3></div>
                     </div>
                </div>
                <div className='lists-container'>
                <ul className='list-headings'>
                <li>Description</li>
                <li>Date</li>
                <li>Category</li>
                <li>Amount</li>
                </ul>
                {rowData.map(i=>{
                return(
                <ul>
                <li>{i.row}) {i.description}</li>
                <li>{i.date}</li>
                <li>{i.category}</li>
                <li>{i.amount}</li>
                </ul>
              )

              }
              )}
                <div class='reciepts-container'>

                <div class='reciepts-notice'>
                   Please attach reciepts here
                </div>
                </div>
                <div class='total-myr'>
                  TOTALMYR        RM{total}
                </div>
                </div>
                <div class='signatures-container'>
                <div class='signatures'>
                     EMPLOYEEE SIGNATURE
                </div>
                <div class='signatures'>
                     APPROVAL SIGNATURE
                </div>
                </div>
                </PDFExport>
                </div>
                </div>
              }
                </div>
              )
              }
}

export {Pdf}
