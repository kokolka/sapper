import React, { useEffect, useState } from 'react';
import generateMines from '../scripts/generateMines';
import openCell from '../scripts/openCell';

let arrMines = []; //массив для генерируемых мин


const genLineForField = (idStart, handler, isLoss, handlerFP, changeCounterMine) => {
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
                    if (!isLoss) {
                        if (e.target.className === 'standard') {
                            handlerFP(el);
                            handler(el);
                        }
                    }
                }}
                onContextMenu={(e) => {
                    if (e.target.className === 'standard') {
                        e.target.className = 'flag';//установка флага
                        changeCounterMine(-1);
                    } else if (e.target.className === 'flag') {
                        e.target.className = 'question';//установка вопроса
                        changeCounterMine(+1);
                    } else if (e.target.className === 'question') {
                        e.target.className = 'standard';//возврат назад
                    }
                    e.preventDefault();//отключение контекстного меню
                }}
            >
            </td>
        )
    })
}
const genMineField = (handler, isLoss, handlerFP, changeCounterMine) => {
    let result = [];

    for (let i = 0; i < 16; i++) {
        result.push(i);
    }

    return result.map(el => {
        return (
            <tr key={`tr${el}`}>
                {genLineForField(el * 16, handler, isLoss, handlerFP, changeCounterMine)}
            </tr>
        )
    })
}

const Field = (props) => {
    let s = {};
    let [lossCell, setLossCell] = useState(null); //id мины на которую нажал игрок
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

    const clearArea = (id) => {
        s = { ...s, ...openCell(id, arrMines, props.setIsLoss, setLossCell) };//определение какие ячейки открыт
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

    let field = genMineField(clearArea, props.isLoss, handlerFirsPress, props.changeCounterMine); //создание поля с минами

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