import React, {useState, useRef, useEffect} from 'react';
import GameBtn from './GameBtn';

const colors = ["green", "red", "yellow", "blue"];

function SimonGame() {

    //states
    const [sequence, setSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [playingIdx, setPlayingIdx] = useState(0);

    //refs
    const greenRef = useRef(null);
    const redRef = useRef(null);
    const yellowRef = useRef(null);
    const blueRef = useRef(null);

    //reset 
    const resetGame = () => {
        setSequence([]);
        setPlaying(false);
        setPlayingIdx(0);
    }

    //functions
    const addNewColor = () => {
        const color = colors[Math.floor(Math.random() * 4)];
        const newSequence = [...sequence, color];
        setSequence(newSequence);
    }
    const handleNextLevel = () => {
        if (!playing) {
            setPlaying(true);
            addNewColor();
        }
    }

    const handleColorClick = (e) => {
        if(playing) {

            e.target.classList.add("opacity-50");

            setTimeout (() => {
                e.target.classList.remove("opacity-50");
            const clickedColor = e.target.getAttribute("color");
            
            //clicked correct sequence
            if(sequence[playingIdx] === clickedColor) {
                //clicked last color of sequence
                if(playingIdx === sequence.length -1) {
                    setTimeout(() => {
                        setPlayingIdx(0);
                        addNewColor();
                    }, 250)

                } else {
                    //missing colors of sequence to be clicked
                    setPlayingIdx(playingIdx + 1);
                }

            }
            
            //clicked incorrect color of the sequence
            else {
                resetGame()
            alert("You Lost!");
            }
        }
            );}
    }
    //useEffect
    useEffect(() => {
        //showSequence
        if(sequence.length > 0) {
        const showSequence = (idx = 0 ) => {
            let ref = null;
            if(sequence[idx] === "green") ref = greenRef 
            if(sequence[idx] === "red") ref = redRef 
            if(sequence[idx] === "yellow") ref = yellowRef 
            if(sequence[idx] === "blue") ref = blueRef 

            //highlight the ref
            setTimeout(() => {
            ref.current.classList.add("brightness-[2.5]");
            
            setTimeout(() => {
                ref.current.classList.remove("brightness-[2.5]");
                if(idx < sequence.length -1) showSequence(idx +1 );
            }, 250);
        }, 250);
        };
        showSequence();
    }
    }, [sequence]);

    return(      
        //Main container
        <div className="flex justify-center 
        items-center 
        bg-neutral-800 
        w-screen h-screen 
        text-white">
                {/*Game Container */}
                <div className="relative flex flex-col justify-center items-center">
                    {/*Green and Red Container*/}
                    <div>
                        {/*GREEN BUTTON*/}
                        <GameBtn 
                        color="green"
                        border="rounded-tl-full" 
                        bg="bg-green-500" 
                        onClick={handleColorClick}
                        ref={greenRef}
                        />

                        {/*RED BUTTON*/}
                        <GameBtn 
                        bg="bg-red-500" 
                        color="red"
                        border="rounded-tr-full" 
                        onClick={handleColorClick}
                        ref={redRef}/>
                    </div>
                    {/*Yellow and Blue Container*/}
                    <div>
                        {/**YELLOW BUTTON */}
                        <GameBtn 
                        color="yellow"
                        bg="bg-yellow-400" 
                        border="rounded-bl-full" 
                        onClick={handleColorClick}
                        ref={yellowRef}/>

                        {/**BLUE BUTTON */}
                        <GameBtn 
                        bg="bg-blue-500"
                        color="blue" 
                        border="rounded-br-full" 
                        onClick={handleColorClick}
                        ref={blueRef}/>
                    </div>
                    {/*Play button */}
                    <button className="absolute bg-neutral-900 text-white text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] 
                    sm:h-[175px] duration-200 hover:scale-105" 
                    onClick={handleNextLevel}>
                    {sequence.length === 0 ? "Play" : sequence.length} </button>
                </div>
        </div>
    
    );
}

export default SimonGame;

