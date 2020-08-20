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
  FormGroup, Label, Input,
  PaginationItem, PaginationLink, Pagination,
  TabPane, TabContent,
  NavItem, NavLink, Nav
} from 'reactstrap';
import { ReactDOM } from 'react-dom';
import { Link } from 'react-router-dom';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import axios from "axios";

const Widget03 = lazy(() => import('../Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class Food extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleAjouter = this.handleAjouter.bind(this)
    this.handleModifier = this.handleModifier.bind(this)
    this.addCategorieExercise = this.addCategorieExercise.bind(this)
    this.removeCategorieExercise = this.removeCategorieExercise.bind(this)
    this.handlePaginate = this.handlePaginate.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      exoCats: [],
      name: '',
      description: '',
      image: '',
      cat_id: 0,
      nameModif: '',
      descriptionModif: '',
      imageModif: '',
      pagination: 1,
      page: 1,
      perPage: 5,
      activeTab: '1',
    };
  }

  handlePaginate = (i) => {
    //console.log(i);
    const index = i;
    this.setState(state => ({
      page: index
    }));
  }

  handlePrevious = () => {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1
      })
    }
  }

  handleNext = () => {
    if (this.state.page < this.state.pagination) {
      this.setState({
        page: this.state.page + 1
      })
    }
  }

  toggle(t) {
    /*const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });*/
    const tab = t;
    this.setState({
      activeTab: tab,
    });
  }

  async getCategoriesExercises() {
    let config = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        'Retry-After': 600,
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    await axios.get(`http://ef0c96339a16.ngrok.io/api/service/categoriesFood/listCategoriesFood`,
      config).then(
        res => {
          //console.log(res.data)
          this.setState({
            exoCats: res.data,
            pagination: Math.ceil(res.data.length / this.state.perPage)
          })
        }
      );
  }

  async addCategorieExercise() {
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
    await axios.post(`http://ef0c96339a16.ngrok.io/api/service/catgeorieFood/addCategoryFood`,
      {
        "name": this.state.name,
        "description": this.state.description,
        "image": this.state.image
      },
      config).then(
        res => {
          //console.log(res.data)
          let exosCats = this.state.exoCats;
          exosCats.push(res.data);
          this.setState({
            exoCats: exosCats
          })
        }
      );
  }

  async removeCategorieExercise(id, index) {
    let config = {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    //console.log(id);
    //console.log(index);
    await axios.delete(`http://ef0c96339a16.ngrok.io/api/service/catgeorieFood/deleteCategoryFood/${id}`,
      config).then(
        res => {
          //console.log(res.data)
          var array = [...this.state.exoCats];
          if (index != -1) {
            array.splice(index, 1);
            this.setState({
              exoCats: array
            });
          }
          //this.window.location.refresh();
        }
      );
  }

  async modifierCategorieExercise(id) {
    let config = {
      //method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      //mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    await axios.put(`http://ef0c96339a16.ngrok.io/api/service/catgeorieFood/updateCategoryFood/${this.state.cat_id}`,
      {
        name: this.state.nameModif,
        description: this.state.descriptionModif,
        image: this.state.imageModif
      }
      , config).then(
        res => {
          //console.log(res.data)
          window.location.reload()
        }
      );
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

  handleAjouter() {
    this.addCategorieExercise();
  }

  handleSupprimer(e) {
    let target;
    if (e.target.name == undefined) {
      target = e.target.parentNode
    } else {
      target = e.target
    }
    this.removeCategorieExercise(target.id, parseInt(target.name))
  }

  handleModifier() {
    this.modifierCategorieExercise()
  }

  handleChildClick(e) {
    e.stopPropagation();
  }

  componentDidMount() {
    this.getCategoriesExercises();
    // this.addCategorieExercise();
  }



  render() {

    const pageNumbers = [];
    for (let i = 1; i <= this.state.pagination; i++) {
      pageNumbers.push(i);
    }
    const paginationItem = pageNumbers.map((i) => {
      if (this.state.page === i) {
        return (
          <PaginationItem active key={i} >
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      } else {
        return (
          <PaginationItem key={i} id={i} onClick={() => this.handlePaginate(i)}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      }
    });
    const pagination = (
      <Pagination>
        <PaginationItem><PaginationLink previous tag="button" onClick={() => this.handlePrevious()} >Prev</PaginationLink></PaginationItem>
        {paginationItem}
        <PaginationItem><PaginationLink next tag="button" onClick={() => this.handleNext()} >Next</PaginationLink></PaginationItem>
      </Pagination>
    );
    const tabPane = (
      <>
        <TabPane tabId="1">
          <Card>
            <CardHeader>Ajouter une catégorie de food</CardHeader>
            <CardBody>
              <FormGroup>
                <Label htmlFor="name">Nom</Label>
                <Input type="text" id="name" placeholder="Nom de la catégorie" name="name" onChange={this.handleChange} required />
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="textarea-input">Description</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="textarea" name="description" id="textarea-input" rows="6"
                    placeholder="Contenu..." onChange={this.handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="image">Image</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="file" id="image" name="image" onChange={this.handleChange} />
                </Col>
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.handleAjouter} ><i className="fa fa-dot-circle-o"></i> Ajouter</Button>
            </CardFooter>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          <Card>
            <CardHeader>Modifier une catégorie de food</CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="select">Select</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="cat_id" id="select" onChange={this.handleChange}>
                    <option value="0">Choisissez la catégorie</option>
                    {this.state.exoCats.map((cat) => {
                      return (
                        <option value={cat.id}>{cat.name}</option>
                      )
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Nom</Label>
                <Input type="text" id="name" placeholder="Nom de la catégorie" name="nameModif" onChange={this.handleChange} required />
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="textarea-input">Description</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="textarea" name="descriptionModif" id="textarea-input" rows="6"
                    placeholder="Contenu..." onChange={this.handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="image">Image</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="file" id="image" name="imageModif" onChange={this.handleChange} />
                </Col>
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.handleModifier} ><i className="fa fa-dot-circle-o"></i>Modifier</Button>
            </CardFooter>
          </Card>
        </TabPane>
      </>
    )

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12" md="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle('1'); }}
                >
                  Ajouter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle('2'); }}
                >
                  Modifier
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {tabPane}
            </TabContent>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Catégories de foods
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.exoCats.slice(this.state.page * this.state.perPage - this.state.perPage, this.state.page * this.state.perPage).map((cat, index) => {
                      //console.log(index)
                      return (
                        <tr key={cat.id}>
                          {/* <td width="500"><img src={cat.image}></img> </td> */}
                          <td>{cat.name}</td>
                          <td width="500" >{cat.description}</td>
                          <td width="50" key={cat.id}>
                            <Row >
                              <Col>
                                <Button color="primary" block onClick={() => this.props.history.push(`/addcatfood/${cat.id}/${cat.name}`)}>
                                  <Col xs="6" sm="4" md="3" xl="2">
                                    <i className="cui-chevron-top  font-2xl d-block"></i>
                                  </Col>
                                </Button>
                                <Button id={cat.id} name={index}
                                  block outline color="danger" onClick={e => this.handleSupprimer(e)}
                                >
                                  <i name="child2" id={cat.id + 2} className="cui-delete font-2xl d-block"></i>
                                </Button>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                {pagination}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Food;
