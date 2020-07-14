import React, {Fragment} from "react";
import AdminMenu from './components/menu'
import { Typography } from 'antd';
import AdminHome from './components/admin-home'
import { withRouter } from 'react-router-dom';

const Admin = () => (
    <Fragment>
        <div className={'admin-wrapper'}>
            <div id="adminpageintro">
                <h1>Land for events <span><i>Admin</i></span></h1>
            </div>
            <AdminMenu />
            <AdminHome />
            <h1>test</h1>
        </div>
    </Fragment>
)

export default withRouter(Admin);
