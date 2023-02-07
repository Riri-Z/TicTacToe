import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';
import Result from './Result';

interface UserTurn {
    player: string;
}

interface Iboard {
    board: string[];
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Tileboard = styled.section`
    display: grid;
    margin: 10px 33% 10px 33%;
    grid-template-columns: 33% 33% 33%;
`;

const Tile = styled.button`
    background-color: midnightblue;
    border: 1px solid white;
    cursor: pointer;
    color: white;
    aspect-ratio: 1;
`;

const ResetButton = styled.button`
    align-self: center;
    width: 100px;
`;

const Board = () => {
    const [userTurn, setUserTurn] = useState<UserTurn>({ player: 'X' });
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    const [result, setResult] = useState('');
  const [gameActive, setGameActive]= useState(true)


    const handleClick = (e: string, index: number) => {
        if (!gameActive) return
        let token = userTurn.player;
        let newBoard = board;

        if (newBoard[index] !== '') return;

        newBoard[index] = token;
        setBoard([...newBoard]);

        handleVerifyWinner();
    };

    const switchPlayer = () => {
        if (userTurn.player === 'X') {
            setUserTurn({ player: 'O' });
        } else {
            setUserTurn({ player: 'X' });
        }
    };

    const handleVerifyWinner = () => {
        for (let index = 0; index < 7; index++) {
            let winCondition = winingConditions[index];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if (a == '' || b == '' || c == '') {
                switchPlayer();
            } else {

              if (a === b && b === c) {
                  setResult(`${userTurn.player} won the game`);
                  setGameActive(false)
              } else {
                  setResult('Tie game');
              }
            }
        }
    };

    const winingConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const handleRestart = () => {
      setUserTurn({player: 'X' })
      setBoard(['', '', '', '', '', '', '', '', ''])
      setResult('')
      setGameActive(true)
    }
    return (
        <Container>
            <p>Player {userTurn.player} turn</p>
            <Tileboard>
                {board.map((e, index) => (
                    <Tile key={index} onClick={() => handleClick(e, index)}>
                        {e}
                    </Tile>
                ))}
            </Tileboard>
           {!gameActive && <Result result={result}></Result>}
           {!gameActive && <ResetButton  onClick={() => handleRestart()}>Reset</ResetButton>}
        </Container>
    );
};

export default Board;
