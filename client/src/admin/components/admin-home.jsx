import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import AdminMenu from "./menu";
import {Typography} from "antd";
const { Title } = Typography;

const AdminHome = () => {

    return(
        <Fragment>
            <div className={'admin-wrapper'}>
                <div className={'admin-content-area'}>
                    <Title level={3}>Admin dssdds</Title>
                </div>
            </div>
        </Fragment>
    )
}
export default withRouter(AdminHome);
