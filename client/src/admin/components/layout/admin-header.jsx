import React, {Fragment} from 'react';
import { useSelector } from 'react-redux'

const AdminHeader = () => {
const email = useSelector( state => state.login.user.email) 

    return (
        <Fragment>
            <header className="admin-header">
                <div className="inner-container">
                    <h1>Land for Events</h1>

                    <div className="auth-events">
                        <h5 className="sign-out">Sign out</h5>
                    </div>
                </div>
            </header>

            <div className="admin-header-secondary">
                <h5>Welcome  {email}</h5>
            </div>
        </Fragment>
    )
}

export default AdminHeader