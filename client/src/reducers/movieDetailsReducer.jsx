// const initialState = {
// title: "",
// TMDBId: null,
// likes: 0,
// data: {},
// }

export default function movieDetailsReducer(state, action) {
    switch (action.type) {
        case 'MOVIE_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'MOVIE_FETCH_SUCCESS':
           
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: {...state.data, ...action.payload},
            }
        case 'MOVIE_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
            case 'INCREMENT_LIKES':
                    if(!window.localStorage.getItem(state.data.id)){
                        state.data.likes += 1 
                        state.data.isLiked = true
                        window.localStorage.setItem(state.data.id, 'liked')
                    }
                    console.log("the state" + JSON.stringify(state))
                    return {
                        ...state,
                    }
            case 'DECREMENT_LIKES':
                    if(window.localStorage.getItem(state.data.id)){
                        state.data.likes -= 1 
                        state.data.isLiked = false
                        window.localStorage.setItem(state.data.id, '')
                    }
                    console.log("the state" + JSON.stringify(state))
                    return {
                        ...state,
                    }
            
        // case 'REMOVE_MOVIE':
        //     return {
        //         ...state,
        //         data: state.data.filter(
        //             story => action.payload.objectID !== story.objectID
        //         ),
        //     }
        default:
            throw new Error();
    }
}