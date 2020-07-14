import React, { Component, Suspense, Lazy } from 'react';
import '../App.css';
import { Nav } from '../components/nav'
import Footer from "../components/footer"
import { BarLoader } from "react-css-loaders";

import AllOwners from '../components/owners/all-owners'



export default class OwnersPage extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
        this.highlightOwner = this.highlightOwner.bind(this);

    }

    async componentDidMount() {
        const {fetchOwners} = this.props;
        await fetchOwners();
    }


    shouldComponentRender() {
        const {pending} = this.props;
        if(pending === true) return false;
        // more tests
        return true;
    }

    highlightOwner(){
        const { owners } = this.props
        const keys = Object.keys(owners);
        const randomIndex = keys[Math.floor(Math.random() * keys.length)];
        const item = owners[randomIndex];
        return item
    }

    
    renderDetail(){
        const {owners, error, pending} = this.props;

        if(!this.shouldComponentRender()) return <BarLoader />

        let pairedOwners = []

        owners.forEach((owner, index) => {
            if (index % 3) {
                pairedOwners.push([owners[index - 1], owners[index]]);
            }
        });

        //https://css-tricks.com/solve-rendering-puzzle-react/
        return (
            <div className='owners-list-wrapper'>
                {error && <span className='owners-list-error'>{error}</span>}
                <AllOwners owners={pairedOwners} highlightOwner={this.highlightOwner()} />
            </div>
        )
        
    }


    render() {
        return (
        <div>
            <div className="content">
                <Nav/>
                <div className="owners-page">
                    <div className="content">
                        <div className="owners-header">
                            <div className="owners">
                                <h1>A Selection of some of our owners</h1>
                                <div className="intro-text">
                                    <p>From stylish homes by the sea in Cornwall to wilderness retreats in Scotland and solo adventures between rolling hills in Wales, a luxury cottage break with Unique Homestays is anything but ordinary.</p>
                                </div>
                                    { this.renderDetail() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        )    
    }
}
    
