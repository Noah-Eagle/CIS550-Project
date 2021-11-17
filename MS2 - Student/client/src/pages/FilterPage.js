import React from 'react';

import MenuBar from '../components/MenuBar';
import { getFilteredRents, getFilteredCrime } from '../fetcher'

import { Form, FormInput, FormGroup, Button } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate
} from 'antd'

const { Column, ColumnGroup } = Table;
const { Option } = Select;

const rentColumns = [
    {
      title: 'Neighborhood',
      dataIndex: 'Neighborhood',
      key: 'Neighborhood',
      sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood),
    },
    {
        title: 'Cheapest Rent',
        dataIndex: 'Cheapest_Rent',
        key: 'Cheapest_Rent',
        sorter: (a, b) => a.Cheapest_Rent - b.Cheapest_Rent
      },
    {
      title: 'Average Rent',
      dataIndex: 'Average_Rent',
      key: 'Average_Rent',
      sorter: (a, b) => a.Average_Rent - b.Average_Rent
    },
    {
        title: 'Costliest Rent',
        dataIndex: 'Costliest_Rent',
        key: 'Costliest_Rent',
        sorter: (a, b) => a.Costliest_Rent - b.Costliest_Rent
      },
    {
      title: 'Rent Range',
      dataIndex: 'Rent_Range',
      key: 'Rent_Range',
      sorter: (a, b) => a.Rent_Range - b.Rent_Range
    }
];

const crimeColumns = [
    {
      title: 'Neighborhood',
      dataIndex: 'Neighborhood',
      key: 'Neighborhood',
      sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood),
    },
    {
        title: 'Felony Count',
        dataIndex: 'Felony_Count',
        key: 'Felony_Count',
        sorter: (a, b) => a.Felony_Count - b.Felony_Count
      },
    {
      title: 'Gender Victimizations',
      dataIndex: 'Gender_Victimizations',
      key: 'Gender_Victimizations',
      sorter: (a, b) => a.Gender_Victimizations - b.Gender_Victimizations
    },
    {
        title: 'Age Group Victimizations',
        dataIndex: 'Age_Group_Victimizations',
        key: 'Age_Group_Victimizations',
        sorter: (a, b) => a.Age_Group_Victimizations - b.Age_Group_Victimizations
      }
];

class FilterPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        rentResults: [],
        low_rent_bound: 0,
        high_rent_bound: Number.MAX_SAFE_INTEGER,
        crimeResults: [],
        felony_limit: Number.MAX_SAFE_INTEGER,
        gender_limit: Number.MAX_SAFE_INTEGER,
        age_limit: Number.MAX_SAFE_INTEGER,
        gender: 'F',
        age_range: '<18'
      }
  
      this.handleLowRentBoundChange = this.handleLowRentBoundChange.bind(this)
      this.handleHighRentBoundChange = this.handleHighRentBoundChange.bind(this)
      this.updateRentSearchResults = this.updateRentSearchResults.bind(this)

      this.handleFelonyLimitChange = this.handleFelonyLimitChange.bind(this)
      this.handleGenderLimitChange = this.handleGenderLimitChange.bind(this)
      this.handleAgeLimitChange = this.handleAgeLimitChange.bind(this)
      this.handleGenderChange = this.handleGenderChange.bind(this)
      this.handleAgeRangeChange = this.handleAgeRangeChange.bind(this)
      this.updateCrimeSearchResults = this.updateCrimeSearchResults.bind(this)


    }

    handleFelonyLimitChange(event) {

        this.setState({ felony_limit: event.target.value})
    }

    handleGenderLimitChange(event) {

        this.setState({ gender_limit: event.target.value})
    }

    handleAgeLimitChange(event) {

        this.setState({ age_limit: event.target.value})
    }

    handleGenderChange(value) {

        this.setState({ gender: value})
    }

    handleAgeRangeChange(value) {

        this.setState({ age_range: value})
    }

    updateCrimeSearchResults() {

        getFilteredCrime(this.state.felony_limit, this.state.gender_limit, this.state.age_limit, this.state.gender, this.state.age_range).then(res => {
            this.setState({ crimeResults: res.results })
        })
    }
  
    handleLowRentBoundChange(event) {

        this.setState({ low_rent_bound: event.target.value})
    }

    handleHighRentBoundChange(event) {

        this.setState({ high_rent_bound: event.target.value})
    }
  
    updateRentSearchResults() {

        getFilteredRents(this.state.low_rent_bound, this.state.high_rent_bound).then(res => {
            this.setState({ rentResults: res.results })
        })
    }
  
    componentDidMount() {

        getFilteredRents(0, 10000).then(res => {
            this.setState({ rentResults: res.results })
        })

        getFilteredCrime(50, 50, 50, 'F', '<18').then(res => {
            this.setState({ crimeResults: res.results })
        })
    }
  
    render() {
  
      return (
        <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Low Rent Bound</label>
                            <FormInput placeholder="0" value={this.state.low_rent_bound} onChange={this.handleLowRentBoundChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>High Rent Bound</label>
                            <FormInput placeholder="" value={this.state.high_rent_bound} onChange={this.handleHighRentBoundChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateRentSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />
            <Table dataSource={this.state.rentResults} columns={rentColumns} pagination={false}></Table>

            <Divider />

            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Lowest X for Felonies</label>
                            <FormInput placeholder="50" value={this.state.felony_limit} onChange={this.handleFelonyLimitChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Lowest X for Gender Victimizations</label>
                            <FormInput placeholder="50" value={this.state.gender_limit} onChange={this.handleGenderLimitChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Lowest X for Age Group Victimizations</label>
                            <FormInput placeholder="50" value={this.state.age_limit} onChange={this.handleAgeLimitChange} />
                        </FormGroup></Col>
                    </Row>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Gender</label>
                            <Select defaultValue="F" style={{ width: '20vw' }} onChange={this.handleGenderChange}>
                                <Option value="F">Female</Option>
                                <Option value="M">Male</Option>
                            </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Age Group</label>
                            <Select defaultValue="<18" style={{ width: '20vw' }} onChange={this.handleAgeRangeChange}>
                                <Option value="<18">Under 18</Option>
                                <Option value="18-24">18-24</Option>
                                <Option value="25-44">25-44</Option>
                                <Option value="45-64">45-64</Option>
                                <Option value="65+">65+</Option>
                            </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateCrimeSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />
            <Table dataSource={this.state.crimeResults} columns={crimeColumns} pagination={false}></Table>

        </div>
        </div>
      )
    }
  
  }
  
  export default FilterPage
  
  

