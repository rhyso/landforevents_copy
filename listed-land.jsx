import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AdminMenu from "./menu";
import { useForm } from "react-hook-form";
import AdminHeader from './layout/admin-header'
import { BarLoader } from "react-css-loaders";
import { Table, Tr } from 'styled-table-component';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//https://react-hook-form.com/

const ListedLand = ()  => {
    const { handleSubmit, register, errors } = useForm();
    const [loaded, setLoaded ] = useState(false);
    const [istedLand, getListedLand] = useState(null)


    const asyncFetchProfile = () => {
      setLoaded(false)
      return requestLandListed()
      .then(res => {
        setProfile(res.result)
        setLoaded(true)
      })
      .catch(error => console.log(error))
    }

    useEffect(() => {

      asyncFetchProfile().then(setLoaded(true))
    
    }, [loaded]);


    return (
        <Fragment>
        <AdminHeader/>
            <div className={'admin-wrapper'}>
                <AdminMenu />
                <div className={'admin-content-area'}>
                        <h1>Your Listed Land</h1>
                <div className={"listed-land-table-header"}>

                <Table responsiveMd>
                    <thead>
                    <tr>
                        <th scope="col">Field Name</th>
                        <th scope="col">Live?</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete?</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Tr active><td>Active</td><td>Content</td><td><EditIcon/></td><td><DeleteIcon/></td></Tr>
                        <Tr primary><td>Primary</td><td>Content</td></Tr>
                        <Tr secondary><td>Secondary</td><td>Content</td></Tr>
                        <Tr success><td>Success</td><td>Content</td></Tr>
                        <Tr danger><td>Danger</td><td>Content</td></Tr>
                        <Tr warning><td>Warning</td><td>Content</td></Tr>
                        <Tr info><td>Info</td><td>Content</td></Tr>
                        <Tr light><td>Light</td><td>Content</td></Tr>
                        <Tr dark><td>Dark</td><td>Content</td></Tr>
                    </tbody>
                </Table>
                 </div>
                 </div>
                 </div>
        </Fragment>
    )
}
export default withRouter(ListedLand);

