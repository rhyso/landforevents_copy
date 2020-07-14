
import React, { useState, Fragment } from 'react';
import DatePicker from 'react-datepicker'
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { isEmpty } from 'ramda';
import { addDays, subDays } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

const DateDiv = styled.section`
  font-size: 12px!important;
  margin: 0 10px;
`;

const FlexContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h3`
  color:red;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px!important;
`;

const Desc = styled.h4`
  display:block;
  font-size:18px;
  max-width:400px;
  text-align:center;
  margin: 0 auto;
`;


const DatePickerField = ({ fieldName }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [email, setEmail] = useState('');

    console.log(email)

    const handleSubmit = (event) => {
      
  
      if(!isEmpty(email)){
      const startDateParsed = moment(startDate).format("dddd, MMMM Do YYYY")
      const endDateParsed = moment(endDate).format("dddd, MMMM Do YYYY")
            //axios.post to 'api/mailjet'
      axios.post(`http://localhost:3001/api/mailjet`, {
         startDate: startDateParsed, endDate: endDateParsed, fieldName: fieldName, email:email
      })
      .then(function (response) {
        console.log(response);
        alert('Email sent')
      })
      .catch(function (error) {
        console.log(error);
        alert('Error')
      });
      alert('Enquiry Sent')
    }
      else{
        alert("enter an email")
      }
    }
    
   
    return (
    <Fragment>
      
      <Desc>Please select the date range you would like to enquire about for this field hire and somebody will get in touch soon to discuss more details.</Desc>

      <FlexContainer>
        <DateDiv>
          <Header> Start Date</Header>
          <DatePicker 
            selected={startDate} 
            onChange={date => setStartDate(date)} 
            minDate={moment().toDate()}
            excludeDates={[new Date(), subDays(new Date(), 1)]}
            />
        </DateDiv>

        <DateDiv>
          <Header> End Date</Header>
          <DatePicker 
            selected={endDate} 
            onChange={date => setEndDate(date)} 
            minDate={moment().toDate()}
            excludeDates={[new Date(), subDays(new Date(), 1)]}
          />
        </DateDiv>

      </FlexContainer>

      <input className="enquire-input" type="text" placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
      
      <br/>

      <button onClick={() => handleSubmit()} class="nbutton">Enquire</button>

    </Fragment>
    );
  };

export default DatePickerField;
