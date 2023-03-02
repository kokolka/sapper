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
            <td id={`t${el}`} key={`td${el}`} onClick={() => {
                if (!isLoss) {
                    handlerFP(el);
                    handler(el);
                } 
            }}>
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
    let [idFirstPress, setIdFirstPress] = useState(null); //хранит id элемента, на окторый было совершено первое нажатие
    //полсе первого нажатия сгенерируем поле с минами    

    useEffect(() => {
        if (isLoss) { //если проигрышь
            let lossId = `#t${lossCell}`;
            let lossElem = document.querySelector(lossId);
            lossElem.innerHTML = 'X'; //изменить отображение элемента с взорванной миной
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
            elem.innerHTML = s[key];
        }
    }

    const handlerFirsPress = (id) => {
        if(idFirstPress == null){
            setIdFirstPress(id);
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
            <table>
                {field}
            </table>
        </div>
    )
}

export default Field;