import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AdminMenu from "./menu";
import { useForm } from "react-hook-form";
import AdminHeader from './layout/admin-header'
import { BarLoader } from "react-css-loaders";
import { Table, Tr } from 'styled-table-component';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import { Link } from 'react-router-dom'

import requestListedFields from "../../api/listedLand"
import { useSelector } from 'react-redux'
import removeLand from "../../api/removeListedLand"

//https://react-hook-form.com/

const ListedLand = ()  => {
    const { handleSubmit, register, errors } = useForm();
    const [deleted, isDeleting ] = useState(false);
    const [loaded, setLoaded ] = useState(false);
    const [listedLand, setListedLand] = useState(null)
    const uid = useSelector( state => state.login.user.uid) 

    const asyncFetchProfile = () => {
        setLoaded(false)
        return requestListedFields(uid)
        .then(res => {
          console.log(res)
          setListedLand(res)
        })
        .catch(error => console.log(error))
      }
  
      useEffect(() => {
  
        asyncFetchProfile().then(setLoaded(true))
      
      }, [loaded]);

      const deleteField = (id) => {
       
       alert(id)
       return removeLand(uid, id)
        .then(res => {
          console.log(res)
        })
        .catch(error => console.log(error))
      }


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
                        <th scope="col">Location</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Add Image</th>
                        <th scope="col">Delete?</th>
                    </tr>
                    </thead>
                    <tbody>
                    { listedLand && listedLand.map((field) =>
                        (
                            <Tr active>
                            
                                <>
                                    <td>{field.fieldName}</td>
                                    <td>{field.location}</td>
                                    <td><EditIcon/></td>
                                    <td>
                                    <Link to={{
                                        pathname: `/admin/land/${uid}/${field._id}/images/add`,

                                        }}><ImageIcon/></Link>

                                    </td>

                                    <td><DeleteIcon onClick={()=>{ deleteField(field._id)}}/></td>
                                </>
                            </Tr>
                    ))}

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

