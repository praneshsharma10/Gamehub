import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface GameObject {
  x: number
  y: number
  width: number
  height: number
}

interface Bullet extends GameObject {
  active: boolean
}

interface Enemy extends GameObject {
  speed: number
}

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

function Game2() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const playerRef = useRef<GameObject>({
    x: GAME_WIDTH / 2 - 25,
    y: GAME_HEIGHT - 60,
    width: 50,
    height: 50,
  })

  const bulletsRef = useRef<Bullet[]>([])
  const enemiesRef = useRef<Enemy[]>([])
  const keysRef = useRef<{ [key: string]: boolean }>({})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrameId: number

    const render = () => {
      context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      context.fillStyle = '#00ff00'
      context.fillRect(
        playerRef.current.x,
        playerRef.current.y,
        playerRef.current.width,
        playerRef.current.height
      )

  
      context.fillStyle = '#ffff00'
      bulletsRef.current.forEach((bullet) => {
        if (bullet.active) {
          context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
        }
      })

  
      context.fillStyle = '#ff0000'
      enemiesRef.current.forEach((enemy) => {
        context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
      })

  
      context.fillStyle = '#ffffff'
      context.font = '20px Arial'
      context.fillText(`Score: ${score}`, 10, 30)
    }

    const update = () => {
      if (!gameStarted || gameOver) return

      if (keysRef.current.ArrowLeft) playerRef.current.x -= 5
      if (keysRef.current.ArrowRight) playerRef.current.x += 5

 
      playerRef.current.x = Math.max(0, Math.min(GAME_WIDTH - playerRef.current.width, playerRef.current.x))

 
      bulletsRef.current.forEach((bullet) => {
        if (bullet.active) {
          bullet.y -= 10
          if (bullet.y < 0) bullet.active = false
        }
      })


      enemiesRef.current.forEach((enemy) => {
        enemy.y += enemy.speed
        if (enemy.y > GAME_HEIGHT) {
          enemy.y = -enemy.height
          enemy.x = Math.random() * (GAME_WIDTH - enemy.width)
        }
      })

   
      enemiesRef.current.forEach((enemy) => {
        bulletsRef.current.forEach((bullet) => {
          if (
            bullet.active &&
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            bullet.active = false
            enemy.y = -enemy.height
            enemy.x = Math.random() * (GAME_WIDTH - enemy.width)
            setScore((prevScore) => prevScore + 1)
          }
        })

        if (
          playerRef.current.x < enemy.x + enemy.width &&
          playerRef.current.x + playerRef.current.width > enemy.x &&
          playerRef.current.y < enemy.y + enemy.height &&
          playerRef.current.y + playerRef.current.height > enemy.y
        ) {
          setGameOver(true)
        }
      })

      render()
      animationFrameId = requestAnimationFrame(update)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true
      if (e.code === 'Space') {
        bulletsRef.current.push({
          x: playerRef.current.x + playerRef.current.width / 2 - 2.5,
          y: playerRef.current.y,
          width: 5,
          height: 10,
          active: true,
        })
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    if (gameStarted && !gameOver) {
      // Initialize enemies
      enemiesRef.current = Array(5)
        .fill(null)
        .map(() => ({
          x: Math.random() * (GAME_WIDTH - 40),
          y: -40,
          width: 40,
          height: 40,
          speed: 2 + Math.random() * 2,
        }))

      update()
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [gameStarted, gameOver, score])

  const handleStartGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Space Shooter</h1>
      <div className="flex justify-center mb-4">
        {!gameStarted && !gameOver && (
          <button
            onClick={handleStartGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Game
          </button>
        )}
        {gameOver && (
          <div className="text-center">
            <p className="text-xl mb-4">Game Over! Your score: {score}</p>
            <button
              onClick={handleStartGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="border border-gray-600"
        />
      </div>
      <div className="text-center mt-8">
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Home
        </Link>
      </div>
    </div>
  )
}

export default Game2

