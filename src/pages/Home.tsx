


import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const games = [
  { id: 1, name: 'Tic Tac Toe', path: '/game1', color: 'bg-purple-600' },
  { id: 2, name: 'Space Shooter', path: '/game2', color: 'bg-blue-600' },
  { id: 3, name: 'maze-game', path: '/game3', color: 'bg-green-600' },
  // { id: 4, name: 'Racing', path: '/game4', color: 'bg-red-600' },
]

function Home() {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleLogout = () => {
    fetch('/auth/logout', { method: 'GET' })
      .then(() => {
        setUser(null);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="relative">
        {/* Background with slanted lines and stars */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 45%, #ffffff0d 45%, #ffffff0d 55%, transparent 55%),
              linear-gradient(-45deg, transparent 45%, #ffffff0d 45%, #ffffff0d 55%, transparent 55%)
            `,
            backgroundSize: '40px 40px'
          }}></div>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.5,
              }}
            ></div>
          ))}
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Game Hub
            </h1>
            <div className="space-x-4">
              {user ? (
                <>
                  <span className="text-white">Welcome, {user.name}!</span>
                  <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
            {games.map((game) => (
              <Link
                key={game.id}
                to={game.path}
                className={`${game.color} rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-${game.color.split('-')[1]}-400/50`}
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                <h2 className="text-2xl font-semibold mb-2">{game.name}</h2>
                <p className={`mt-2 transition-opacity duration-300 ${hoveredGame === game.id ? 'opacity-100' : 'opacity-0'}`}>
                  Click to play
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src="https://media.geeksforgeeks.org/wp-content/uploads/20240830181145/roblox.webp" alt="Featured game" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Featured Article</div>
              <a href="https://timesofindia.indiatimes.com/blogs/voices/online-gaming-a-perfect-blend-of-entertainment-and-education/" className="block mt-1 text-lg leading-tight font-medium text-white hover:underline">A perfect blend of entertainment and education</a>
              <p className="mt-2 text-gray-400">
              Online gaming has always been perceived as the ultimate form of entertainment but with the evolution of the tech industry, it is also gaining recognition as a tool of learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 ">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src="https://images.theconversation.com/files/614148/original/file-20240819-17-s01mu0.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&h=503&fit=crop&dpr=1" alt="Featured game" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Featured Article</div>
              <a href="https://theconversation.com/study-shows-video-games-can-improve-mental-wellbeing-but-you-can-have-too-much-of-a-good-thing-236861" className="block mt-1 text-lg leading-tight font-medium text-white hover:underline">Study shows video games can improve mental wellbeing but you can have too much of a good thing</a>
              <p className="mt-2 text-gray-400">A study of almost 100,000 people in Japan aged 10 to 69 found playing video games or even owning a console can be good for mental health. But playing too much each day can harm wellbeing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home





