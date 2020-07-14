import React, { Component, useState } from 'react'
import HighlightOwner from './highlight'
import OwnerGridItem from './owner-grid-item'

const AllOwners = ({owners, highlightOwner}) => {


    const [highLightedItem, sethighLightedItem] = useState(highlightOwner)

    const firstName = highLightedItem && highLightedItem.firstName
    const email = highLightedItem && highLightedItem.email
    const lastName = highLightedItem && highLightedItem.lastName


    const updateHighlight = owner =>{
        console.log('clicked')
        sethighLightedItem(owner)
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
    }

    return (
        <div className="owners-container">
            <div className="hightlighted-owner">
                <HighlightOwner firstName={firstName} email={email} lastName={lastName} />
            </div>

            <h1>Rest of owners</h1>
        
            <div className="activity first-activity">
                <div>
                    <div className="posts thumbnail-thirds columns-3">
                
                        {owners.map((owner, id) => { 
                            return ( 
                                <div className="columns" key={id}>
                                
                                    <OwnerGridItem changeHighlight={()=> updateHighlight(owner[0])} id={id} owner={owner[0]} />
                                    <OwnerGridItem changeHighlight={()=> updateHighlight(owner[1])} id={id} owner={owner[1]} />

                                </div> 
                            ) 
                        })}

                    </div> 
                </div>
            </div>
        </div>


    )

}


export default AllOwners

