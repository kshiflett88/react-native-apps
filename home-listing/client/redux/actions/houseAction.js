export const FETCH_HOUSES = 'FETCH_HOUSES';
export const CREATE_HOUSES = 'CREATE_HOUSES';
export const REMOVE_HOUSES = 'REMOVE_HOUSES';

export const fetchHouses = () => {
  return async dispatch => {

    //logic to fetch houses from API
    const result = await fetch('http://localhost:3000/api/houses');

    const resultData = await result.json();

    dispatch({
      type: FETCH_HOUSES,
      payload: resultData
    })
  }
}

export const createHome = ({title, image, homeType, price, yearBuilt, address, description}) => {

  return async dispatch => {
    const response = await fetch('http://localhost:3000/api/houses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        image,
        homeType,
        price,
        yearBuilt,
        address,
        description
      })
    })

    const responseData = await response.json()
    console.log(responseData)

    dispatch({
      type: CREATE_HOUSES,
      payload: responseData
    })
  }
}

export const removeHome = (id) => {
  return async dispatch => {
    const response = await fetch(`http://localhost:3000/api/houses/${id}`, {
      method: 'DELETE'
    })

    const responseData = await response.json();


    dispatch({
      type: REMOVE_HOUSES,
      payload: responseData
    })
  }
}