import React from 'react';

import MenuBar from '../components/MenuBar';
import { getFilteredRents, getFilteredCrimeOffense, getFilteredCrimeGender, getFilteredCrimeAge } from '../fetcher'

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
      sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood)
    },
    {
        title: 'Average Rent',
        dataIndex: 'AverageRent',
        key: 'AverageRent',
        sorter: (a, b) => parseFloat(a.AverageRent.replace(/,/g, '').replace('$', '')) - parseFloat(b.AverageRent.replace(/,/g, '').replace('$', ''))
      },
    {
        title: 'Lowest Rent',
        dataIndex: 'LowestRent',
        key: 'LowestRent',
        sorter: (a, b) => parseFloat(a.LowestRent.replace(/,/g, '').replace('$', '')) - parseFloat(b.LowestRent.replace(/,/g, '').replace('$', ''))
      },
    {
        title: 'Highest Rent',
        dataIndex: 'HighestRent',
        key: 'HighestRent',
        sorter: (a, b) => parseFloat(a.HighestRent.replace(/,/g, '').replace('$', '')) - parseFloat(b.HighestRent.replace(/,/g, '').replace('$', ''))
      },
    {
      title: 'Rent Range',
      dataIndex: 'RentRange',
      key: 'RentRange',
      sorter: (a, b) => parseFloat(a.RentRange.replace(/,/g, '').replace('$', '')) - parseFloat(b.RentRange.replace(/,/g, '').replace('$', ''))
    }
];


const crimeOffenseColumns = [
    {
      title: 'Neighborhood',
      dataIndex: 'Neighborhood',
      key: 'Neighborhood',
      sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood),
    },
    {
        title: 'Offense Count',
        dataIndex: 'Offense_Count',
        key: 'Offense_Count',
        sorter: (a, b) => a.Offense_Count - b.Offense_Count
      },
];

const crimeGenderColumns = [
    {
      title: 'Neighborhood',
      dataIndex: 'Neighborhood',
      key: 'Neighborhood',
      sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood),
    },
    {
        title: 'Gender Victimizations',
        dataIndex: 'Gender_Victimizations',
        key: 'Gender_Victimizations',
        sorter: (a, b) => a.Gender_Victimizations - b.Gender_Victimizations
      },
];

const crimeAgeColumns = [
    {
      title: 'Neighborhood',
      dataIndex: 'Neighborhood',
      key: 'Neighborhood',
      sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood),
    },
    {
        title: 'Age Group Victimizations',
        dataIndex: 'Age_Group_Victimizations',
        key: 'Age_Group_Victimizations',
        sorter: (a, b) => a.Age_Group_Victimizations - b.Age_Group_Victimizations
      },
];

class FilterPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        minrent: '',
        maxrent: '',
        rentResults: [],
        offense_limit: Number.MAX_SAFE_INTEGER,
        gender_limit: Number.MAX_SAFE_INTEGER,
        age_limit: Number.MAX_SAFE_INTEGER,
        offense: 'Felony',
        gender: 'F',
        age_range: '<18',
        crimeOffenseResults: [],
        crimeGenderResults: [],
        crimeAgeResults: []
      }
  
      this.handleMinRentChange = this.handleMinRentChange.bind(this)
      this.handleMaxRentChange = this.handleMaxRentChange.bind(this)
      this.updateRentSearchResults = this.updateRentSearchResults.bind(this)

      this.handleOffenseLimitChange = this.handleOffenseLimitChange.bind(this)
      this.handleGenderLimitChange = this.handleGenderLimitChange.bind(this)
      this.handleAgeLimitChange = this.handleAgeLimitChange.bind(this)
      this.handleOffenseChange = this.handleOffenseChange.bind(this)
      this.handleGenderChange = this.handleGenderChange.bind(this)
      this.handleAgeRangeChange = this.handleAgeRangeChange.bind(this)
      this.updateOffenseCrimeSearchResults = this.updateOffenseCrimeSearchResults.bind(this)
      this.updateGenderCrimeSearchResults = this.updateGenderCrimeSearchResults.bind(this)
      this.updateAgeCrimeSearchResults = this.updateAgeCrimeSearchResults.bind(this)

    }



    componentDidMount() {
        console.log(this.state.minrent)
        console.log(typeof this.state.minrent)
        getFilteredRents(0, Number.MAX_SAFE_INTEGER).then(res => {
            this.setState({ rentResults: res.results })
        })

        // getFilteredCrime(50, 50, 50, 'F', '<18').then(res => {
        //     this.setState({ crimeResults: res.results })
        // })
    }



    handleMinRentChange(event) {

        this.setState({ minrent: event.target.value})
    }

    handleMaxRentChange(event) {

        this.setState({ maxrent: event.target.value})
    }
  
    updateRentSearchResults() {
        console.log(this.state.minrent)
        console.log(typeof this.state.minrent)
        getFilteredRents(this.state.minrent, this.state.maxrent).then(res => {
            this.setState({ rentResults: res.results })
        })
    }
  
    




    handleOffenseLimitChange(event) {

        this.setState({ offense_limit: event.target.value})
    }

    handleOffenseChange(value) {

        this.setState({ offense: value})
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

    updateOffenseCrimeSearchResults() {

        getFilteredCrimeOffense(this.state.offense_limit, this.state.offense).then(res => {
            this.setState({ crimeOffenseResults: res.results })
        })
    }

    updateGenderCrimeSearchResults() {

        getFilteredCrimeGender(this.state.gender_limit, this.state.gender).then(res => {
            this.setState({ crimeGenderResults: res.results })
        })
    }

    updateAgeCrimeSearchResults() {

        console.log(this.state.age_limit)
        console.log(this.state.age_range)
        console.log(typeof(this.state.age_range))

        getFilteredCrimeAge(this.state.age_limit, this.state.age_range).then(res => {
            console.log(res.results)
            this.setState({ crimeAgeResults: res.results })
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
                            <FormInput placeholder="Minimum Rent" onChange={this.handleMinRentChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <FormInput placeholder="Maximum Rent" onChange={this.handleMaxRentChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '0vh' }} onClick={this.updateRentSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />

            <Table dataSource={this.state.rentResults} columns={rentColumns} pagination={{ defaultPageSize: 5, showQuickJumper:true }}></Table>

            <Divider />





            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Offense</label>
                            <Select defaultValue="Felony" style={{ width: '20vw' }} onChange={this.handleOffenseChange}>
                                <Option value="Felony">Felony</Option>
                                <Option value="Misdemeanor">Misdemeanor</Option>
                                <Option value="Violation">Violation</Option>
                            </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Lowest X for Selected Offense</label>
                            <FormInput placeholder="50" value={this.state.offense_limit} onChange={this.handleOffenseLimitChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '0vh' }} onClick={this.updateOffenseCrimeSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />
            <Table dataSource={this.state.crimeOffenseResults} columns={crimeOffenseColumns} pagination={false}></Table>
        
            <Divider />

            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Gender</label>
                            <Select defaultValue="F" style={{ width: '20vw' }} onChange={this.handleGenderChange}>
                                <Option value="F">Female</Option>
                                <Option value="M">Male</Option>
                            </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Safest X for Selected Gender</label>
                            <FormInput placeholder="50" value={this.state.gender_limit} onChange={this.handleGenderLimitChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '0vh' }} onClick={this.updateGenderCrimeSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />
            <Table dataSource={this.state.crimeGenderResults} columns={crimeGenderColumns} pagination={false}></Table>

            <Divider />

            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
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
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Safest X for Selected Age Group</label>
                            <FormInput placeholder="50" value={this.state.age_limit} onChange={this.handleAgeLimitChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '0vh' }} onClick={this.updateAgeCrimeSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />
            <Table dataSource={this.state.crimeAgeResults} columns={crimeAgeColumns} pagination={false}></Table>

        </div>
        </div>
      )
    }
  
  }
  
  export default FilterPage