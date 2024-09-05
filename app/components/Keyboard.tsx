'use client'

import Key from "./Key";
import { useMemo } from "react";
import Tile from "../page"

interface KeyboardProps {
    onClick: (e: string) => void;
    onDelete: () => void;
    rows: any[][]
}

export default function Keyboard({onClick, onDelete, rows}: KeyboardProps) {
    const letters = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Delete'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Enter'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    // const letterStatuses = useMemo(() => rows.flat(), [rows]) 

    const checkLetterStatus = (letter: string) => {
        let flattened = rows.flat();
        let filtered = flattened.filter(row => row.value == letter);

        return filtered.length ? filtered[0].status : "not_guessed";


        // flattened.filter((row) => row.value == letter)
    }


    // const onLetterClick = (e) => {
    //     if (e.code == "Enter") {
    //         console.log('hit');
    //     }
    // }

    return (
        letters.map((row, i) => (
           <div key={i} className="flex m-3 justify-center">
              {row.map((letter, idx) => (
                <Key key={letter} value={letter} onTileClick={onClick} status={checkLetterStatus(letter)} type="keyboard" />
              ))}
           </div> 
        ))
    )

}