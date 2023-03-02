import React, { useEffect, useState } from 'react';

const resetLevelHandler = (fun, timer) => {
    clearInterval(timer);
    fun();
}

const Header = (props) => {
    let [timer, setTimer] = useState(0);

    // let t = setInterval(() => {
    //     setTimer(timer + 1);
    // }, 1000);

    useEffect(() => {}, [timer]);

    useEffect(() => {
        
    }, [props.mineCounter])//отслеживаем колличество оставшихся мин

    return(
        <div>
            {/* количество мин */}
            <div>
                {props.counterMine}
            </div>

            {/* Кнопка reset */}
            <div onClick={() => {
                // resetLevelHandler(props.resetLevel, t);
            }}>
                <img src="" alt="reset" />
            </div>

            {/* таймер */}
            <div>
                {timer}
            </div>
        </div>
    )
}

export default Header