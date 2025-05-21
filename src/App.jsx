import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import InscripcionPrefacultativa from './pages/InscripcionPrefacultativa'
import Matriculacion from './pages/Matriculacion'
import HistorialAcademico from './pages/HistorialAcademico'
import Licencias from './pages/Licencias'
import Jefatura from './pages/Jefatura'
import Docente from './pages/Docente'
import Encuestas from './pages/Encuestas'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-5xl mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inscripcion" element={<InscripcionPrefacultativa />} />
          <Route path="/matriculacion" element={<Matriculacion />} />
          <Route path="/historial" element={<HistorialAcademico />} />
          <Route path="/licencias" element={<Licencias />} />
          <Route path="/jefatura" element={<Jefatura />} />
          <Route path="/docente" element={<Docente />} />
          <Route path="/encuestas" element={<Encuestas />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App