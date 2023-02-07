import React from 'react';
import styled from "styled-components";
import Board from './Board';
const Tictactoe = styled.section`
  background-color: midnightblue;
  color: white;
  text-align: center;
  min-height: 100%;
  min-width: 1024px;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: fixed;
  top: 0;
  left: 0;
`;

const Game = () => {
  return (
    <Tictactoe>
        <h1>Tic Tac Toe</h1>

      <Board />


    </Tictactoe>
  )
}

export default Game