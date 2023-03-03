import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './commons/Header/Header';
import Field from './commons/Field/Field';

function App() {
  let [globalCounterMines, setGlobalCounterMines] = useState(40);
  let [isLoss, setIsLoss] = useState(false);
  let [isWin, setIsWin] = useState(false);

  useEffect(() => {

  }, [globalCounterMines])

  const changeCounterMine = (n, r = false) => {
    if(r === false){
      setGlobalCounterMines(globalCounterMines + n);
    }else{
      setGlobalCounterMines(40);
    }
  }

  return (
    <div className="App">
      <Header mineCount={globalCounterMines} isLoss={isLoss} setIsLoss={setIsLoss}/>
      <Field  changeCounterMine={changeCounterMine} isLoss={isLoss} setIsLoss={setIsLoss}/>
    </div>
  );
}

export default App;
