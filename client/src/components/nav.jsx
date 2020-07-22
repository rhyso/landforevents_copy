import React, { Fragment } from 'react';
import { Link, NavLink } from "react-router-dom";
  
export const Nav = () => {

    return(
    <Fragment>
        <div className="topmenu" >
            <h1 className={'header-title'}>Fields and Barns</h1>

            <div id="topmenuinner" >
                <ul id="uhs-cat">
                    <li id="home">
                        <NavLink exact activeClassName='is-active'  to="/"><b>HOME</b></NavLink>
                    </li>
                    <li id="unique-fields">
                        <NavLink exact activeClassName='is-active'  to="/fields"><b>FIELDS</b></NavLink>
                    </li>
                    <li id="unique-barns">
                        <NavLink exact activeClassName='is-active'  to="/barns"><b>BARNS</b></NavLink>
                    </li>                    
                    <li id="unique-weddings-and-events">
                        <NavLink exact activeClassName='is-active'  to="/weddings-and-events"><b>WEDDINGS & EVENTS</b></NavLink>
                    </li>
                    <li id="unique-camping">
                        <NavLink exact activeClassName='is-active'  to="/camping"><b>CAMPING</b></NavLink>
                    </li>
                    <li id="unique-owners">
                        <NavLink exact activeClassName='is-active'  to="/owners"><b>OWNERS</b></NavLink>
                    </li>
                    {/* <li id="unique-booking">
                        <NavLink exact activeClassName='is-active'  to="/my-booking"><b>MY BOOKING</b></NavLink>
                    </li> */}
                    <li id="unique-faq">
                        <NavLink exact activeClassName='is-active'  to="/faq"><b>FAQ</b></NavLink>
                    </li>
                    <li id="unique-login">
                        <NavLink exact activeClassName='is-active'  to="/login"><b>LOGIN</b></NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </Fragment>
    )
}
