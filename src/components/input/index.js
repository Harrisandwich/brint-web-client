import React, { Component } from 'react'
import { List, ListItem } from '@material-ui/core'
import parseCommand from '../../helpers/parse-command'
import InputBox from './input-box'
import Prompt from './prompt'
import Style from './input.module.css'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      promptText: '',
      promptColor: '',
      inputText: '',
      inputTextColor: '',
      commandLog: [],
      lastPress: '',
    }
  }
  componentDidMount() {
    const { socket, onAppStateReceived } = this.props

    socket.on('set-appstate', (resp) => {
      onAppStateReceived(resp.state)
      this.setState({ promptText: resp.prompt })
    })
  }
  onInputChanged = (event) => {
    this.setState({ inputText: event.target.value })
  }
  onKeyPressed = (data) => {
    const { socket } = this.props
    const { commandLog, inputText } = this.state
    if (data.key === 'Enter') {
      const command = parseCommand(inputText)
      if (command) {
        this.setState({ inputText: '', commandLog: [...commandLog, inputText] }, () => {
          socket.emit('command', command)
        })
      }
    }
  }
  onKeyDown = (data) => {
    const { commandLog, inputText } = this.state
    if ((data.key === 'ArrowDown'
    || data.key === 'ArrowUp')
    && commandLog.length !== 0) {
      let newLastPress = 'none'
      let dir = 0
      switch (data.key) {
        case 'ArrowUp':
          newLastPress = data.key
          dir = 1
          break
        case 'ArrowDown':
          newLastPress = data.key
          dir = -1
          break
        default:
          newLastPress = 'none'
      }
      let thisCommandIndex = commandLog.findIndex(c => c === inputText)
      let nextIndex = thisCommandIndex + dir
      if (nextIndex > commandLog.length - 1){
        nextIndex = commandLog.length - 1
      }
      const newInputText = nextIndex !== -1 ? commandLog[nextIndex] : ''
      this.setState({ lastPress: newLastPress, inputText: newInputText })
    }
  }
  render() {
    const { inputText, promptText } = this.state
    return (
      <List className={Style.inputContainer}>
        <ListItem>
          <Prompt text={promptText} />
          <InputBox
            text={inputText}
            onKeyPress={this.onKeyPressed}
            onKeyDown={this.onKeyDown}
            onChange={this.onInputChanged}
          />
        </ListItem>
      </List>
    )
  }
}

export default Input
