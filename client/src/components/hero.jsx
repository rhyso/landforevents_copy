import React, { Fragment } from 'react';
import Search from  './search-container'

const Hero = () => {

    return(
        <Fragment>
            <div className={'full-width-image-homepage-holder-hero'}>
                <div className="homepagelargephotoinner">
                    <div className="hero-search-padding">

                        <Search />
                        <p>If you want to host your wedding or event in some of the best rural views the United Kingdom
                        has to offer, then Fields and Barns is the place to help you.</p>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Hero
