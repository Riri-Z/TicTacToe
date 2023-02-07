import { useState } from 'react';
import styled from 'styled-components';
import Result from './Result';

interface UserTurn {
    player: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Tileboard = styled.section`
    display: grid;
    margin: 10px 33% 10px 33%;
    grid-template-columns: 33% 33% 33%;
    @media (max-width: 768px) {
        margin: 0px 25% 0px 25%;
    }
`;

const Tile = styled.button`
    background-color: midnightblue;
    border: 1px solid white;
    cursor: pointer;
    aspect-ratio: 1;
`;
const Token = styled.p<{ primary: boolean }>`
    color: ${(props) => (props.primary ? 'white' : 'yellow')};
    font-size: 30px;
`;
const ResetButton = styled.button`
    align-self: center;
    width: 100px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid black;
    color: #f5f5f5;
    background: black;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.2);
    }
`;

const Board = () => {
    const [userTurn, setUserTurn] = useState<UserTurn>({ player: 'X' });
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    const [result, setResult] = useState('');
    const [gameActive, setGameActive] = useState(true);

    const handleClick = (e: string, index: number) => {
        if (!gameActive) return;
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

    const handleVerifyWinner = () => {
        for (let index = 0; index < 7; index++) {
            let winCondition = winingConditions[index];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                switchPlayer();
            } else {
                if (a === b && b === c) {
                    setResult(`Player ${userTurn.player} won the game`);
                    setGameActive(false);
                    break;
                }
                if (board.includes('')) {
                    switchPlayer();
                } else {
                    setGameActive(false);
                    setResult('Tie game');
                }
            }
        }
    };

    const handleRestart = () => {
        setUserTurn({ player: 'X' });
        setBoard(['', '', '', '', '', '', '', '', '']);
        setResult('');
        setGameActive(true);
    };
    return (
        <Container>
            <p>Player {userTurn.player} turn</p>
            <Tileboard>
                {board.map((e, index) => (
                    <Tile key={index} onClick={() => handleClick(e, index)}>
                        <Token primary={e === 'X' ? true : false}> {e}</Token>
                    </Tile>
                ))}
            </Tileboard>
            {!gameActive && <Result result={result}></Result>}
            {!gameActive && (
                <ResetButton onClick={() => handleRestart()}>
                    Play again
                </ResetButton>
            )}
        </Container>
    );
};

export default Board;
