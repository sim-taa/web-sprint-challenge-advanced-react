import React from 'react'
const url = 'http://localhost:9000/api/result';
import axios from 'axios';

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    message:"",
    matrix: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]],
    email:'',
  };

  left = () => {
    if(this.state.x ===1) {
      this.setState({ ...this.state, message:`You can't go left`})
    }
    else
    {
      const newMatrix = [...this.state.matrix];
      newMatrix[this.state.y - 1][this.state.x - 1] = 0;
      newMatrix[this.state.y - 1][this.state.x - 2] = 1;
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        message:"",
        x: this.state.x - 1,
        matrix: [...newMatrix],
      })
    }
  }

  right = () => {
    if(this.state.x ===3) {
      this.setState({ ...this.state, message:`You can't go right`})
    }
    else
    {
      const newMatrix = [...this.state.matrix];
      newMatrix[this.state.y - 1][this.state.x - 1] = 0;
      newMatrix[this.state.y - 1][this.state.x] = 1;
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: this.state.x + 1,
        message:"",
        matrix: [...newMatrix],
      })
    }
  }

  up  = () => {
    if(this.state.y === 1){
      this.setState({ ...this.state, message:`You can't go up`})
    }
    else
    {
      const newMatrix= [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x - 1 ] = 0
      newMatrix[this.state.y - 2][this.state.x - 1] = 1
      this.setState({
        ...this.state,
        steps: this.state.steps + 1, 
        y: this.state.y - 1, 
        message:"", 
        matrix:[...newMatrix], 
      })      
    };    
  }

  down  = () => {
    if(this.state.y === 3){
      this.setState({ ...this.state, message:`You can't go down`})
    }
    else
    {
      const newMatrix= [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x -1 ] = 0
      newMatrix[this.state.y][this.state.x - 1] = 1
      this.setState({
        ...this.state,
        steps: this.state.steps + 1, 
        y: this.state.y + 1, 
        message:"", 
        matrix:[...newMatrix], 
      })      
    }    
  }

  reset  = () => {
      this.setState({
        steps: 0, 
        y: 2, 
        x: 2,
        message:"",
        matrix: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0]],
        email:'', 
      })      
    }    

    changeInput = (evt) => {
      const {value} = evt.target;
      this.setState({
        ...this.state,
        email: value,
      });
    };

    onSubmit = (evt)=>  {
      evt.preventDefault()
      axios.post(
        url,
        {...this.state, email: this.state.email})
      .then(
        (res)=>{this.setState({
          ...this.state, message: res.data.message
        })})
      .catch((error)=>
      {this.setState({
          ...this.state, 
          message:error.response.data.message
        })}
      )
      this.setState({ ...this.state, email:''});
    }

  render() {
    const { x, y, matrix, steps, message, email } = this.state;
    const { className } = this.props;

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {this.state.matrix.flatMap((x) => x)
          .map((spot, idx) => {
            return (
              <div key = {idx}
              className={`square${spot ? ' active' : '' }`}>
              {spot ? 'B' : ''}
              </div>
            );
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.left}>LEFT</button>
          <button id="up" onClick={this.up}>UP</button>
          <button id="right" onClick={this.right}>RIGHT</button>
          <button id="down" onClick={this.down}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
          <form onSubmit = {this.onSubmit}>
          <input onChange = {this.changeInput}
            value = {email}
            id= 'email'
            type= 'email'
            placeholder= 'type email'></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
