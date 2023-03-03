import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './commons/Header/Header';
import Field from './commons/Field/Field';

function App(props) {
  let [globalCounterMines, setGlobalCounterMines] = useState(40);
  let [isLoss, setIsLoss] = useState(false);
  let [isWin, setIsWin] = useState(false);

  useEffect(() => {

  }, [globalCounterMines])

  return (
    <div className="App">
      <Header 
        mineCount={globalCounterMines} isLoss={isLoss}
        setIsLoss={setIsLoss} isWin={isWin} globalCounterMines={globalCounterMines}
      />
      <Field 
        globalCounterMines={globalCounterMines} setGlobalCounterMines={setGlobalCounterMines} 
        isLoss={isLoss} setIsLoss={setIsLoss} setIsWin={setIsWin} isWin={isWin}
      />
    </div>
  );
}

export default App;
