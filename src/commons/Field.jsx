import React, { useEffect, useState } from 'react';
import generateMines from './scripts/generateMines';
import openCell from './scripts/openCell';

let arrMines = []; //массив для генерируемых мин

const genLineForField = (idStart, handler, isLoss, handlerFP) => {
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
                        if(e.target.className === 'standard'){
                            handlerFP(el);
                            handler(el);
                            e.target.className = 'clear';
                        }                        
                    } 
                }}
                onContextMenu={(e) => {
                    if(e.target.className === 'standard'){
                        e.target.className = 'flag';//установка флага
                    }else if(e.target.className === 'flag'){
                        e.target.className = 'question';//установка вопроса
                    }else if(e.target.className === 'question'){
                        e.target.className = 'standard';//возврат назад
                    }
                    e.preventDefault();//отключение контекстного меню
                }}
            >
                {' '}
            </td>
        )
    })
}
const genMineField = (handler, isLoss, handlerFP) => {
    let result = [];

    for (let i = 0; i < 16; i++) {
        result.push(i);
    }

    return result.map(el => {
        return (
            <tr key={`tr${el}`}>
                {genLineForField(el * 16, handler, isLoss, handlerFP)}
            </tr>
        )
    })
}

const Field = (props) => {
    let s = {};
    let [isLoss, setIsLoss] = useState(false);
    let [lossCell, setLossCell] = useState(null); //id мины на которую нажал игрок
    let idFirstPress; //хранит id элемента, на окторый было совершено первое нажатие
    //полсе первого нажатия сгенерируем поле с минами    

    useEffect(() => {
        if (isLoss) { //если проигрышь
            let lossId = `#t${lossCell}`;
            let lossElem = document.querySelector(lossId);
            lossElem.className = 'loos';
            lossElem.innerHTML = 'X'; //изменить отображение элемента с взорванной миной

            for (let key in arrMines){
                if(arrMines[key] === 1 && key != lossCell){
                    let mineId = `#t${key}`;
                    let lossMine = document.querySelector(mineId);
                    lossMine.className = 'mine';
                }
            }
        }
    }, lossCell)

    const clearArea = (id) => {
        s = {...s, ...openCell(id, arrMines, setIsLoss, setLossCell)};//определение какие ячейки открыт
        changeElem();
    }

    const changeElem = () => { //функция для перерисовки элементов
        for (let key in s) {
            let id = `#t${key}`; //id изменяемого элемента
            let elem = document.querySelector(id);
            elem.className = 'clear';
            elem.innerHTML = s[key] > 0? s[key]: s[key];
        }
    }

    const handlerFirsPress = (id) => {
        if(idFirstPress == undefined){
            idFirstPress = id;
            s = {[id]: 0};

            generateMinesField();
        }
    }

    const generateMinesField = () => { //генерирование мин после нажатия
        arrMines = generateMines(idFirstPress);
    }

    let field = genMineField(clearArea, isLoss, handlerFirsPress); //создание поля с минами

    return (
        <div>
            <table onContextMenu={(e) => {
                    e.preventDefault();//отключение контекстного меню
                }}>
                {field}
            </table>
        </div>
    )
}

export default Field;