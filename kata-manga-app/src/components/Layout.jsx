import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar/>
            <div>
                {this.props.children}
            </div>
        <Footer/>
      </div>
    )
  }
}

export default Layout