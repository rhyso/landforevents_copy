import React, { Fragment } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';
import FieldLevelValidationForm  from './forms/field'
import axios from 'axios';
import { serverPath } from '../constants.js'
import { withRouter } from 'react-router-dom';
import AdminHeader from './layout/admin-header'
import AdminMenu from "./menu";
import { useSelector } from 'react-redux'
import {Typography} from "antd";
const { Title, Text } = Typography;


const AddLand = ({history})  => {
    const uid = useSelector( state => state.login.user.uid) 
    console.log(uid)
    console.log()
    const submitValues = values => {
        axios.post(`${serverPath}/api/owner/${uid}/addField`, values)
        .then(response => console.log(response))
        .catch((err) => console.log(err))
        .then(setTimeout(() =>
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        //push user back to list of users fields now
        , 700) )

    }
    
    return(
        <Fragment>
          <AdminHeader/>
          <div className={'admin-wrapper'}>
                <AdminMenu />
                {/*https://ant.design/components/form/*/}
                <div className={'admin-content-area'}>
                    <Title level={3}>Add land here</Title>
                    <span onClick ={ ()=>     history.push('/admin/home')}> Test</span>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec ac neque id nulla consectetur dapibus.
                    Sed placerat diam id nisl luctus, at efficitur turpis ullamcorper.
                    Fusce ac mauris aliquam, commodo risus ut,
                    In nec gravida ex. Vestibulum consequat aliquet felis, vel
                    tempor mi hendrerit sollicitudin.
                </Text>


                    <FieldLevelValidationForm onSubmit={values => submitValues(values)} />
                </div>
        </div>
        </Fragment>
    )
}
export default withRouter(AddLand);

