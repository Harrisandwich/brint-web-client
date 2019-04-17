import React, { Component, Fragment } from 'react'
import io from 'socket.io-client'
import Output from '../output'
import Input from '../input'
import NodeMap from '../node-map'
import Style from './terminal.module.css'

const socketUrl = 'http://localhost:5000'

class Terminal extends Component {
  constructor(props) {
    super(props)
    this.socket = io(socketUrl)  
    this.state = { 
      connected: false,
      app_state: '',
    }
  }

  onSocketConnected = () => {
    this.setState({ connected: true })
  }
  onAppStateReceived = (state) => {
    this.setState({ app_state: state })
  }
  render() {
    return (
      <div className={Style.terminal}>
      {this.socket && (
        <Fragment>
          <NodeMap />
          <Output
            socket={this.socket}
            onSocketConnected={this.onSocketConnected}
          />
          <Input
            socket={this.socket}
            onAppStateReceived={this.onAppStateReceived}
          />
        </Fragment>
      )}
      </div>
    )
  }
}

export default Terminal
