import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
// import Spinner from "./animations/Spinner"



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
    data: null
  }

  async setRows () {
    this.setState({ rows: this.state.data });
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
              <div>Loading</div>
            ) : (
                <DataGrid
                  rows={this.state.rows}
                  columns={this.state.columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 15, 20, 25]}
                  // checkboxSelection
                />
            )}
      </Container>
    );
  }
  
}

