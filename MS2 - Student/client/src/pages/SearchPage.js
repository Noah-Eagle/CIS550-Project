import React from 'react';
import {
  Table,
  Select,
  Divider,
  Row,
  Col
} from 'antd';
import MenuBar from '../components/MenuBar';
import { getSearchName } from '../fetcher';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { Button } from "shards-react";
import { Form, FormInput, FormGroup, Card, CardBody, CardTitle, Progress } from "shards-react";

const { Option } = Select;


const NeighborhoodhSummaryColumns = [
  {
    title: 'Neighborhood',
    dataIndex: 'Neighborhood',
    key: 'Neighborhood',
    sorter: (a, b) => a.Neighborhood.localeCompare(b.Neighborhood)
  },
  {
    title: 'Number Of Zip Codes',
    dataIndex: 'NumZipCodes',
    key: 'NumZipCodes',
    sorter: (a, b) => a.NumZipCodes - b.NumZipCodes
  }
];

class SearchPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nameQuery: '',
      neighborhoodResults: []
    }
    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.handleNameQueryChange = this.handleNameQueryChange.bind(this)

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
    getSearchName(this.state.nameQuery).then(res => {
      this.setState({ neighborhoodResults: res.results })
  })

  }


  render() {
    return (

      <div>

          <MenuBar />
          <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
              <Row>
                  <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                      <label>Name</label>
                      <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                  </FormGroup></Col>
                  <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                      <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                  </FormGroup></Col>
              </Row>
              <br></br>     
          </Form>
          <Divider />
          {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */}
          <Table dataSource={this.state.neighborhoodResults} columns={NeighborhoodhSummaryColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}/>
          <Divider />

          

      </div>
  )
}
}

export default SearchPage