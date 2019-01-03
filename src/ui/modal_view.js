import React from 'react'



class ModalView extends React.Component{
    constructor(props){
           super(props)
           this.listenKeyboard = this.listenKeyboard.bind(this)
           this.onOverlayClick = this.onOverlayClick.bind(this)
           this.onDialogClick = this.onDialogClick.bind(this)
    }
    listenKeyboard(event) {
      if (event.key === 'Escape' || event.keyCode === 27) {
        this.props.onClose()
      }
    }
    componentDidMount() {
      if (this.props.onClose) {
        window.addEventListener('keydown', listenKeyboard, true)
      }
    }

    componentWillUnmount() {
      if (this.props.onClose) {
        window.removeEventListener('keydown', listenKeyboard, true)
      }
    }
    onOverlayClick() {
      this.props.onClose()
    }
    onDialogClick(event) {
      event.stopPropagation()
    }
    render(){
        return (
          <div>
            <div className='form-backdrop' onClick={this.onOverlayClick}>
            <div className='form-container' onClick={this.onDialogClick}>
                {this.props.children}
            </div>
          </div>
        )
}
}
