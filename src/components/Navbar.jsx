import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white px-4 py-3 text-sm flex flex-wrap gap-4">
      <Link to="/" className="hover:underline">🏠 Inicio</Link>
      <Link to="/inscripcion" className="hover:underline">📋 Inscripción</Link>
      <Link to="/matriculacion" className="hover:underline">🧾 Matriculación</Link>
      <Link to="/historial" className="hover:underline">📚 Historial Académico</Link>
      <Link to="/licencias" className="hover:underline">📄 Licencias</Link>
      <Link to="/docente" className="hover:underline">👨‍🏫 Docente</Link>
      <Link to="/jefatura" className="hover:underline">📁 Jefatura</Link>
      <Link to="/encuestas" className="hover:underline">📝 Encuestas</Link>
    </nav>
  )
}