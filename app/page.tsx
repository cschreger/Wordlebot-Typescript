'use client'
// want to start this from scratch almost now that I understand more about it (?) - the conf building on codecademy brilliant etc etc 
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import Key from "./components/Key";
import Keyboard from "./components/Keyboard";
import {allWords} from "./words";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export interface Tile {
  value: string,
  status: string
}

export type Row = Tile[];

interface ObjectLiteral {
  [key: string]: any;
}

const customStyles = {
  overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#main');

export default function Game() {
  const [rows, setRows] = useState<Row[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState('Playing'); 
  const [randomWordIdx, setRandomWordIdx] = useState(Math.floor(Math.random()*5700));
  const [secretWord, setSecretWord] = useState(allWords[randomWordIdx]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // let subtitle: String = '';


  const testNotify = () => toast("Set Up!");

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
    setRandomWordIdx(Math.floor(Math.random()*5700));
    setSecretWord('stray');
  };

  const handleTileClick = (letter: string) => {
    if (gameStatus == "Win") return;
    if (letter == 'Enter') {
      return currentGuess.length < 5 ? toast("Guess must be completed first!") : validateUserLetters(currentGuess);
    } else if (letter == "Delete") {
      return setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1))
    }
    if (currentGuess.length >= 5) return;

    setCurrentGuess(currentGuess + letter);
  }


  const validateUserLetters = (currentGuess: string) => {
    if (!allWords.includes(currentGuess.toLowerCase())) return toast('Invalid guess :(');
    let currentRow = rows[currentTurn];
    let secretWordLetters = secretWord.split('');
    let guess = currentGuess.toLowerCase();

    for (let i = 0; i < guess.length; i++) {
      if (secretWord[i] == guess[i]) {
        let idxToRemove = secretWordLetters.indexOf(guess[i])
        secretWordLetters.splice(idxToRemove, 1);
        currentRow[i].status = "guessed";
      } 
    }

    for (let i = 0; i < guess.length; i++) {
      if (secretWordLetters.includes(guess[i])) {
        let idxToRemove = secretWordLetters.indexOf(guess[i])
        secretWordLetters.splice(idxToRemove, 1);
        currentRow[i].status = "wrongPos";
      } 
    }

    checkGameStatus()
  }

  const checkGameStatus = () => {
    if (currentGuess.toLowerCase() == secretWord) {
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
    toast(`${secretWord}`)
  }, [secretWord])

  useEffect(() => { 
    if (rows.length === 0 || gameStatus == "Win" || currentGuess == "Delete" 
       || currentGuess == "Enter") return;

    let currentRow = rows[currentTurn];
    for (let i = 0; i < currentRow.length; i++) {
      if (currentGuess[i]) {
        currentRow[i].value = currentGuess[i];
      } else {
        currentRow[i].value = '';
      }
    }
    setRows([...rows]);
  }, [currentGuess]);

  // function afterOpenModal() {
  //   subtitle.style.color = '#f00'
  // }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }
  

  return (
      <div id="main-board" className="flex flex-col justify-center">
      <div className="grid-rows-6 flex flex-col items-center">
      {rows.map((turn, i) => (
        <div key={i} className="col-span-6 flex">
        {turn.map((guess, idx) => (
          <Key key={idx} value={guess.value} status={guess.status} onTileClick={handleTileClick} type="row"/>
        ))}
        </div>
      ))}

      <button onClick={handleReset}>Play Again</button>
      <button onClick={openModal}>Open Modal</button>
      <ToastContainer />
      </div>

      <div className="keyboard-container">
        <Keyboard 
          onClick={handleTileClick}
          onDelete={handleDelete}
          rows={rows}
          />
      </div>
      <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      >
        <button onClick={closeModal}></button>
      </Modal>
      </div>
  )
}

