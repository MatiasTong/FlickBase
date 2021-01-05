import React from 'react'

export default function ListHeader({type}) {    
        switch(type){
            case 'SEARCH_BY_TERM':
                return <h1>Results</h1>
            case 'POPULAR':
                return  <h1>Trending Now 🔥</h1>
            default:
                return null
        }
}
