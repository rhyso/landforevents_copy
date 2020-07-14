import React, { Fragment } from 'react';

export const Intro = () => {

    return(
        <Fragment>
            <div className={'intro'}>
                <div id="homepageintro"><h1>Welcome to Fields and Barns</h1>
                    
                    <p>
                    More than just a collection of fields and barns for hire, 
                    we’re sharing and showcasing the best of the British landscape. 
                    From coast to country, we’re working with farmers and landowners alike to 
                    share with you those special, one of a kind spaces and places.
                    </p>

                    <div id="startsearchhere">
                        <h2>Start your search here</h2>
                        <a className="nbutton" href="/fields/">Fields</a>
                        <a className="nbutton" href="/barns/">Barns</a>                    
                    </div>
                    </div>
            </div>

        </Fragment>
    )
}
