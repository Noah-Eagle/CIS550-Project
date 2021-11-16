import React from 'react';
import {
  Table,
  Select
} from 'antd';
import MenuBar from '../components/MenuBar';
import { getBoroughTrends } from '../fetcher';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Option } = Select;

class BoroughTrendsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      boroughTrendsResults: [],
      // boroughlabels: [],
      // rentdata: [],
      // crimedata: []
  //     matchesPageNumber: 1,
  //     matchesPageSize: 10,
  //     playersResults: [],
  //     pagination: null  
    }

    this.boroughOnChange = this.boroughOnChange.bind(this)

  }

  //   this.leagueOnChange = this.leagueOnChange.bind(this)
  //   this.goToMatch = this.goToMatch.bind(this)
  // }


  // goToMatch(matchId) {
  //   window.location = `/matches?id=${matchId}`
  // }

  // leagueOnChange(value) {
  //   // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
  //   // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
  //   getAllMatches(null, null, value).then(res => {
  //     this.setState({ matchesResults: res.results })
  //   })
  // }

  // componentDidMount() {
  //   getAllMatches(null, null, 'D1').then(res => {
  //     this.setState({ matchesResults: res.results })
  //   })

  //   getAllPlayers().then(res => {
  //     console.log(res.results)
  //     // TASK 1: set the correct state attribute to res.results
  //     this.setState({ playersResults: res.results })
  //   })

  componentDidMount() {

    getBoroughTrends('Bronx').then(res => {
      this.setState({ boroughTrendsResults: res.results })
        console.log(this.state.boroughTrendsResults)
      // this.state.boroughSummaryResults.forEach(element => this.state.boroughlabels.push(element.Borough))
      // this.state.boroughSummaryResults.forEach(element => this.state.rentdata.push(element.Average_Rent))
      // this.state.boroughSummaryResults.forEach(element => this.state.crimedata.push(element.Crime_Count))
    })
    
  }

  boroughOnChange(value) {

    getBoroughTrends(value).then(res => {
      this.setState({ boroughTrendsResults: res.results })
    })
  }


  render() {

    return (

      <div>
      <MenuBar />
      
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>

        <h4>Borough Trends</h4>

      <div style={{ marginBottom: '2vh' }}>
        <Select defaultValue={'Bronx'} style={{ width: 140 }} onChange={this.boroughOnChange}>
            <Option value={'Bronx'}>Bronx</Option>
            <Option value={'Brooklyn'}>Brooklyn</Option>
            <Option value={'Manhattan'}>Manhattan</Option>
            <Option value={'Queens'}>Queens</Option>
            <Option value={'Staten Island'}>Staten Island</Option>
        </Select>
        </div>
    </div>


    <div style={{ width: '45vw', float: 'left', margin: '0 auto', marginTop: '2vh', marginLeft: '5vh'}}>

      <h4 style={{textAlign: 'center'}}>Rent Over Time</h4>

      <ResponsiveContainer width='100%' aspect={2.5}>
        <LineChart
          width={500}
          height={300}
          data={this.state.boroughTrendsResults}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='Year' />
          <YAxis domain={[1200, 3700]}/>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)}/>
          <Line dataKey='Average_Rent' name='Average Rent' fill='#007bff' />
        </LineChart>
      </ResponsiveContainer>

    </div>


    <div style={{ width: '45vw', float: 'right', margin: '0 auto', marginTop: '2vh', marginRight: '5vh'}}>

      <h4 style={{textAlign: 'center'}}>Crime Count</h4>

      <ResponsiveContainer width='100%' aspect={2.5}>
        <LineChart
          width={500}
          height={300}
          data={this.state.boroughTrendsResults}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='Year' />
          <YAxis domain={[10000, 150000]}/>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Line dataKey='Crime_Count' name='Crime Count' fill='#007bff' />
        </LineChart>
      </ResponsiveContainer>

      {/* <ResponsiveContainer width='100%' aspect={2.5}>
        <BarChart
          width={500}
          height={300}
          data={this.state.boroughSummaryResults}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='Borough' />
          <YAxis domain={[0, 145000]}/>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Bar dataKey='Crime_Count' name='Crime Count' fill='#007bff' />
        </BarChart>
      </ResponsiveContainer> */}

    </div>

  </div>

    )
  }

}

export default BoroughTrendsPage