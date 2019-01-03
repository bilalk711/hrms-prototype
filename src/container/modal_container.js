import React from 'react'
import { connect } from 'react-redux'
import ModalView from '../ui/modal_view'

/** Modal Components */
import AddProjectModal from './LoginModal'

/** Modal Type Constants */
import { LOGIN_MODAL, SIGNUP_MODAL } from './modaltypes';

const MODAL_COMPONENTS = {
  LOGIN_MODAL: LoginModal,
  SIGNUP_MODAL: SignupModal
}

const ModalContainer = (props) => {
  if (!props.modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[props.modalType]

  return <SpecificModal />;
}

const mapStateToProps = state => {
  return {
    modalType: state.modal.modalType
  }
}

export Modal=connect(mapStateToProps)(ModalContainer)
