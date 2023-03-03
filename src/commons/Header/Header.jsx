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
            if(timer > 0){
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

    return(
        <div className='header-box'>
            {/* количество мин */}
            <div>
                {props.mineCount}
            </div>

            {/* Кнопка reset */}
            <div onClick={() => {
                window.location.reload();
            }}>
                reset
            </div>

            {/* таймер */}
            <div>
                {timer}
            </div>
        </div>
    )
}

export default Header