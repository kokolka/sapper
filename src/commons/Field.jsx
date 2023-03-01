import React from 'react';

const genLineForField = (idStart) => {
    let result = [];

    for(let i = 0; i < 16; i++){
        result.push(idStart + i);
    }

    // создание линии поля
    return result.map(el => {
        return(
            // элемент поля
            <td id={el} key={`td${el}`}>
                <img src="" alt={`img${el}`}/>
            </td>
        )
    })
}
const genMineField = () => {
    let result = [];

    for(let i = 0; i < 16; i++){
        result.push(i);
    }

    return result.map(el => {
        return(
            <tr key={`tr${el}`}>
                {genLineForField(el * 16)}
            </tr>
        )
    })
}

const Field = (props) => {
    let field = genMineField(); //создание поля

    return(
        <div>
            <table>
                {field}
            </table>
        </div>
    )
}

export default Field;