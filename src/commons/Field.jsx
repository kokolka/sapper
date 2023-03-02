import React, { useState } from 'react';
import generateMines from './scripts/generateMines';
import openCell from './scripts/openCell';

let arrMine = generateMines();

const genLineForField = (idStart, handler) => {
    let result = [];

    for(let i = 0; i < 16; i++){
        result.push(idStart + i);
    }

    // создание линии поля
    return result.map(el => {
        return(
            // элемент поля
            <td id={`t${el}`} key={`td${el}`} onClick={() => {
                handler(el);
            }}>
                {/* <img src="" alt={`img${el}`}/> */}
                {arrMine[el]==1?'@':' '}
            </td>
        )
    })
}
const genMineField = (handler) => {
    let result = [];

    for(let i = 0; i < 16; i++){
        result.push(i);
    }

    return result.map(el => {
        return(
            <tr key={`tr${el}`}>
                {genLineForField(el * 16, handler)}
            </tr>
        )
    })
}

const Field = (props) => {
    let s = {};

    const clearArea = (id) => {
        s = openCell(id, arrMine);
        changeElem();
    }

    const changeElem = () => { //функция для перерисовки элементов
        for(let key in s){
            let id = `#t${key}`;
            let elem = document.querySelector(id);
            // console.log(elem);
            elem.innerHTML = s[key];
        }
    }
    
    let field = genMineField(clearArea); //создание поля



    return(
        <div>
            <table>
                {field}
            </table>
        </div>
    )
}

export default Field;