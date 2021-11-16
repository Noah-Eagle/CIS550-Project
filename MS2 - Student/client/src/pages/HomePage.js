import React from 'react';
import {
  Table,
  Select
} from 'antd';
import MenuBar from '../components/MenuBar';
import { getBoroughSummary } from '../fetcher';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { Button } from "shards-react";

const { Option } = Select;


const boroughSummaryColumns = [
  {
    title: 'Borough',
    dataIndex: 'Borough',
    key: 'Borough',
    sorter: (a, b) => a.Borough.localeCompare(b.Borough),
    // render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
  },
  {
    title: 'Average Rent',
    dataIndex: 'Average_Rent',
    key: 'Average_Rent',
    sorter: (a, b) => a.Average_Rent - b.Average_Rent
    // Cell: props => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(props.value)
  },
  {
    title: 'Crime Count',
    dataIndex: 'Crime_Count',
    key: 'Crime_Count',
    sorter: (a, b) => a.Crime_Count - b.Crime_Count
    
  }
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      boroughSummaryResults: [],
      // boroughlabels: [],
      // rentdata: [],
      // crimedata: []
  //     matchesPageNumber: 1,
  //     matchesPageSize: 10,
  //     playersResults: [],
  //     pagination: null  
    }

    this.yearOnChange = this.yearOnChange.bind(this)

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

    getBoroughSummary(2020).then(res => {
      this.setState({ boroughSummaryResults: res.results })

      // this.state.boroughSummaryResults.forEach(element => this.state.boroughlabels.push(element.Borough))
      // this.state.boroughSummaryResults.forEach(element => this.state.rentdata.push(element.Average_Rent))
      // this.state.boroughSummaryResults.forEach(element => this.state.crimedata.push(element.Crime_Count))
    })
    
  }

  yearOnChange(value) {

      getBoroughSummary(value).then(res => {
      this.setState({ boroughSummaryResults: res.results })
    })
  }


  render() {


    return (

      <div>
      <MenuBar />
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>

        <div style={{ marginTop: '2vh', marginBottom: '2vh' }}>

          <h4>Borough Information</h4>

        </div>
      

        <div style={{ width: '7vw', float: 'left', marginBottom: '2vh', marginTop: '0.5vh' }}>
        <Select defaultValue={2020} style={{ width: 120 }} onChange={this.yearOnChange}>
          <Option value={2020}>2020</Option>
          <Option value={2019}>2019</Option>
          <Option value={2018}>2018</Option>
          <Option value={2017}>2017</Option>
          <Option value={2016}>2016</Option>
          <Option value={2015}>2015</Option>
          <Option value={2014}>2014</Option>
          <Option value={2013}>2013</Option>
          <Option value={2012}>2012</Option>
          <Option value={2011}>2011</Option>
          <Option value={2010}>2010</Option>
        </Select>
        </div>

        <div style={{ width: '7vw', float: 'left', marginBottom: '2vh'}}>
          <Button variant="outline-primary" href="/borough-trends">View Trends</Button>
        </div>

        <Table dataSource={this.state.boroughSummaryResults} columns={boroughSummaryColumns} pagination={false}></Table>

      </div>

      

    <div style={{ width: '45vw', float: 'left', margin: '0 auto', marginTop: '2vh', marginLeft: '5vh'}}>

      <h4 style={{textAlign: 'center'}}>Average Rent</h4>

      <ResponsiveContainer width='100%' aspect={2.5}>
        <BarChart
          width={500}
          height={300}
          data={this.state.boroughSummaryResults}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='Borough' />
          <YAxis domain={[0, 3700]}/>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)}/>
          <Bar dataKey='Average_Rent' name='Average Rent' fill='#007bff' />
        </BarChart>
      </ResponsiveContainer>

    </div>


    <div style={{ width: '45vw', float: 'right', margin: '0 auto', marginTop: '2vh', marginRight: '5vh'}}>

      <h4 style={{textAlign: 'center'}}>Crime Count</h4>

      <ResponsiveContainer width='100%' aspect={2.5}>
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
      </ResponsiveContainer>

    </div>



  </div>

    )
  }

}

export default HomePage