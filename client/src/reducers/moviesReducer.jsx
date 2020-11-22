export default function moviesReducer(state, action) {
    switch (action.type) {
        case 'MOVIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'MOVIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'MOVIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
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
