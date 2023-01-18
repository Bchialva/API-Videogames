import axios from 'axios';

export function getVideogames() {
    return async function (dispatch) {
      try {
        var json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
          type: "GET_VIDEOGAMES",
          payload: json.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getVideogameByName (name) {
    return async function (dispatch) {
        try{
        const json= await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch ({
            type:"GET_VIDEOGAMES_BY_NAME",
            payload:json.data
        })
    } catch (error) {
        console.log(error)
    }
}
}

export function getGenres () {
  return async function (dispatch) {
      try{
          const genres= await axios.get('http://localhost:3001/genres');
          return dispatch({
              type: "GET_GENRES",
              payload:genres.data
          })
      }  catch (error) {
          console.log(error)
      }
  }
}

export function postVideogame (payload) {
  return async function(dispatch) {
      try{
          const json= await axios.post('http://localhost:3001/videogames', payload);
          return json
      }catch (error) {
          console.log(error)
      }
  }
}

  export function filterByGenres(payload) {
    return {
        type:"FILTER_BY_GENRES",
        payload
    }
}

export function filterCreater (payload) {
  return {
      type: "FILTER_CREATER",
      payload
  }
}
export function orderByName (payload) {
  return {
    type: "ORDER_BY_NAME",
    payload
  }
}

export function orderByRating (payload) {
  return {
      type: "ORDER_BY_RATING",
      payload
  }
}

export function videogameById (id) {
  return async function(dispatch) {
      try{
          const json= await axios.get(`http://localhost:3001/videogame/${id}`);
          return dispatch({
              type:"VIDEOGAME_BY_ID",
              payload:json.data
          })
      }catch (error) {
          console.log(error)
      }
  }
}

export function cleanDetail () {
  return {
      type:'CLEAN_DETAIL'
  }
  }