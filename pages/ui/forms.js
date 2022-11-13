import React, { useState, useRef } from 'react';
// import getScores from '../ui/utils';
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase/config";
import AlgoTables from '../../src/components/dashboard/AlgoTable';
import emailjs from '@emailjs/browser';


import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
var carScores = [];



const Forms = () => {
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [showTable, setShowTable] = useState(false);
  // const getScores(inputArray);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('default_service', 'template_9u1c8xp', form.current, 'jjnfbJCzvk3o7ev0W')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const [inputArray, setInputArray] = useState({
    MakeWeight : 3,
    MakeText : "",
    ModelWeight : 3,
    ModelText : "",
    YearWeight : 3,
    YearText : 1,
    PriceWeight : 3,
    PriceText : 1,
    MileageWeight : 3,
    MileageText : 1,
    ColorWeight : 3,
    ColorText : "",
  });
  


  async function getScores() {
    setShowTable(false);

    const carsCollection = collection(db, "cars");
    const carsSnapshot = await getDocs(carsCollection);
  
    var carsList = carsSnapshot.docs.map((doc) => doc.data());
  
// carScores.length = 0;

carScores = [];
    carsList.forEach((item) => {
      const scores = {
        MakeScore : 0,
        ModelScore : 0,
        YearScore : 0,
        PriceScore : 0,
        MileageScore : 0,
        ColorScore : 0,
      };

      // console.log(inputArray)
      
      {item.make && item.make.toLowerCase() === inputArray.MakeText.toLowerCase() 
        ? scores.MakeScore = (0 * inputArray.MakeWeight) : scores.MakeScore = (3 * inputArray.MakeWeight)}
      {item.model && item.model.toLowerCase() === inputArray.ModelText.toLowerCase() 
        ? scores.ModelScore = (0 * inputArray.ModelWeight) : scores.ModelScore = (5 * inputArray.ModelWeight)}
      {item.paint && item.paint[0].toLowerCase() === inputArray.ColorText.toLowerCase() 
        ? scores.ColorScore = (0 * inputArray.ColorWeight) : scores.ColorScore = (1 * inputArray.ColorWeight)}
      item.MakeScore = scores.MakeScore;
      item.ModelScore = scores.ModelScore;
      item.YearScore = scores.YearScore;
  
        
        const yearDiff = (inputArray.YearText - item.makeYear);
        scores.YearScore = yearDiff * inputArray.YearWeight * 2;
        item.YearScore = scores.YearScore;
  
        const priceDiff = (inputArray.PriceText - item.price);
        scores.PriceScore = priceDiff/inputArray.PriceText * inputArray.PriceWeight * 5;
        item.PriceScore = scores.PriceScore;
  
        const mileageDiff = (inputArray.MileageText - item.mileage);
        scores.MileageScore = mileageDiff/inputArray.MileageText * inputArray.MileageWeight * 2.5;
        item.MileageScore = scores.MileageScore;
  
        var totalScore = scores.MakeScore + scores.ModelScore + scores.YearScore + scores.PriceScore + scores.MileageScore + scores.ColorScore;
        totalScore = totalScore.toFixed(2);
  
        // const itemScore = scores.MakeScore + scores.ModelScore + scores.YearScore + scores.PriceScore + scores.MileageScore + scores.ColorScore;
        var itemScore = 100 - totalScore;
        itemScore = itemScore.toFixed(2);

        console.log(scores);
        // console.log("Make:[" + item.make + "] Model:[" + item.model + "] Year:[" + item.makeYear + "] $" + item.price + " Miles:[" + item.mileage + "]")
        // console.log("Score:" + itemScore);
        
        item.score = itemScore;      
        carScores.push(item);
        console.log(item.score);
    });
    carScores.sort((a,b) => b.score - a.score)
    console.log(carScores);
    setShowTable(true);
    carsList  = [];
    // return carScores;
    };




  return (
    <>
    <Row>
      <Card style={{padding: 10}}>
        <h5>Enter Profile Information</h5>
        <form ref={form} onSubmit={sendEmail}>
        <FormGroup>
          <Label for="user_name">Name</Label>
          <Input id="user_name" name="user_name" type="text"/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" name="user_email" type="text"/>
        </FormGroup>
        <textarea name="message" hidden value="Here are your top cars for the week"/>
        <input type="submit" value="Confirm" className='btn btn-secondary' />
        </form>
      </Card>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Form Example
          </CardTitle>
          <CardBody>
            <Form>
            <FormGroup>
                <Label for="MakeWeight">Make Importance</Label>
                <Input id="MakeWeight" name="MakeWeight" type="select" onChange={e => inputArray.MakeWeight = (e.target.value)}>
                  <option value='1'>Not Important</option>
                  <option value='2'>Somewhat Important</option>
                  <option value='3'>Decently Important</option>
                  <option value='4'>Very Important</option>
                  <option value='5'>Most Important</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="MakeText">Make</Label>
                <Input id="MakeText" name="MakeText" type="text" onChange={(e) => {setInputArray(inputArray => ({...inputArray, ...{"MakeText": e.target.value}}))}}/>
              </FormGroup>
              <FormGroup>
                <Label for="ModelWeight">Model Importance</Label>
                <Input id="ModelWeight" name="ModelWeight" type="select" onChange={e => inputArray.ModelWeight = (e.target.value)}>
                <option value='1'>Not Important</option>
                  <option value='2'>Somewhat Important</option>
                  <option value='3'>Decently Important</option>
                  <option value='4'>Very Important</option>
                  <option value='5'>Most Important</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ModelText">Model</Label>
                <Input id="ModelText" name="ModelText" type="text"  onChange={e => inputArray.ModelText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="MileageWeight">Mileage Importance</Label>
                <Input id="MileageWeight" name="MileageWeight" type="select" onChange={e => inputArray.MileageWeight = (e.target.value)}>
                <option value='1'>Not Important</option>
                  <option value='2'>Somewhat Important</option>
                  <option value='3'>Decently Important</option>
                  <option value='4'>Very Important</option>
                  <option value='5'>Most Important</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="MileageText">Mileage</Label>
                <Input id="MileageText" name="MileageText" type="number"  onChange={e => inputArray.MileageText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="YearWeight">Year Importance</Label>
                <Input id="YearWeight" name="YearWeight" type="select" onChange={e => inputArray.YearWeight = (e.target.value)}>
                <option value='1'>Not Important</option>
                  <option value='2'>Somewhat Important</option>
                  <option value='3'>Decently Important</option>
                  <option value='4'>Very Important</option>
                  <option value='5'>Most Important</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="YearText">Year</Label>
                <Input id="YearText" name="YearText" type="number"  onChange={e => inputArray.YearText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="PriceWeight">Price Importance</Label>
                <Input id="PriceWeight" name="PriceWeight" type="select" onChange={e => inputArray.PriceWeight = (e.target.value)}>
                <option value='1'>Not Important</option>
                  <option value='2'>Somewhat Important</option>
                  <option value='3'>Decently Important</option>
                  <option value='4'>Very Important</option>
                  <option value='5'>Most Important</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="PriceText">Price</Label>
                <Input id="PriceText" name="PriceText" type="number"  onChange={e => inputArray.PriceText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="ColorWeight">Color Importance</Label>
                <Input id="ColorWeight" name="ColorWeight" type="select" onChange={e => inputArray.ColorWeight = (e.target.value)}>
                <option value='1'>Not Important</option>
                  <option value='2'>Somewhat Important</option>
                  <option value='3'>Decently Important</option>
                  <option value='4'>Very Important</option>
                  <option value='5'>Most Important</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ColorText">Color</Label>
                <Input id="ColorText" name="ColorText" type="text"  onChange={e => inputArray.ColorText = (e.target.value)}/>
              </FormGroup>
              <Button 
                onClick={getScores}
              >Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    {showTable && <AlgoTables carData = {carScores}/>}

    </>
  );
};



export default Forms;
