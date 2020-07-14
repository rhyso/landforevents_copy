import React, { Fragment } from 'react';
import '../App.css';
import { Nav } from '../components/nav'
import Footer from "../components/footer"

import AllFields from '../components/fields/container'


const Fields = () =>(
    <div>
        <div className="content">
            <Nav/>
            <div className="all-fields">
                <div className="content">
                    <div className="all-fields-header">
                        <div className="all-fields">
                            <h1>Luxury collections to inspire</h1>
                            <div class="intro-text">
                                <p>From stylish homes by the sea in Cornwall to wilderness retreats in Scotland and solo adventures between rolling hills in Wales, a luxury cottage break with Unique Homestays is anything but ordinary.</p>
                            </div>
                            <AllFields />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
    

export default Fields




