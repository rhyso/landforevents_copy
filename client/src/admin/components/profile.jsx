import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AdminMenu from "./menu";
import { useForm } from "react-hook-form";
import AdminHeader from './layout/admin-header'
import { BarLoader } from "react-css-loaders";
import requestInitialProfile from "../../api/profile"
//https://react-hook-form.com/

const Profile = ()  => {
    const { handleSubmit, register, errors } = useForm();
    const [loaded, setLoaded ] = useState(false);
    const [profile, setProfile] = useState(null)

    const onSubmit = values => {
      console.log(values);
    };

    const asyncFetchProfile = () => {
      setLoaded(false)
      return requestInitialProfile()
      .then(res => {
        setProfile(res.result)
        setLoaded(true)
      })
      .catch(error => console.log(error))
    }

    useEffect(() => {

      asyncFetchProfile().then(setLoaded(true))
    
    }, [loaded]);


    return !loaded ? <BarLoader /> :
    (
        <Fragment>
        <AdminHeader/>
            <div className={'admin-wrapper'}>
                <AdminMenu />
                    <div className={'admin-content-area'}>
                        <h1>Your profile</h1>
                    <p>This is your profile page and your UID is </p>
                    { profile && profile.map((field) =>
                     (
                      <div>
                        {field.firstName}
                      </div>
                    ))}
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Email:</label>
                      <input
                        name="email"
                        key={'email'}
                        ref={register({
                          required: 'Required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address"
                          }
                        })}
                      />
                      {errors.email && errors.email.message}

                      <input
                        name="username"
                        key={'username'}
                        ref={register({
                          validate: value => value !== "admin" || "Nice try!",
                          message: 'no boddy'
                        })}
                      />
                      {errors.username && errors.username.message}

                      <button type="submit">Submit</button>
                    </form>

                </div>
            </div>
        </Fragment>
    )
}
export default withRouter(Profile);

