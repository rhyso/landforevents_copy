import React, { Fragment, useEffect, useState } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';
import { withRouter } from 'react-router-dom';
import UploadImage from './forms/form-components/upload-image'
import AdminMenu from "./menu";
import {Typography} from "antd";
import { BarLoader } from "react-css-loaders";
import { useSelector } from 'react-redux'

import AdminHeader from './layout/admin-header'
import getDbUID from "../../api/getDbUID"

const { Title, Text } = Typography;


const AddImagery = ({history, match, location})  => {

    const [loaded, setLoaded ] = useState(false);
    const [user, setUser] = useState(null)
    const uid = useSelector( state => state.login.user.uid) 
    console.log(uid)
    const { fieldId } = match.params
    const { owner } = match.params


    const asyncFetchDbUID = () => {
        setLoaded(false)
        return getDbUID(uid)
        .then(response => {
          console.log(response)
          setUser(response)
          setLoaded(true)
        })
        .catch(error => console.log(error))
      }

      useEffect(() => {
        asyncFetchDbUID().then(setLoaded(true))
      }, [loaded]);

    return(
        <Fragment>
        <AdminHeader/>
            <div className={'admin-wrapper'}>
                <AdminMenu />
                    <div className={'admin-content-area'}>
                        <h1>Your profile</h1>
                {/*https://ant.design/components/form/*/}
                    <Title level={3}>Add Imagery for your land</Title>
                    <span onClick ={ ()=> history.push('/admin/home')}> Test</span>
   

                {   !loaded && !user ? <BarLoader /> :
                    ( <UploadImage user={owner} fieldId={fieldId} loaded={loaded} /> )
                }

                </div>

            </div>
        </Fragment>
    )
}
export default withRouter(AddImagery);

