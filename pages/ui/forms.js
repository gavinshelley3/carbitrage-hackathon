import {
  useState
}
from 'react'
import getScores from '../utils';
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

const Forms = () => {
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);


const inputArray = {
  MakeWeight : "",
  MakeText : "",
  ModelWeight : "",
  ModelText : "",
  YearWeight : "",
  YearText : "",
  PriceWeight : "",
  PriceText : "",
  MileageWeight : "",
  MileageText : "",
  ColorWeight : "",
  ColorText : "",
};

  return (
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
                <Input id="MakeWeight" name="select" type="select" onChange={e => inputArray.MakeWeight = (e.target.value)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="MakeText">MakeText</Label>
                <Input id="MakeText" name="text" type="textarea" onChange={e => inputArray.MakeText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="ModelWeight">ModelWeight</Label>
                <Input id="ModelWeight" name="select" type="select" onChange={e => inputArray.ModelWeight = (e.target.value)}>
                <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ModelText">ModelText</Label>
                <Input id="ModelText" name="text" type="textarea"  onChange={e => inputArray.ModelText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="MileageWeight">MileageWeight</Label>
                <Input id="MileageWeight" name="select" type="select" onChange={e => inputArray.MileageWeight = (e.target.value)}>
                <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="MileageText">MileageText</Label>
                <Input id="MileageText" name="text" type="textarea"  onChange={e => inputArray.MileageText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="YearWeight">YearWeight</Label>
                <Input id="YearWeight" name="select" type="select" onChange={e => inputArray.YearWeight = (e.target.value)}>
                <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="YearText">YearText</Label>
                <Input id="YearText" name="text" type="textarea"  onChange={e => inputArray.YearText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="PriceWeight">PriceWeight</Label>
                <Input id="PriceWeight" multiple name="selectMulti" type="select" onChange={e => inputArray.PriceWeight = (e.target.value)}>
                <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="PriceText">PriceText</Label>
                <Input id="PriceText" name="text" type="textarea"  onChange={e => inputArray.PriceText = (e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="ColorWeight">ColorWeight</Label>
                <Input id="ColorWeight" name="select" type="select" onChange={e => inputArray.ColorWeight = (e.target.value)}>
                <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ColorText">ColorText</Label>
                <Input id="ColorText" name="text" type="textarea"  onChange={e => inputArray.ColorText = (e.target.value)}/>
              </FormGroup>
              <Button 
              onClick={ getScores(inputArray)}
              >Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
