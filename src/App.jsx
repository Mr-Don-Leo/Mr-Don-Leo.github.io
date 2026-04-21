import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Features from './pages/Features'
import Fun from './pages/Fun'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/fun" element={<Fun />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer>
        © {new Date().getFullYear()} Mr-Don-Leo · Built with React + Vite
      </footer>
    </BrowserRouter>
  )
}

export default App
