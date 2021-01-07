import { FETCH_HOUSES, CREATE_HOUSES } from '../actions/houseAction';
const initialState = {
  houses: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_HOUSES:
      return {
        ...state,
        houses: action.payload
      }
  }
  return state;
}