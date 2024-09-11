/* eslint-disable react/display-name */
import React, {useEffect, useState} from 'react'

export const UserStats = React.memo((stats:any) => {
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gamesWonPercentage, setGamesWonPercentage] = useState(0);
    const [avgGuessCount, setAvgGuessCount] = useState(0);

    useEffect(() => {
        let totalPlays = 0;
        let winPercentage = 0;
        let guessAverage = 0;

        if (stats.stats.games) {
            totalPlays = stats.stats.games.length;
            let totalWins = 0;
            let totalGuesses = 0;
            stats.stats.games.forEach((game: { gameWon: boolean; numGuesses: number; }) => {
                if (game.gameWon == true) {
                    totalWins += 1;
                }
                totalGuesses += game.numGuesses;
            })
            winPercentage = (totalWins/totalPlays) * 100;
            guessAverage = (totalGuesses/totalPlays);
        } 
        setGamesPlayed(totalPlays);
        setGamesWonPercentage(winPercentage);
        setAvgGuessCount(Number(guessAverage.toFixed(2)))
    }, [stats])

    return (
        <li>
            <ul>Games Played: {gamesPlayed}</ul>
            <ul>% Games Won: {gamesWonPercentage}%</ul>
            <ul>Average Guess Count: {avgGuessCount}</ul>
        </li>
    )
})