import { useState } from 'react'
import axios from 'axios'
import logo from '../assets/logo.jpeg'

export default function InscripcionPrefacultativa() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    ci: '',
    expedido: '',
    fechaNacimiento: '',
    direccion: '',
    email: '',
    telefono: '',
    aceptaTerminos: false,
    archivoTitulo: null,
    archivoCI: null,
    archivoComprobante: null
  })

  const [mensaje, setMensaje] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }
  }

  const enviar = async () => {
    if (!form.aceptaTerminos) {
      setMensaje("❌ Debes aceptar la declaración jurada para continuar.")
      return
    }

    const data = new FormData()
    data.append("nombre", `${form.nombres} ${form.apellidos}`)
    data.append("correo", form.email)
    data.append("telefono", form.telefono)
    data.append("documento_identidad", form.ci)
    data.append("archivo_titulo", form.archivoTitulo)
    data.append("archivo_ci", form.archivoCI)
    data.append("archivo_comprobante", form.archivoComprobante)

    try {
      const res = await axios.post("http://localhost:8001/inscripcion-prefacultativo", data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      setMensaje(`✅ Inscripción registrada para ${res.data.nombre}`)
    } catch (err) {
      setMensaje(err.response?.data?.detail || "❌ Error al registrar")
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Encabezado */}
        <div className="flex items-center mb-6">
          <img src={logo} alt="Logo EBID" className="h-20 mr-4" />
          <h1 className="text-3xl font-bold">Inscripción Curso Prefacultativo</h1>
        </div>

        {/* Paso 1 */}
        <section className="mb-8 border p-4 rounded">
          <h2 className="font-semibold text-lg mb-4">Paso 1: Datos personales del postulante</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="nombres" placeholder="Nombres" className="border p-2 rounded" onChange={handleChange} />
            <input name="apellidos" placeholder="Apellidos" className="border p-2 rounded" onChange={handleChange} />
            <input name="ci" placeholder="Cédula de Identidad" className="border p-2 rounded" onChange={handleChange} />
            <input name="expedido" placeholder="Expedido (LP, CB...)" className="border p-2 rounded" onChange={handleChange} />
            <input name="fechaNacimiento" placeholder="Fecha de Nacimiento (YYYY-MM-DD)" className="border p-2 rounded" onChange={handleChange} />
            <input name="direccion" placeholder="Dirección" className="border p-2 rounded" onChange={handleChange} />
            <input name="email" type="email" placeholder="Correo Electrónico" className="border p-2 rounded" onChange={handleChange} />
            <input name="telefono" placeholder="Teléfono" className="border p-2 rounded" onChange={handleChange} />
          </div>
        </section>

        {/* Paso 2 */}
        <section className="mb-8 border p-4 rounded">
          <h2 className="font-semibold text-lg mb-4">Paso 2: Documentación requerida (PDF o imagen)</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">📎 Fotocopia de Título de Bachiller</label>
              <input type="file" name="archivoTitulo" accept="application/pdf,image/*" onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1">📎 Fotocopia de Cédula de Identidad</label>
              <input type="file" name="archivoCI" accept="application/pdf,image/*" onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1">📎 Comprobante de Depósito</label>
              <input type="file" name="archivoComprobante" accept="application/pdf,image/*" onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* Paso 3 */}
        <section className="mb-6 border p-4 rounded">
          <h2 className="font-semibold text-lg mb-4">Paso 3: Declaración jurada</h2>
          <p className="text-sm text-gray-700 text-justify">
            Yo <span className="font-semibold uppercase">{form.nombres} {form.apellidos}</span> declaro que los datos proporcionados son verídicos, que los documentos requeridos se encuentran en regla y que cumplo con los requisitos para la admisión al curso prefacultativo.
          </p>
          <div className="mt-3">
            <label>
              <input type="checkbox" name="aceptaTerminos" onChange={handleChange} /> Acepto la declaración jurada.
            </label>
          </div>
        </section>

        {/* Botón */}
        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={enviar}
          >
            Enviar inscripción
          </button>
          {mensaje && <p className="mt-4 text-sm font-medium text-green-600">{mensaje}</p>}
        </div>
      </div>
    </div>
  )
}