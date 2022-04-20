import React, {useState} from 'react'
import axios from 'axios';

const url = 'http://localhost:9000/api/result';

export default function AppFunctional(props) {
  const [state, setState] = useState({
      x: 2,
      y: 2,
      steps: 0,
      message:"",
      matrix: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]],
      email:'',
      });
    
      const left = () => {
        if(state.x ===1) {
          setState({ ...state, message:`You can't go left`})
        }
        else
        {
          const newMatrix = [...state.matrix];
          newMatrix[state.y - 1][state.x - 1] = 0;
          newMatrix[state.y - 1][state.x - 2] = 1;
          setState({
            ...state,
            steps: state.steps + 1,
            message:"",
            x: state.x - 1,
            matrix: [...newMatrix],
          })
        }
      }
    
      const right = () => {
        if(state.x ===3) {
          setState({ ...state, message:`You can't go right`})
        }
        else
        {
          const newMatrix = [...state.matrix];
          newMatrix[state.y - 1][state.x - 1] = 0;
          newMatrix[state.y - 1][state.x] = 1;
          setState({
            ...state,
            steps: state.steps + 1,
            x: state.x + 1,
            message:"",
            matrix: [...newMatrix],
          })
        }
      }
    
      const up  = () => {
        if(state.y === 1){
          setState({ ...state, message:`You can't go up`})
        }
        else
        {
          const newMatrix= [...state.matrix]
          newMatrix[state.y - 1][state.x - 1 ] = 0
          newMatrix[state.y - 2][state.x - 1] = 1
          setState({
            ...state,
            steps: state.steps + 1, 
            y: state.y - 1, 
            message:"", 
            matrix:[...newMatrix], 
          })      
        };    
      }
    
      const down  = () => {
        if(state.y === 3){
          setState({ ...state, message:`You can't go down`})
        }
        else
        {
          const newMatrix= [...state.matrix]
          newMatrix[state.y - 1][state.x -1 ] = 0
          newMatrix[state.y][state.x - 1] = 1
          setState({
            ...state,
            steps: state.steps + 1, 
            y: state.y + 1, 
            message:"", 
            matrix:[...newMatrix], 
          })      
        }    
      }
    
      const reset  = () => {
          setState({
            ...state,
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
    
        const changeInput = (evt) => {
          const {value} = evt.target;
          setState({
            ...state,
            email: value,
          });
        };
    
        const onSubmit = (evt)=>  {
          evt.preventDefault()
          axios.post(
            url,
            {...state, email: state.email})
          .then(
            (res)=>{setState({
              ...state, message: res.data.message, email:'',
            })})
          .catch((error)=>
          {setState({
              ...state, 
              message:error.response.data.message
            })}
          )
          setState({ ...state, email:''});
        }
    
      // render() {
      //   const { x, y, matrix, steps, message, email } = state;
      //   const { className } = props;
    
        return (
          <div id="wrapper" className={props.className}>
            <div className="info">
              <h3 id="coordinates">Coordinates ({state.x}, {state.y})</h3>
              <h3 id="steps">You moved {state.steps} {state.steps === 1 ? 'time' : 'times'}</h3>
            </div>
            <div id="grid">
              {state.matrix.flatMap((x) => x)
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
              <h3 id="message">{state.message}</h3>
            </div>
            <div id="keypad">
        <button onClick={left} id="left">LEFT</button>
        <button onClick={up} id="up">UP</button>
        <button onClick={right} id="right">RIGHT</button>
        <button onClick={down} id="down">DOWN</button>
        <button onClick={reset}id="reset">reset</button>
          </div>
              <form onSubmit = {onSubmit}>
              <input onChange = {changeInput}
                value = {email}
                id= 'email'
                type= 'email'
                placeholder= 'type email'></input>
              <input id="submit" type="submit"></input>
            </form>
          </div>
        )
      }
