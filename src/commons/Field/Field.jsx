import React, { useEffect, useState } from 'react';
import generateMines from '../scripts/generateMines';
import openCell from '../scripts/openCell';

let arrMines = []; //массив для генерируемых мин


const genLineForField = (idStart, handler, isLoss, handlerFP, setGlobalCounterMines, globalCounterMines, isWin) => {
    let result = [];

    for (let i = 0; i < 16; i++) {
        result.push(idStart + i);
    }

    // создание линии поля
    return result.map(el => {
        return (
            // элемент поля
            <td id={`t${el}`} key={`td${el}`} className='standard'
                onClick={(e) => {
                    if (!isLoss && !isWin) {
                        if (e.target.className === 'standard') {
                            handlerFP(el);
                            handler(el);
                        }
                    }
                }}
                onContextMenu={(e) => {
                    if(isWin === false){ //когда инрок выйграет события станут недоступны
                        if (e.target.className === 'standard' && globalCounterMines > 0) {
                            e.target.className = 'flag';//установка флага
                            setGlobalCounterMines(globalCounterMines-1);
                        } else if (e.target.className === 'flag' && globalCounterMines < 40) {
                            e.target.className = 'question';//установка вопроса
                            setGlobalCounterMines(globalCounterMines+1);
                        } else if (e.target.className === 'question') {
                            e.target.className = 'standard';//возврат назад
                        }
                    }                    
                    e.preventDefault();//отключение контекстного меню
                }}
                onMouseDown={() => {
                    if(isWin === false){
                        let resetButton = document.querySelector('#resetButton')
                        resetButton.className = 'o-smile';
                    }                    
                }}
                onMouseUp={() => {
                    if(isWin === false){
                        let resetButton = document.querySelector('#resetButton')
                        resetButton.className = 'normal-smile';
                    }                    
                }}
            >
            </td>
        )
    })
}
const genMineField = (handler, isLoss, handlerFP, setGlobalCounterMines, globalCounterMines, isWin) => {
    let result = [];

    for (let i = 0; i < 16; i++) {
        result.push(i);
    }

    return result.map(el => {
        return (
            <tr key={`tr${el}`}>
                {genLineForField(el * 16, handler, isLoss, handlerFP, setGlobalCounterMines, globalCounterMines, isWin)}
            </tr>
        )
    })
}

const Field = (props) => {
    let s = {};
    let [lossCell, setLossCell] = useState(null); //id мины на которую нажал игрок
    let [lengthS, setLengthS] = useState(0)
    let idFirstPress; //хранит id элемента, на окторый было совершено первое нажатие
    //полсе первого нажатия сгенерируем поле с минами    

    useEffect(() => {
        if (props.isLoss) { //если проигрышь
            let lossId = `#t${lossCell}`;
            let lossElem = document.querySelector(lossId);
            lossElem.className = 'loos';

            for (let key in arrMines) {
                if (arrMines[key] === 1 && key != lossCell) {
                    let mineId = `#t${key}`;
                    let lossMine = document.querySelector(mineId);
                    lossMine.className = 'mine';
                }
            }
        }
    }, [lossCell, props.isLoss])

    useEffect(() => {
        if(lengthS === 216){//все ячейки открыты, кроме ячеек с минами
            props.setIsWin(true);
        }
    }, [lengthS])

    useEffect(() => {}, [props.isWin])

    const clearArea = (id) => {
        s = { ...s, ...openCell(id, arrMines, props.setIsLoss, setLossCell) };//определение какие ячейки открыт
        setLengthS(Object.keys(s).length)
        changeElem();
    }

    const changeElem = () => { //функция для перерисовки элементов
        for (let key in s) {
            let id = `#t${key}`; //id изменяемого элемента
            let elem = document.querySelector(id);
            if (s[key] > 0) {
                let classNameMines = `mine-${s[key]}`;
                elem.className = classNameMines;
            } else {
                elem.className = 'clear';
            }
        }
    }

    const handlerFirsPress = (id) => {
        if (idFirstPress == undefined) {
            idFirstPress = id;
            s = { [id]: 0 };

            arrMines = generateMines(idFirstPress);//генерирование мин после нажатия
        }
    }

    let field = genMineField(
            clearArea, props.isLoss, handlerFirsPress, 
            props.setGlobalCounterMines, props.globalCounterMines, 
            props.isWin
    ); //создание поля с минами

    return (
        <div className='field-box'>
            <table onContextMenu={(e) => {
                e.preventDefault();//отключение контекстного меню
            }} >
                {field}
            </table>
        </div>
    )
}

export default Field;