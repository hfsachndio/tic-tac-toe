'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xTurn, setXTurn] = useState(true)

  const winner = getWinner(board)

  function handleMove(index) {
  if (board[index] || winner) return

    const updatedBoard = [...board]
     updatedBoard[index] = xTurn ? 'X' : 'O'

    setBoard(updatedBoard)
    setXTurn(!xTurn)
  }


  function resetBoard() {
     setBoard(Array(9).fill(null))
    setXTurn(true)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-6">
       <h1 className="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>

      <Card className="w-[300px] bg-gray-50">
         <CardContent className="grid grid-cols-3 gap-2 p-4">
          {board.map((value, idx) => (
            <Button
              key={idx}
              className="h-20 text-2xl bg-pink-50"
               variant="outline"
              onClick={() => handleMove(idx)}
            >
              {value}
            </Button>
          ))}
        </CardContent>
       </Card>

      <div className="mt-4 text-lg">
        {winner
           ? `🎉 ${winner} wins!`
          : board.every(Boolean)
           ? 'It’s a draw!'
          : `Turn: ${xTurn ? 'X' : 'O'}`}
      </div>

      <Button onClick={resetBoard} className="mt-4">
         Restart Game
      </Button>
    </main>
  )
} 


function getWinner(squares) {
  const winPatterns = [
    [0, 1, 2],
     [3, 4, 5],
    [6, 7, 8],
      [0, 3, 6],
    [1, 4, 7],
     [2, 5, 8],
    [0, 4, 8],
     [2, 4, 6],
  ]

  for (let [a, b, c] of winPatterns) {
     if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }

  return null
}
