import React from 'react';
import {
  Table,
  Select,
  Divider
} from 'antd';
import MenuBar from '../components/MenuBar';
import { getBoroughSummary, getCityRents, getCityCrimeLevel, getCityCrimeAge} from '../fetcher';
//import {  } from '../fetcher';
import { AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { Button } from "shards-react";
const { Option } = Select;

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

class DashboardPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      cityRentsResults: [],
      cityCrimeLevelResults: [],
      cityCrimeAgeResults: []
    }

    this.yearOnChange = this.yearOnChange.bind(this)

  }


  componentDidMount() {

    getCityRents().then(res => {
        this.setState({cityRentsResults: res.results})
    })
    getCityCrimeLevel().then(res => {
        this.setState({cityCrimeLevelResults: res.results})
    })
    getCityCrimeAge().then(res => {
        this.setState({cityCrimeAgeResults: res.results})
    })

  }

  yearOnChange(value) {

      getBoroughSummary(value).then(res => {
      this.setState({ boroughSummaryResults: res.results })
    })
  }


  render() {


    return (

      <div >
      <MenuBar />
    
    

      <div style={{ width: '50vw', float: 'left', margin: '0 auto', marginTop: '2vh', marginLeft: '45vh'}}>

      <h3 style={{textAlign: 'center', textDecoration: 'underline'  }}>NYC Rental Market Overview</h3>

      <h4 style={{textAlign: 'center'}}>NYC Average Rent</h4>

      <ResponsiveContainer width='100%' aspect={2.5} alignItems='center'>
        <AreaChart
          width={500}
          height={300}
          data={this.state.cityRentsResults}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='Date' />
          <YAxis domain={[2000, 2800]}/>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Area dataKey='AVG' name='Average Rent' fill='#007bff' stroke="#007bff"/>
        </AreaChart>
      </ResponsiveContainer>
      
    </div>

    <Divider />
    
    <h3 style={{textAlign: 'center', textDecoration: 'underline'  }}>NYC Crime Situation Overview</h3>

    <div style={{ width: '45vw', float: 'left', margin: '0 auto', marginTop: '2vh',  marginLeft: '5vh'}}>

      <h4 style={{textAlign: 'center'}}>NYC Crime Count By Level</h4>

      <ResponsiveContainer width='100%' aspect={2.5} alignItems='center'>
        <AreaChart
          width={500}
          height={300}
          data={this.state.cityCrimeLevelResults}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='Date' />
          <YAxis domain={[20000, 40000]}/>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Area dataKey='Violation_Num' type="monotone" stackId="1" name='Violation' stroke="#8884d8" fill="#8884d8"/>
          <Area dataKey='Misdemeanor_Num' type="monotone" stackId="1" name='Misdemeanor' stroke="#82ca9d" fill="#82ca9d"/>
          <Area dataKey='Felony_NUM' type="monotone" stackId="1" name='Felony' stroke="#ffc658" fill="#ffc658"/>
          <Legend />
        </AreaChart>
      </ResponsiveContainer>

    </div>

    <div style={{ width: '45vw', float: 'left', margin: '0 auto', marginTop: '2vh',  marginLeft: '5vh'}}>

        <h4 style={{textAlign: 'center'}}>NYC Crime Age Group Percentage</h4>

        <ResponsiveContainer width='100%' aspect={2.5} alignItems='center'>
        <BarChart
            width={500}
            height={300}
            data={this.state.cityCrimeAgeResults}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='Date' />
            <YAxis tickFormatter={toPercent} domain={[0, 1]}/>
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
            <Bar dataKey='AG1_ratio' type="monotone" stackId="1" name='<18' stroke="#8884d8" fill="#8884d8"/>
            <Bar dataKey='AG2_ratio' type="monotone" stackId="1" name='18-24' stroke="#82ca9d" fill="#82ca9d"/>
            <Bar dataKey='AG3_ratio' type="monotone" stackId="1" name='25-44' stroke="#ffc658" fill="#ffc658"/>
            <Bar dataKey='AG4_ratio' type="monotone" stackId="1" name='45-64' stroke="#FF5733" fill="#FF5733"/>
            <Bar dataKey='AG5_ratio' type="monotone" stackId="1" name='65+' stroke="#C70039" fill="#C70039"/>
            <Legend />
        </BarChart>
        </ResponsiveContainer>

    </div>



  </div>

    )
  }

}

export default DashboardPage
