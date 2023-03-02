//функция для проверки на какую ячейку нажали 

let stateField = {};

const fromIdToXYDirection = (id) => {
    let x = id % 16;
    let y = Math.floor(id/16);

    return [x, y];
}

const fromXYDirectionToID = (x, y) => {
    let id = y * 16 + x;

    return id;
}

const isMine = (x, y, arr) => {
    let id = fromXYDirectionToID(x, y);
    
    return arr[id]; //вернет 1, если в ячейке есть мина
}

const countMine = (startX, startY, arr) => {
    //подсчёт мин вокруг клетки
    let count = 0;

    for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
            if((startX + x >= 0 && startX + x < 16) && (startY + y >= 0 && startY + y < 16) ){//проверка координат
                count = count + isMine(startX + x, startY + y, arr);
            }
        }
    }

    return count;
}

const openCell = (id, arr, handlerLoss, handlerIdLoss) => {
    let [xEl, yEl] = fromIdToXYDirection(id);

    if(isMine(xEl, yEl, arr) === 1){//проверка на нажатие на мину
        handlerLoss(true); //игрок нажал на мину
        handlerIdLoss(id);
        return; 
    } 

    let countMineOnField = countMine(xEl, yEl, arr);
    stateField = {...stateField, [id]: countMineOnField};
    
    if(countMineOnField > 0){
        return stateField;
    }else{
        for(let x = -1; x < 2; x++){
            for(let y = -1; y < 2; y++){
                if((xEl + x >= 0 && xEl + x < 16) && (yEl + y >= 0 && yEl + y < 16) ){//проверка координат
                    let newId = fromXYDirectionToID(xEl + x, yEl + y);
                    if(stateField[newId] == undefined && newId < 256 && newId >= 0){ //не проверяем проверенные элементы
                        openCell(newId, arr);
                    }                        
                }
            }
        }
        return stateField;        
    }
}

export default openCell;