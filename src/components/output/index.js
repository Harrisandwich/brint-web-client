import React, { Component } from 'react'
import { List, ListItem } from '@material-ui/core'
import Style from './output.module.css'
import { isArray } from 'util';

class Output extends Component {
  constructor(props) {
    super(props)

    this.state = {
      prompt: {},
      messages: []
    }
  }

  componentDidMount() {
    const { socket, onSocketConnected } = this.props

    socket.on('connect', () => {
      onSocketConnected()
      this.addMessageToList('Connection established')
    })
    socket.on('command-response', (resp) => {
      this.addMessageToList(resp.output)
    })
    socket.on('message', (resp) => {
      this.addMessageToList(resp.output)
    })
    socket.on('error', (resp) => {
      this.addMessageToList(resp.output)
    })
    socket.on('notification', (resp) => {
      this.addMessageToList(resp.output)
    })   
  }
  addMessageToList = (msg) => {
    const { messages } = this.state
    const newMsgs = [...messages ]
    if (isArray(msg)) {
      msg.forEach(m => newMsgs.push(m))
    } else {
      newMsgs.push(msg)
    }
    
    this.setState({ messages: newMsgs })
  }
  render() {
    const { messages } = this.state
    return (
      <div className={Style.outputContainer}>
        <List dense>
          {messages.map((msg, i) => {
            if (msg === '\n') {
              return (<br key={i} />)
            } else {
              return (<ListItem key={i} className={Style.line}><code>{msg}</code></ListItem>)
            }
          })}
        </List>
      </div>
    )
  }
}

export default Output
