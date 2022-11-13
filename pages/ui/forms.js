import React, { useState } from 'react';
// import getScores from '../ui/utils';
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase/config";
import AlgoTables from '../../src/components/dashboard/AlgoTable';


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
  
        
        const yearDiff = (item.makeYear - inputArray.YearText);
        scores.YearScore = yearDiff * inputArray.YearWeight * 2;
        item.YearScore = scores.YearScore;
  
        const priceDiff = (item.price - inputArray.PriceText);
        scores.PriceScore = priceDiff/inputArray.PriceText * inputArray.PriceWeight * 5;
        item.PriceScore = scores.PriceScore;
  
        const mileageDiff = (item.mileage - inputArray.MileageText);
        scores.MileageScore = mileageDiff/inputArray.MileageText * inputArray.MileageWeight * 2.5;
        item.MileageScore = scores.MileageScore;
  
        const totalScore = scores.MakeScore + scores.ModelScore + scores.YearScore + scores.PriceScore + scores.MileageScore + scores.ColorScore;
  
  
        // const itemScore = scores.MakeScore + scores.ModelScore + scores.YearScore + scores.PriceScore + scores.MileageScore + scores.ColorScore;
        const itemScore = 100 - totalScore;
        // console.log(scores);
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
                <Label for="MakeWeight">MakeWeight</Label>
                <Input id="MakeWeight" name="MakeWeight" type="select" onChange={e => inputArray.MakeWeight = (e.target.value)}>
                  <option value="1">1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="MakeText">MakeText</Label>
                <Input id="MakeText" name="MakeText" type="textarea" onChange={(e) => {setInputArray(inputArray => ({...inputArray, ...{"MakeText": e.target.value}}))}}/>
              </FormGroup>
              <FormGroup>
                <Label for="ModelWeight">ModelWeight</Label>
                <Input id="ModelWeight" name="ModelWeight" type="select" onChange={e => inputArray.ModelWeight = (e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ModelText">ModelText</Label>
                <Input id="ModelText" name="ModelText" type="textarea"  onChange={e => inputArray.ModelText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="MileageWeight">MileageWeight</Label>
                <Input id="MileageWeight" name="MileageWeight" type="select" onChange={e => inputArray.MileageWeight = (e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="MileageText">MileageText</Label>
                <Input id="MileageText" name="MileageText" type="textarea"  onChange={e => inputArray.MileageText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="YearWeight">YearWeight</Label>
                <Input id="YearWeight" name="YearWeight" type="select" onChange={e => inputArray.YearWeight = (e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="YearText">YearText</Label>
                <Input id="YearText" name="YearText" type="textarea"  onChange={e => inputArray.YearText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="PriceWeight">PriceWeight</Label>
                <Input id="PriceWeight" name="PriceWeight" type="select" onChange={e => inputArray.PriceWeight = (e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="PriceText">PriceText</Label>
                <Input id="PriceText" name="PriceText" type="textarea"  onChange={e => inputArray.PriceText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="ColorWeight">ColorWeight</Label>
                <Input id="ColorWeight" name="ColorWeight" type="select" onChange={e => inputArray.ColorWeight = (e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ColorText">ColorText</Label>
                <Input id="ColorText" name="ColorText" type="textarea"  onChange={e => inputArray.ColorText = (e.target.value)}/>
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
