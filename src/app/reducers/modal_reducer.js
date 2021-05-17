import { TOGGLE_MODAL, OPEN_MODAL, CLOSE_MODAL } from '../action-types';

const InitialModalState = {
  open: false,
  size: 'tiny',
  dimmer: 'inverted'
}

const modalReducer = (state = InitialModalState, action) => {
  switch(action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        open: !state.open
      }
    
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