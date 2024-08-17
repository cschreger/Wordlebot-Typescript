'use client'
import Key from './Key';

interface RowProps {
    rowLetters: RowLetter[];
}

interface RowLetter {
    status: string,
    value: string
}

export default function Row(turn: RowProps['rowLetters']) {
    
    // console.log(Object.entries(rowLetters));
    // console.log(rowLetters[0])
    console.log(turn);
    return (
    <div>
      {/* {turn.map((guess, idx) => (
        //   <Key key={idx} value={guess.value} status={guess.status} handleTileClick={}/>
      ))} */}
    </div>
    )
}