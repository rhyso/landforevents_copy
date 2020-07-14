import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom';

export class Search extends Component {

    performSearch = (e) => {
        const search_value = document.getElementById("search-value").value;
        e.preventDefault()
        const { history } = this.props;

        history.push({
            pathname: '/search-results',
            searchValue: search_value,
          });

        //this gets a search result from an api. use this when peforming proper search 
        // this.props.performSearch(search_value)
    }


    renderResults  = () => {
        //seems to need to wait for a full page load before working
        const { result } = this.props.search
        return result && (
            Object.keys(result).map((item, i) => (
                <li className="item" key={i}>
                    <span className="input-label">{ result[item].title }</span>
                </li>
            ))
        )
        
    }

    render(){
        const { result, fetched } = this.props.search
        console.log(fetched)

        return (
            <div className="search-container">
                <fieldset class="field-container">
                    {/* <input type="text" placeholder="Barnstaple" class="field" onChange= {(event) => setSearchValue(event.target.value)}/> */}
                    <input id="search-value" type="text" placeholder="Barnstaple" class="field" />
                    <a class="example_c" href="add-website-here" target="_blank" onClick={ (event) => this.performSearch(event)} rel="nofollow noopener">Search</a>                    
                </fieldset>

                {
                    result && this.renderResults()
                }
                </div>

        )
    }
}


export default withRouter(Search);
