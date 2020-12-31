export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';

export const fetchArticles = () => {
  return async dispatch => {

    //logic to fetch data
    const result = await fetch('http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=5db763bf0ab444c0bc663b4b90f6ca18');
   
    const resultData = await result.json();
    

    dispatch({
      type: FETCH_ARTICLES,
      payload: resultData
    });
  }
}

export const toggleFavorites = url => {
    return {
      type: TOGGLE_FAVORITES,
      payload: url
    }
}
