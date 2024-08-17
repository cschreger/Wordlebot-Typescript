'use client'
import { useState, useEffect} from "react";
import Key from "./components/Key";
import Keyboard from "./components/Keyboard";

interface Tile {
  value: string,
  status: string
}

type Row = Tile[];

export default function Game() {
  const [rows, setRows] = useState<Row[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState('Playing'); 
  // use this for instructions modal etc??
  const secretWord = "ADIEU";

  const handleReset = () => {
    let init: Row[] = [];
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
      init.push(row);
    }
    setRows(init);
    setCurrentTurn(0);
    setCurrentGuess("");
    setGameStatus("Playing");
  };

  const handleTileClick = (letter: string) => {
    if (gameStatus == "Win") return;

    if (letter == 'Enter') {
      currentGuess.length < 5 ? console.log("Guess must be completed first!") : validateUserLetters(currentGuess)
    } else if (letter == "Delete") {
      console.log(letter);
      debugger
      setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1))
    }
    if (currentGuess.length >= 5) return;
    setCurrentGuess(currentGuess + letter);
    console.log(letter)
  }

  const handleSubmit = () => {
    validateUserGuess(currentGuess);
  }


  const validateUserGuess = (guess: string) => {
    if (guess == secretWord) {
      console.log("Holy motherfucking shit, Batman!!");
    } else {
      console.log("U dumb.")
      validateUserLetters(currentGuess)
      setCurrentTurn(currentTurn + 1);
      setCurrentGuess("");
    }
  }

  const validateUserLetters = (currentGuess: string) => {
    let currentRow = rows[currentTurn]
    for (let i = 0; i < currentGuess.length; i++) {
      if (!secretWord.includes(currentGuess[i])) {
        currentRow[i].status = "not_present"
      } else if (secretWord[i] == currentGuess[i]) {
        currentRow[i].status = "guessed"
      } else if (secretWord.includes(currentGuess[i])) {
        currentRow[i].status = "wrongPos"
      }
    }

    checkGameStatus()
  }

  const checkGameStatus = () => {
    if (currentGuess == secretWord) {
      setGameStatus("Win");
    } else {
      setCurrentTurn(currentTurn + 1);
      setCurrentGuess("");
    }
  }

  const handleDelete = () => {
    setCurrentGuess(currentGuess.slice(0, currentGuess.length-1))
  }

  useEffect(() => {
    handleReset()
  },[]);

  useEffect(() => { 
    if (rows.length === 0 || gameStatus == "Win") return;

    let currentRow = rows[currentTurn];
    debugger
    for (let i = 0; i < currentRow.length; i++) {
      if (currentGuess[i]) {
        currentRow[i].value = currentGuess[i];
      } else {
        currentRow[i].value = '';
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
          <Key key={idx} value={guess.value} status={guess.status} onTileClick={handleTileClick}/>
      ))}
      </div>
    ))}

    <button 
      onClick={handleReset}
     >Play Again/Reset
     </button>
    </div>

    <div className="keyboard-container">
      <Keyboard 
        onClick={handleTileClick}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
    </>
  )
}

