import React from 'react';
import {
  Table,
  Select,
  Divider,
  Row,
  Col
} from 'antd';
import MenuBar from '../components/MenuBar';
import { getSearchName, getNeighborhood, getNeighborhoodRank } from '../fetcher';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "shards-react";
import { Form, FormInput, FormGroup, Card, CardBody, CardTitle, Progress } from "shards-react";
var moment = require('moment'); // require
moment().format(); 


const { Option } = Select;


const NeighborhoodhSummaryColumns = [
  {
    title: 'Neighborhood',
    dataIndex: 'Neighborhood',
    key: 'Neighborhood',
    sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood),
    render: (text, row) => <a href={`/search?id=${row.Neighborhood}`}>{text}</a>
  },
  {
    title: 'Number Of Zip Codes',
    dataIndex: 'NumZipCodes',
    key: 'NumZipCodes',
    sorter: (a, b) => a.NumZipCodes - b.NumZipCodes
  },
  {
    title: 'Zip Codes',
    dataIndex: 'ZipCodes',
    key: 'ZipCodes',
    sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood),
  }
];


const SelectedSummaryColumns = [
  {
    title: 'Neighborhood',
    dataIndex: 'Neighborhood',
    key: 'Neighborhood',
    sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood)
  },
  {
    title: 'Month',
    dataIndex: 'Month',
    key: 'Month',
    sorter: (a, b) => a.Month - b.Month
  },
  {
    title: 'Year',
    dataIndex: 'Year',
    key: 'Year',
    sorter: (a, b) => a.Year - b.Year
  },
  {
    title: 'Average Rent',
    dataIndex: 'AvgRent',
    key: 'AvgRent',
    sorter: (a, b) => a.AvgRent - b.AvgRent
  }
];

const RankColumns = [
  {
    title: 'Neighborhood',
    dataIndex: 'Neighborhood',
    key: 'Neighborhood'
  },
  {
    title: 'Overall Crime Rank In Borough',
    dataIndex: 'TRank',
    key: 'TRank'
  },
  {
    title: 'Felony Rank In Borough',
    dataIndex: 'FRank',
    key: 'FRank'
  },
  {
    title: 'Misdemeanor Rank In Borough',
    dataIndex: 'MRank',
    key: 'MRank'
  },
  {
    title: 'Rent Rank In Borough',
    dataIndex: 'RentRank',
    key: 'RentRank'
  },
  {
    title: 'Most Common Felony',
    dataIndex: 'FMOST',
    key: 'FMOST'
  },
  {
    title: 'Most Common Misdemeanor',
    dataIndex: 'MMOST',
    key: 'MMOST',
  }
];

class SearchPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nameQuery: '',
      neighborhoodResults: [],
      selectedNeighborhoodId: window.location.search ? window.location.search.substring(1).split('=')[1] : null,
      selectedNeighborhoodDetails: [],
      selectedNeighborhoodRanks : []
    }
    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
    // this.handleSelectedChange = this.handleSelectedChange.bind(this)
    // this.updateSelectedhResults = this.updateSelectedhResults.bind(this)

  }

getMax(data)
{
  var max = 0
  if (data)
  {
    for (var i = 0; i < data.length; i++)
    {
      max = Math.max(data[i]['AvgRent'], max)
    }
  }
  console.log(data)
  console.log(max)
  return max
}

handleNameQueryChange(event) {
  this.setState({ nameQuery: event.target.value })
}

updateSearchResults() {
  getSearchName(this.state.nameQuery).then(res => {
      this.setState({ neighborhoodResults: res.results })
  })

}

componentDidMount() {
  console.log("Neghborhood id is: ");
  console.log(this.state.selectedNeighborhoodId)
  getSearchName(this.state.nameQuery).then(res => {
    this.setState({ neighborhoodResults: res.results })
})
  if (this.state.selectedNeighborhoodId)
  {
    getNeighborhoodRank(this.state.selectedNeighborhoodId).then(res =>{
      this.setState({selectedNeighborhoodRanks: res.results})
    })
    getNeighborhood(this.state.selectedNeighborhoodId).then(res =>{
      this.setState({ selectedNeighborhoodDetails: res.results})  
    })
  }
}

  render() {
    return (
    <div style={{ paddingBottom: '4vh' }}>
      <div>
          <MenuBar />

          <img src="/images/dumbo.jpeg" style = {{ width: '100vw' }}/>
          <h4 style = {{fontSize: '40px', marginTop: '5vh', marginBottotm: '1vh', textAlign: 'center' }}>Neighborhood Search</h4>

          <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
              <Row>
                  <Col><FormGroup style={{ width: '20vw', margin: '0 auto' }}>

                      <FormInput style={{ marginTop: '2vh' }} placeholder="Search by Neighborhood, Zip Code, or Borough" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                  </FormGroup></Col>
                  <Col><FormGroup style={{ width: '10vw' }}>
                      <Button style={{ marginTop: '2vh', marginLeft: '3vw' }} onClick={this.updateSearchResults}>Search</Button>
                  </FormGroup></Col>
              </Row>
              <br></br>     
          </Form>
          <Divider />
          <Table dataSource={this.state.neighborhoodResults} columns={NeighborhoodhSummaryColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '4vh' }}/>
          <Divider />
          <div>
          {/* <Table dataSource={this.state.selectedNeighborhoodDetails} columns={SelectedSummaryColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}/> */}
          
          </div>
          <div style={{margin: '0 auto', marginTop: '2vh', marginBottom: '2vh', marginLeft: '5vh'}}>
<div>
  <h4 style={{ textAlign: 'center', marginTop: '3vh', marginBottom: '3vh' }}>Neighborhood Rankings </h4>
  <h6 style={{ textAlign: 'center' }}>1 = highest number of crimes / most expensive rents</h6>
  <Table dataSource={this.state.selectedNeighborhoodRanks} columns={RankColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '4vh', marginBottom: '2vh' }}/>
</div>

<h4 style={{textAlign: 'center', marginBottom: '1vh' }}>{this.state.selectedNeighborhoodId ? decodeURI(this.state.selectedNeighborhoodId) : ""}</h4>
<h4 style={{textAlign: 'center', marginBottom: '3vh' }}>Rent and Crime Over Time </h4>
<ResponsiveContainer width='100%' aspect={2.5}>
  <LineChart
    width={500}
    height={300}
    data={this.state.selectedNeighborhoodDetails}
  >
    <CartesianGrid strokeDasharray='3 3' />
    <XAxis dataKey="date" name= "Date"  tickFormatter = {(value) => moment.utc(value).format("MM/YY")}/>
    <YAxis yAxisId="left" domain={[0, 'dataMax + 100']} />
    <YAxis yAxisId="right" orientation="right" domain={[0, this.getMax(this.state.selectedNeighborhoodDetails) + 100]} />
    <Legend wrapperStyle={{ position: 'relative' }}/>
    <Tooltip formatter={(value, name) => (name == "Average Rent") ? new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value): (name == "Date") ? moment.utc(value).format("MM/YY"): value  }/>
    <Line yAxisId="left" dataKey='AvgRent' name='Average Rent' stroke='#007bff' connectNulls={true}/>
    <Line yAxisId="right" dataKey='Crime_Count' name='Crime Count' stroke='#FF0000' connectNulls={true} />
  </LineChart>
</ResponsiveContainer>

</div>
          {/* {this.state.selectedNeighborhoodDetails ? <div style={{ width: '45vw', float: 'left', margin: '0 auto', marginTop: '2vh', marginLeft: '5vh'}}> */}
            {/* <h4 style={{textAlign: 'center'}}>Rent Over Time</h4>
            <ResponsiveContainer width='100%' aspect={2.5}>
              <LineChart
                width={500}
                height={300}
                data={this.state.boroughTrendsResults}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Year' />
                <YAxis domain={[1200, 3700]}/>
                <Tooltip formatter={(value) => new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)}/>
                <Line dataKey='Average_Rent' name='Average Rent' fill='#007bff' />
              </LineChart>
            </ResponsiveContainer> */}
             {/* <Table dataSource={this.state.selectedNeighborhoodDetails} columns={SelectedSummaryColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}/> */}
            {/* </div> : null} */}
        
        </div>
  </div>
  )
}
}

export default SearchPage