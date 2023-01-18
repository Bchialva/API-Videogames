const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail:[]

}

function rootReducer (state = initialState, action)  {
switch(action.type){
    case 'GET_VIDEOGAMES':
        return{
            ...state,
            videogames: action.payload,
            allVideogames: action.payload
        }
        case 'GET_VIDEOGAMES_BY_NAME': 
        return{
            ...state,
            videogames:action.payload
        }
        case 'GET_GENRES':
            return{
                     ...state,
                     genres: action.payload,
        }
        case 'FILTER_BY_GENRES':
            const allVideogames = state.allVideogames;
            const genreFilter  = action.payload === "All" ? allVideogames : allVideogames.filter(e => e.genres.includes(action.payload))
        return{
                ...state,
                videogames:genreFilter
            }
            case "POST_VIDEOGAME":
                return {
                    ...state,
            }
            case 'FILTER_CREATER':
                const filter= state.allVideogames
                let filtervideo=filter
                if(action.payload === 'createdInDb') 
                filtervideo= filter.filter(p => isNaN(p.id))
                if(action.payload === 'All') 
                filtervideo= filter
                if(action.payload === 'api') 
                filtervideo= filter.filter(p => typeof p.id === "number")
                return {
                    ...state,
                    videogames: filtervideo
                }
            case 'ORDER_BY_NAME' :
                let ordenName = action.payload === 'asc' ? state.videogames.sort(function (a, b) {
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return 1
                    }
                    if (b.name.toUpperCase() > a.name.toUpperCase()){
                        return -1
                    }
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if(a.name.toUpperCase() > b.name.toUpperCase()) {
                        return -1
                    }
                    if (b.name.toUpperCase() > a.name.toUpperCase()) {
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    videogames: ordenName
                }
                case 'ORDER_BY_RATING':
                    const ordenRating = action.payload === 'bajo'
                    ? state.videogames.sort((a,b) => {
                        return a.rating - b.rating
                    })
                    : state.videogames.sort((a,b) => {
                        return b.rating - a.rating
                    })
                    return {
                        ...state,
                        videogames: ordenRating
                    }
                    case 'VIDEOGAME_BY_ID' :
                        return {
                            ...state,
                            detail: action.payload
                    }
                    case 'CLEAN_DETAIL':
                            return{
                                ...state,
                                detail: []
                            }
            default:
            return{
                ...state  
            }
}
}

export default rootReducer;
