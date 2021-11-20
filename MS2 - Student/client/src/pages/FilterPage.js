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
    Radio,
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
        sorter: (a, b) => parseFloat(a.Offense_Count.replace(/,/g, '')) - parseFloat(b.Offense_Count.replace(/,/g, ''))
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
        sorter: (a, b) => parseFloat(a.Gender_Victimizations.replace(/,/g, '')) - parseFloat(b.Gender_Victimizations.replace(/,/g, ''))
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
        sorter: (a, b) => parseFloat(a.Age_Group_Victimizations.replace(/,/g, '')) - parseFloat(b.Age_Group_Victimizations.replace(/,/g, ''))
      },
];

class FilterPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        minrent: '',
        maxrent: '',
        rentResults: [],

        offenselevel: '',
        offensenumresults: '',
        offenseorder: '',
        crimeOffenseResults: [],

        gender: '',
        gendernumresults: '',
        genderorder: '',
        crimeGenderResults: [],

        agerange: '',
        agenumresults: '',
        ageorder: '',
        crimeAgeResults: []
      }
  
      this.handleMinRentChange = this.handleMinRentChange.bind(this)
      this.handleMaxRentChange = this.handleMaxRentChange.bind(this)
      this.updateRentSearchResults = this.updateRentSearchResults.bind(this)

      this.handleOffenseChange = this.handleOffenseChange.bind(this)
      this.handleOffenseLimitChange = this.handleOffenseLimitChange.bind(this)
      this.handleOffenseOrderChange = this.handleOffenseOrderChange.bind(this)
      this.updateOffenseCrimeSearchResults = this.updateOffenseCrimeSearchResults.bind(this)

      this.handleGenderChange = this.handleGenderChange.bind(this)
      this.handleGenderLimitChange = this.handleGenderLimitChange.bind(this)
      this.handleGenderOrderChange = this.handleGenderOrderChange.bind(this)
      this.updateGenderCrimeSearchResults = this.updateGenderCrimeSearchResults.bind(this)

      this.handleAgeRangeChange = this.handleAgeRangeChange.bind(this)
      this.handleAgeLimitChange = this.handleAgeLimitChange.bind(this)
      this.handleAgeOrderChange = this.handleAgeOrderChange.bind(this)
      this.updateAgeCrimeSearchResults = this.updateAgeCrimeSearchResults.bind(this)

    }



    componentDidMount() {

        getFilteredRents(0, Number.MAX_SAFE_INTEGER).then(res => {
            this.setState({ rentResults: res.results })
        })

        getFilteredCrimeOffense('Felony', 1, 'ASC').then(res => {
            this.setState({crimeOffenseResults: res.results})
        })

        getFilteredCrimeGender('M', 1, 'ASC').then(res => {
            this.setState({crimeGenderResults: res.results})
        })

        getFilteredCrimeAge('<18', 1, 'ASC').then(res => {
            this.setState({crimeAgeResults: res.results})
        })
    }



    handleMinRentChange(event) {

        this.setState({ minrent: event.target.value})
    }

    handleMaxRentChange(event) {

        this.setState({ maxrent: event.target.value})
    }
  
    updateRentSearchResults() {

        getFilteredRents(this.state.minrent, this.state.maxrent).then(res => {
            this.setState({ rentResults: res.results })
            console.log(this.state.minrent)
            console.log(this.state.maxrent)
        })
    }
  
    


    handleOffenseChange(value) {

        this.setState({ offenselevel: value})
    }

    handleOffenseLimitChange(value) {

        this.setState({ offensenumresults: value})
    }

    handleOffenseOrderChange(event) {

        this.setState({ offenseorder: event.target.value})
    }

    updateOffenseCrimeSearchResults() {

        getFilteredCrimeOffense(this.state.offenselevel, this.state.offensenumresults, this.state.offenseorder).then(res => {

            this.setState({ crimeOffenseResults: res.results })
        })
    }




    handleGenderChange(value) {

        this.setState({ gender: value})
    }

    handleGenderLimitChange(value) {

        this.setState({ gendernumresults: value})
    }

    handleGenderOrderChange(event) {

        this.setState({ genderorder: event.target.value})
    }

    updateGenderCrimeSearchResults() {

        getFilteredCrimeGender(this.state.gender, this.state.gendernumresults, this.state.genderorder).then(res => {

            this.setState({ crimeGenderResults: res.results })
        })
    }






    handleAgeRangeChange(value) {

        this.setState({ agerange: value})
    }

    handleAgeLimitChange(value) {

        this.setState({ agenumresults: value})
    }

    handleAgeOrderChange(event) {

        this.setState({ ageorder: event.target.value})
    }

    updateAgeCrimeSearchResults() {

        getFilteredCrimeAge(this.state.agerange, this.state.agenumresults, this.state.ageorder).then(res => {

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
                            <Select defaultValue="Felony" style={{ width: '20vw' }} onChange={this.handleOffenseChange}>
                                <Option value="Felony">Felony</Option>
                                <Option value="Misdemeanor">Misdemeanor</Option>
                                <Option value="Violation">Violation</Option>
                            </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <Select defaultValue={1} style={{ width: 120 }} onChange={this.handleOffenseLimitChange}>
                            <Option value={1}>Top 1</Option>
                            <Option value={5}>Top 5</Option>
                            <Option value={10}>Top 10</Option>
                            <Option value={Number.MAX_SAFE_INTEGER}>All</Option>
                        </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Radio.Group
                            options={
                                [
                                    {label: 'Lowest', value: 'ASC'},
                                    {label: 'Highest', value: 'DESC'},
                                ]
                            }
                            onChange={this.handleOffenseOrderChange}
                            defaultValue="ASC"
                            optionType="button"
                            buttonStyle="solid"
                            />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '0vh' }} onClick={this.updateOffenseCrimeSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />
            <Table dataSource={this.state.crimeOffenseResults} columns={crimeOffenseColumns} pagination={{ defaultPageSize: 5, showQuickJumper:true }}></Table>
        
            <Divider />






            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Select defaultValue="M" style={{ width: '20vw' }} onChange={this.handleGenderChange}>
                                <Option value="M">Male</Option>
                                <Option value="F">Female</Option>
                            </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <Select defaultValue={1} style={{ width: 120 }} onChange={this.handleGenderLimitChange}>
                            <Option value={1}>Top 1</Option>
                            <Option value={5}>Top 5</Option>
                            <Option value={10}>Top 10</Option>
                            <Option value={Number.MAX_SAFE_INTEGER}>All</Option>
                        </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Radio.Group
                            options={
                                [
                                    {label: 'Lowest', value: 'ASC'},
                                    {label: 'Highest', value: 'DESC'},
                                ]
                            }
                            onChange={this.handleGenderOrderChange}
                            defaultValue="ASC"
                            optionType="button"
                            buttonStyle="solid"
                            />
                        </FormGroup></Col>                
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '0vh' }} onClick={this.updateGenderCrimeSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />
            <Table dataSource={this.state.crimeGenderResults} columns={crimeGenderColumns} pagination={{ defaultPageSize: 5, showQuickJumper:true }}></Table>

            <Divider />







            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Select defaultValue="%3C18" style={{ width: '20vw' }} onChange={this.handleAgeRangeChange}>
                                <Option value="%3C18">Under 18</Option>
                                <Option value="18%2D24">18-24</Option>
                                <Option value="25%2D44">25-44</Option>
                                <Option value="45%2D64">45-64</Option>
                                <Option value="65%2B">65+</Option>
                            </Select>
                            </FormGroup></Col>
                            <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Select defaultValue={1} style={{ width: 120 }} onChange={this.handleAgeLimitChange}>
                            <Option value={1}>Top 1</Option>
                            <Option value={5}>Top 5</Option>
                            <Option value={10}>Top 10</Option>
                            <Option value={Number.MAX_SAFE_INTEGER}>All</Option>
                        </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Radio.Group
                            options={
                                [
                                    {label: 'Lowest', value: 'ASC'},
                                    {label: 'Highest', value: 'DESC'},
                                ]
                            }
                            onChange={this.handleAgeOrderChange}
                            defaultValue="ASC"
                            optionType="button"
                            buttonStyle="solid"
                            />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '0vh' }} onClick={this.updateAgeCrimeSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

            <Divider />
            <Table dataSource={this.state.crimeAgeResults} columns={crimeAgeColumns} pagination={{ defaultPageSize: 5, showQuickJumper:true }}></Table>

        </div>
        </div>
      )
    }
  
  }
  
  export default FilterPage