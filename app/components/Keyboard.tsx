'use client'
import Key from "./Key";

interface KeyboardProps {
    onClick: (e: string) => void;
    onSubmit: () => void;
    onDelete: () => void;
}

export default function Keyboard({onClick, onSubmit, onDelete}: KeyboardProps) {
    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Delete'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Enter'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    // const onLetterClick = (e) => {
    //     if (e.code == "Enter") {
    //         console.log('hit');
    //     }
    // }

    return (
        letters.map((row, i) => (
           <div key={i} className="flex m-3 justify-center">
              {row.map((letter, idx) => (
                <Key key={idx} value={letter} onTileClick={onClick} status={"not_guessed"} className="m-4 p-4 w-16 h-16 text-center bg-gray-400" />
              ))}
           </div> 
        ))
    )

}