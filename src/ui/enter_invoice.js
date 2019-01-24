import React from 'react'
import Popup from 'reactjs-popup'


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
        <Popup trigger={
          <li onClick={ this.props.openInvoice}>
              Enter Invoice
          </li>
        } modal closeOnDocumentClick
        overlayStyle={{position: "absolute",
                       top: "0px",
                       bottom: "0px",
                       left: "0px",
                       right: "0px",
                       background: "rgba(53, 52, 52, 0.66)",
                       display: "block",
                       width: "100%",
                       zIndex: "999",
                       overflow: "auto"
                     }}
         contentStyle={{
                       margin: "0px",
                       border: "none",
                       padding: "0px",
                       width: "100%",
                       background:"transparent"
                       }}
                       >
          {close => (
          <div className='form-container prompt-box' ref='prompt'>
          <div className='form-header'>
           <div className='cross' onClick={close}>✖</div>
          </div>
          <div className='prompt-message'>
          <h3> Enter Invoice </h3>
          <form onSubmit={this.props.enterInvoice}>
          <input className="form-controls" type="text" placeholder='Invoice' ref='invoice'/>
          <input type='submit' className='form-submit' value='Submit'/>
          </form>
          </div>
          </div>
        }
        </Popup>
         </div>
        )
        }
  }

export { EnterInvoice }
