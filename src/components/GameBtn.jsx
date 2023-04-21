import React, {forwardRef} from "react";

const GameBtn = forwardRef(({color, border, bg, onClick}, ref) => (
        <button
        color={color} 
        className={`${border} ${bg} 
        sm:w-[200px] h-[175px] 
        sm:h-[200px] m-2
        duration-200 hover:scale-105 w-[175px]`} 
        onClick={onClick}
        ref={ref} />
    ));

export default GameBtn;