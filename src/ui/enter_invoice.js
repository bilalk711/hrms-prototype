import React from 'react'



class EnterInvoice extends React.Component{
        constructor(props){
               super(props)
               this.state = { openInvoice:false }
        }
        componentDidMount(){
             this.setState({openInvoice:this.props.invoice})
        }
        render(){
        return(
        <div>
        {this.state.openInvoice?
          <div className='form-backdrop'>
          <div className='form-container prompt-box' ref='prompt'>
          <div className='form-header'>
           <div className='cross' ref='cross'>✖</div>
          </div>
          <div className='prompt-message'>
          <h3> Enter Invoice </h3>
          <form onSubmit={this.props.enterInvoice}>
          <input className="form-controls" type="text" placeholder='Invoice' ref='invoice'/>
          <input type='submit' className='form-submit' value='Submit'/>
          </form>
          </div>
          </div>
          </div>
          :
          <li onClick={ this.props.openInvoice}>
              Enter Invoice
          </li>
        }
        </div>
        )
      }
  }

export { EnterInvoice }
