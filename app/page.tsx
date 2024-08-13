'use client'
import { useState, useEffect} from "react";
import Key from "./components/Key";

interface Tile {
  value: string,
  status: string
}

type Row = Tile[];

export default function Game() {
  const [rows, setRows] = useState<Row[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentTurn, setCurrentTurn] = useState(0);
  // setCurrentGuess("A");
  const handleReset = () => {
    let temp: Row[] = [];
    for (let i = 0; i < 6; i++) {
      const row: Row = [
        {
          value: "",
          status: "not_guessed",
        },
        {
          value: "",
          status: "not_guessed",
        },
        {
          value: "",
          status: "not_guessed",
        },
        {
          value: "",
          status: "not_guessed",
        },
        {
          value: "",
          status: "not_guessed",
        },
      ];
      temp.push(row);
    }
    setRows(temp);
    setCurrentTurn(0);
  };

  useEffect(() => {
    handleReset()
  },[]);

  useEffect(() => {
    if (rows.length === 0) return;

    let currentRow = rows[currentTurn];
    for (let i = 0; i < currentRow.length; i++) {
      if (currentGuess[i]) {
        currentRow[i].value = currentGuess[i];
      }
    }
    setRows([...rows]);
  }, [currentGuess]);
  

  return (
    <>
    <div className="grid-rows-6">
    {rows.map((turn, i) => (
      <div key={i} className="col-span-6 flex">
      {turn.map((guess, idx) => (
          <Key key={idx} value={guess.value} status={guess.status} />
      ))}
      </div>
    ))}
    </div>
    </>
  )
}
