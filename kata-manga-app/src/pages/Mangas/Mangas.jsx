import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
// import Spinner from "./animations/Spinner"
import { withRouter } from 'react-router-dom'



const Mouseover = styled.div`
    cursor: pointer;
`


const Container = styled.div`
  width: 100%;
  height: 400px;
  width: 750px;
`
export default class Mangas extends React.Component {
  state = {
    columns: null,
    rows: null,
    loading: true,
    data: null,
    params: undefined
  }

  async setRows () {
    let finaldata = this.state.data.filter((element) => {
            let filter = this.state.params
            if (!filter) return true;
            let title = element.title.toLowerCase();
            // console.log(element.title);
            return title.startsWith(filter.toLowerCase());
          })
          console.log(this.state.params);
          this.setState({ rows: finaldata });
  }
  async setColumns () {
    let dataStateArray = Object.keys(this.state.data[0])
    let columns = dataStateArray.map((element) => {
      return { field: element, headerName: element };
    })
    console.log(columns);
    this.setState({ columns:columns });
  }
  async setData () {
    await this.setColumns()
    await this.setRows()
  }
  async componentDidMount(){
      const test = new URLSearchParams(window.location.search)
      test.set( "filter", "filter" )
      const params = new URLSearchParams("toto");
      // const q = parseInt(params.get("toto")); // is the number 123

      const queryString = window.location.search;
      console.log(queryString);
      const urlParams = new URLSearchParams(queryString).get("toto");
      // const toto = urlParams
      console.log(urlParams);

      let arresults = []
      for (let i = 1; i <= 100; i++) {
        const res = await (await fetch(`http://localhost:3004/manga/${i}`)).json()
        arresults.push(res)
      }

      const data = arresults.map(x => x[0])
      this.setState({ data: data });
      await this.setData();
      this.setState({ data: data, loading: false });
  }

  render(){
    return (
      <Container>
            {this.state.loading ? (
              <div>Loading {new URLSearchParams(window.location.search).get("toto")}</div>
            ) : (
              <div style={{ height: 300, width: '100%' }}>
                <input
                  value={this.state.params}
                  onChange={(event) => {
                    let filter = event.target.value;
                    if (filter) {
                      console.log(filter);
                      this.setState({params: filter});
                      this.setRows()
                    } else {
                      this.setState({params: ""});
                      this.setRows()
                    }
                  }}
                />
                <DataGrid
                  rows={this.state.data.filter((element) => {
                    let filter = this.state.params
                    if (!filter) return true;
                    let title = element.title.toLowerCase();
                    // console.log(element.title);
                    return title.includes(filter.toLowerCase());
                  })}
                  columns={this.state.columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 15, 20, 25]}
                  // checkboxSelection
                />
              </div>
            )}
      </Container>
    );
  }
  
}

