import React from 'react'
const url = 'http://localhost:9000/api/result';

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    matrix: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]],
    email: '',
    message: ''
  };

  left = () => {
    if(this.state.x ===1) {
      this.setState({...this.state, message: `You can't go left`})
    }
    else
    {
      const newMatrix = [...this.state.matrix];
      newMatrix[this.state.y - 1][this.state.x - 1] = 0;
      newMatrix[this.state.y - 1][this.state.x - 2] = 1;
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: this.state.x - 1,
        matrix: [...newMatrix],
        message:'',
      })
    }
  }

  right = () => {
    if(this.state.x ===3) {
      this.setState({...this.state, message: `You can't go right`})
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
        matrix: [...newMatrix],
        message:'',
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
        matrix:[...newMatrix],
        message:'',  
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
        matrix:[...newMatrix],
        message:'',  
      })      
    }    
  }

  reset  = () => {
      this.setState({
        ...this.state,
        steps: 0, 
        y: 2, 
        x: 2,
        matrix: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0]],
        email: '',
        message: '' 
      })      
    }    

  render() {
    const { x, y, matrix, steps,  message, email } = this.state;
    const { className } = this.props;

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
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
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.left}>LEFT</button>
          <button id="up" onClick={this.up}>UP</button>
          <button id="right" onClick={this.right}>RIGHT</button>
          <button id="down" onClick={this.down}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
