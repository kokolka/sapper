import React, { useEffect, useState } from 'react';

const Header = (props) => {
    let [timer, setTimer] = useState(0);
    let [t, setT] = useState();

    const genTimer = () =>{
        setT(setTimeout(() => {
            setTimer(timer + 1);
        }, 1000))
    }

    useEffect(() => {
        if(props.isLoss === false){
            if(timer > 0 && timer < 999){
                clearTimeout(t);
                genTimer();
            }else if(timer === 0){
                genTimer()
            }else if(timer >= 999){
                clearTimeout(t);
                setTimer(999);
            } 
        }else{
            clearTimeout(t);
        }        
    }, [timer, props.isLoss]);

    useEffect(() => {
        if(props.isWin === true){
            let buttonReset = document.querySelector('#resetButton');
            buttonReset.className = 'win-smile';
        }
        
    }, [props.isWin])

    useEffect(() => {
        let countToString = props.globalCounterMines.toString();
        let counter0 = document.querySelector('#counter0');
        let counter1 = document.querySelector('#counter1');
        if(countToString.length === 1){
            counter0.className = 'number-0';
            counter1.className = `number-${countToString[0]}`;
        }else{
            counter0.className = `number-${countToString[0]}`;
            counter1.className = `number-${countToString[1]}`;
        }
        
    }, [props.globalCounterMines])

    useEffect(() => {
        let timerToString = timer.toString();
        let timer0 = document.querySelector('#timer0');
        let timer1 = document.querySelector('#timer1');
        let timer2 = document.querySelector('#timer2');
        if(timerToString.length === 1){
            timer0.className = 'number-0';
            timer1.className = 'number-0';
            timer2.className = `number-${timerToString[0]}`;
        }else if(timerToString.length === 2){
            timer0.className = 'number-0';
            timer1.className = `number-${timerToString[0]}`;
            timer2.className = `number-${timerToString[1]}`;
        }else{
            timer0.className = `number-${timerToString[0]}`;
            timer1.className = `number-${timerToString[1]}`;
            timer2.className = `number-${timerToString[2]}`;
        }
    }, [timer])

    return(
        <div className='header-box'>
            {/* количество мин */}
            <div className='header-counter'>
                <div id='counter0'></div>
                <div id='counter1'></div>
            </div>

            {/* Кнопка reset */}
            <div id='resetButton' className='normal-smile' onClick={() => {
                props.rerender();
            }}>
            </div>

            {/* таймер */}
            <div className='header-timer'>
                <div id='timer0'></div>
                <div id='timer1'></div>
                <div id='timer2'></div>
            </div>
        </div>
    )
}

export default Header