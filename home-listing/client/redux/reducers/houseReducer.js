import { FETCH_HOUSES, CREATE_HOUSES, REMOVE_HOUSES } from '../actions/houseAction'


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
      case CREATE_HOUSES:
        return {
          ...state,
          houses: state.houses.concat(action.payload.data)
        }
      case REMOVE_HOUSES:
        // console.log(action.payload)
        return {
          ...state,
          houses: state.houses.filter(house => house._id !== action.payload._id)
        }
  }
  return state
}