import { OPEN_MODAL, CLOSE_MODAL } from '../action-types';

const InitialModalState = {
  open: false,
  size: 'mini',
  dimmer: 'blurring'
}

const modalReducer = (state = InitialModalState, action) => {
  switch(action.type) {

    case OPEN_MODAL:
      return {
        open: true,
        size: action.size,
        dimmer: action.dimmer
      }
    
    case CLOSE_MODAL:
      return {
        open: false
      }
    
    default:
      return state;
  }
}

export default modalReducer;