// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Game1 from './pages/Game1'
// import Game2 from './pages/Game2'

// // import Game3 from './pages/Game3'
// // import Game4 from './pages/Game4'


// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-900 text-white">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/game1" element={<Game1 />} />
//           <Route path="/game2" element={<Game2 />} />
//           {/* <Route path="/game3" element={<Game3 />} />
//           <Route path="/game4" element={<Game4 />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Game1 from './pages/Game1'
import Game2 from './pages/Game2'
// import Game3 from './pages/Game3'
// import Game4 from './pages/Game4'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/game1" element={<Game1 />} />
          <Route path="/game2" element={<Game2 />} />
          {/* <Route path="/game3" element={<Game3 />} /> */}
          
        </Routes>
      </div>
    </Router>
  )
}

export default App


// <Route path="/game4" element={<Game4 />} /> 