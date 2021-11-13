import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getBoroughSummary } from '../fetcher'
const { Column, ColumnGroup } = Table;
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
  //     matchesPageNumber: 1,
  //     matchesPageSize: 10,
  //     playersResults: [],
  //     pagination: null  
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

    getBoroughSummary().then(res => {
      console.log(res.results)
      this.setState({ boroughSummaryResults: res.results })
    })
 
  }


  
  render() {

    return (

      <div>

        <MenuBar />

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>

          <h3>Borough Information</h3>

          <Table dataSource={this.state.boroughSummaryResults} columns={boroughSummaryColumns} pagination={false}/>

        </div>

      </div>
    )
  }

}



export default HomePage