'use client'
import Key from './Key';

export interface RowProps {
    rowLetters: RowLetter[];
}

export interface RowLetter {
    status: string,
    value: string,
}

export default function GuessRow(turn: RowProps['rowLetters'], onClick: any) {
    console.log(turn);
    return (
      <div className="col-span-6 flex">
        {turn.map((guess, idx) => (
          <Key key={idx} value={guess.value} status={guess.status} onTileClick={onClick(guess.value)} type="row"/>
        ))}
      </div>
    )
}