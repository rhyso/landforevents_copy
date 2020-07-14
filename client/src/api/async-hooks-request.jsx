import React, { useState, useEffect, Fragment } from "react";
import { useAsync } from 'react-async-hook';

// https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g


const useAsyncHook = (URI, searchParam) => {
    const [result, setResult] = React.useState([]);
    const [loading, setLoading] = React.useState("false");
  
    useEffect(() => {
      async function fetchResults() {
        try {
          setLoading("true");
          const response = await fetch(URI);
  
          const json = await response.json();
          console.log(json);
          setResult(
            json.response.map(item => {
              console.log(item);
              return item;
            })
          );
        } catch (error) {
          setLoading("null");
        }
      }
  


    fetchResults();
        
    }, []);
  
    return [result, loading];
  }


export default useAsyncHook