import React from 'react'

export default function SearchSubtitle({resultsCount, searchTerm, isSubmit}) {
    let searchTermString = null
    
    if(searchTerm && isSubmit){
        searchTermString = <>
            <span>{` for`}</span> <span style={{fontWeight:"bold"}}> {` "${searchTerm}"`}</span> 
    </>
    } 
    

    return (
        <>
          <p style={{textAlign: "left"}}>{`Showing ${resultsCount} results`} {searchTermString}</p>
         
</>
    )
}
