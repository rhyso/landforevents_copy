import React, { Fragment } from 'react';

const OwnerGridItem = ({owner, id, changeHighlight}) => {

    const { firstName, lastName } = owner

    let words = ['person', 'face', 'mugshot', 'character', 'smile']
    let photoName = words[Math.floor(Math.random() * words.length)];
    let img = `https://source.unsplash.com/1600x900/?${photoName}`

    return(
        <Fragment>
          
          <div className="post" onClick={() => changeHighlight()} key={id}>
                <div className="media post-media">
                       <span> <img src={img} alt="" height="225" /> </span>
                </div>
                    <h3 className="title post-title">{firstName} {lastName}</h3>
                <div className="content post-content">Michael Oliver Love’s images provide an outburst of colour, texture and energy, complementing and enhancing one another as a celebration of movement.</div>
           </div>

        </Fragment>
    )
}

export default OwnerGridItem
