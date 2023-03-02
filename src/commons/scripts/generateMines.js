const generateMines = (idStart) => {
    let result = [];
    let countOne = 0;
    let k = 0;//число для псевдо ровного распределения
    //на линии должно быть от 2 до 3 мин

    for(let i = 0; i < 256; i++){

        if(countOne < 40 && i > k){
            let lastElem = getRandomNumber(2); //генерирует мину у i элемента
            if(i === idStart){
                lastElem = 0; //указываем что на месте первого нажатия нету мины
            }
            result.push(lastElem);
            if(lastElem === 1){
                countOne++;
                k = i + getRandomNumber(9, 0);
                
            }            
        }else{
            result.push(0);
        }
        
        if((40 - countOne) >= (255 - i)){
            k = 0;
            i = 255 - (40 - countOne);
        }
    }
    
    console.log(countOne);
    return result;
}

const getRandomNumber = (max, min = 0) => {
    return Math.floor((Math.random() * (max - min)) + min);
}

export default generateMines;