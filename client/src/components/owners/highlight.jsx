import React, { Fragment } from 'react';

const HighlightOwner = ({firstName='', lastName='', email=''}) => {

    return(
        <Fragment>

            <div className="highlight-owner">
                <div className="header">
                    <h1>{`${firstName} ${lastName}`}</h1>
                </div>
                <div className="highlight-image">
                    <img src="https://source.unsplash.com/1600x900/?person,headshot" alt="img-src-unspalsh" />                        
                </div>
            <div>
                <p><b>First Name</b> : {firstName}</p>
                { lastName && <p><b>last Name</b> : {lastName}</p> }
                <p><b>Email</b> : {email}</p>
            </div>



            </div>

        </Fragment>
    )
}

export default HighlightOwner
