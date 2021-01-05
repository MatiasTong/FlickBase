export default function moviesReducer(state, action) {
    switch (action.type) {
        case 'MOVIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'MOVIES_FETCH_SUCCESS':
            console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                isError: false,
                page:1,
                resultsCount: action.payload.data.total_results,
                data: action.payload.data.results,
                queryType: action.payload.queryType,
                searchTerm: action.payload.searchTerm
        
            }

        case 'MOVIES_FETCH_SCROLL_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                page: state.page+1,
                resultsCount: action.payload.data.total_results,
                data: state.data.concat(action.payload.data.results),
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
