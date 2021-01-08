import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { fetchModule, deleteModule } from './redux/modulesSlice'
import selectAllModules from './redux/modulesSlice'
import { useSelector, useDispatch } from 'react-redux'




function App() {


  const dispatch = useDispatch()

  const test = useSelector ((state) => state.modules.modules)

  const [input, setInput] = useState('')
  const status = useSelector ((state) => state.modules.status)
  const onTextChange = e => setInput(e.target.value)

  const submitModule = async () => {
    dispatch(fetchModule(input))
  }


  const deleteModule = async () => {
    console.log('test')
    dispatch(deleteModule("CS1101S"))
  }
  
  let modules
  if (status === 'succeeded' && typeof test !== 'undefined') {
     modules = test.map(item => {
      console.log('test')
      return (
        <div key = {item.moduleCode}>
          <p>{item.moduleCode}</p>
          <button value = {item.moduleCode} onClick = {deleteModule} />
        </div>
      )
    })
  }

  return (
    <div className="App">
      <input onChange = {onTextChange}/>
      <button type="submit" onClick = {submitModule}>Submit</button>
      {modules}
    </div>
  );
}

export default App;
