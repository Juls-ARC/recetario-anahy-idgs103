import { useState, useMemo, useEffect } from 'react'
import recetas from './data/recetas.js'
import RecipeCard from './components/RecipeCard.jsx'
import RecipeDetail from './components/RecipeDetail.jsx'

function App() {
  const [seleccionada, setSeleccionada] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return recetas
    return recetas.filter(
      (r) =>
        r.titulo.toLowerCase().includes(q) ||
        r.categoria.toLowerCase().includes(q) ||
        r.ingredientes.some((i) => i.nombre.toLowerCase().includes(q)),
    )
  }, [busqueda])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [seleccionada])

  return (
    <div className="page">
      {seleccionada ? (
        <RecipeDetail receta={seleccionada} onVolver={() => setSeleccionada(null)} />
      ) : (
        <>
          <header className="header">
            <h1 className="title">Recetario</h1>
            <p className="subtitle">{recetas.length} recetas caseras, paso a paso.</p>
          </header>

          <input
            className="search"
            type="search"
            placeholder="Buscar receta o ingrediente"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar recetas"
          />

          <ul className="list">
            {filtradas.map((receta, i) => (
              <RecipeCard
                key={receta.id}
                numero={i + 1}
                receta={receta}
                onAbrir={() => setSeleccionada(receta)}
              />
            ))}
          </ul>

          {filtradas.length === 0 && (
            <p className="empty">
              Sin resultados para “{busqueda}”.{' '}
              <button className="link" onClick={() => setBusqueda('')}>
                Limpiar
              </button>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default App
