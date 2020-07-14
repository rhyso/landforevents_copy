import React, { Fragment } from 'react';
import '../App.css';
import { Nav } from '../components/nav'
import AllFields from '../components/fields/container'


const SearchResults = ({history, props}) =>{

    const search_value = history.location.searchValue
    return (
    <div>
        <div className="content">
            <Nav/>
            <div className="all-fields">
                 <div className="content">
                    <div className="barns--header">
                        <div className="barns">
                            <h1>Search</h1>
                            <div class="intro-text">
                                <h3>Search Results... {search_value}</h3>
                                <hr/>
                            </div>
                            <AllFields />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
    

export default SearchResults




