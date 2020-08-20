import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  FormGroup, Label, Input
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import axios from "axios";

const Widget03 = lazy(() => import('../Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class AddCategorieFood extends Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this)
    this.handleOnFileChange = this.handleOnFileChange.bind(this)
    this.handleAjouter = this.handleAjouter.bind(this)

    this.state = {
      caloriesBurned: 0,
      duration: 0,
      image: '',
      name: ''
    }
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(name);
    this.setState({
      [name]: value
    });
  }

  handleOnFileChange(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        image: reader.result
      })
    }
    /*this.setState({
      [event.target.name]: file
    })*/
  }

  async addExoToCategory() {
    let config = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    console.log(this.state);
    await axios.post(`http://ef0c96339a16.ngrok.io/api/service/category/${this.props.match.params.cat_id}/addFood`,
      {
        "calories": this.state.caloriesBurned,
        "image": this.state.image,
        "name": this.state.nom,
        "detailfood": {
          "acidessatures": 0,
          "calcium": 0,
          "calories": 0,
          "cholesterol": 0,
          "eau": 0,
          "fibres": 0,
          "id": 0,
          "name": "sssss",
          "potasium": 0,
          "proteins": 0,
          "sodium": 0,
          "sucres": 0,
          "vitamineB12": 0,
          "vitamineB3": 0,
          "vitamineB6": 0,
          "vitamineB9": 0,
          "vitamineC": 0,
          "vitamineD": 0,
          "vitamineE": 0
        },
      },
      config).then(
        res => {
          console.log(res);
        }
      );
  }

  handleAjouter() {
    this.addExoToCategory()
  }



  render() {
    //console.log(this.props.match.params.name);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="8" xs="12">
            <Card>
              <CardHeader>Formulaire d'ajout d'exercise à la catégorie {this.props.match.params.name}</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="name">Calories</Label>
                  <Input type="number" id="calories" placeholder="Calories brulées" name="caloriesBurned" onChange={this.handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Durée</Label>
                  <Input type="number" id="name" placeholder="Durée en minutes" name="duration" onChange={this.handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Nom</Label>
                  <Input type="text" id="name" placeholder="Nom de l'exercise" name="name" onChange={this.handleChange} required />
                </FormGroup>
                {/* <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="image">Image</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="file" accept="image/png, image/jpeg" name="image" onChange={this.handleOnFileChange} />
                  </Col>
                </FormGroup> */}
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleAjouter} ><i className="fa fa-dot-circle-o"></i> Ajouter</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddCategorieFood;
