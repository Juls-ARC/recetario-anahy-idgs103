import { useState } from 'react'

// Muestra cantidades amigables: 0.5 -> ½, 1.5 -> 1 ½, etc.
function formatearCantidad(valor) {
  const fracciones = { 0.25: '¼', 0.5: '½', 0.75: '¾' }
  const entero = Math.floor(valor)
  const decimal = Math.round((valor - entero) * 100) / 100
  if (decimal === 0) return String(entero)
  if (fracciones[decimal]) return entero > 0 ? `${entero} ${fracciones[decimal]}` : fracciones[decimal]
  return String(Math.round(valor * 10) / 10)
}

// Agrega o quita un índice de una lista (para marcar / desmarcar)
function alternar(lista, index) {
  return lista.includes(index) ? lista.filter((i) => i !== index) : [...lista, index]
}

function RecipeDetail({ receta, onVolver }) {
  const [porciones, setPorciones] = useState(receta.porciones)
  const [marcados, setMarcados] = useState([]) // ingredientes listos
  const [hechos, setHechos] = useState([]) // pasos terminados

  const factor = porciones / receta.porciones

  return (
    <article className="detail">
      <button className="link back" onClick={onVolver}>
        ← Recetas
      </button>

      <header className="detail__header">
        <p className="eyebrow">{receta.categoria}</p>
        <h1 className="title">{receta.titulo}</h1>
        <p className="subtitle">{receta.descripcion}</p>
        <p className="meta">
          {receta.tiempo} min · {receta.dificultad} · {receta.ingredientes.length} ingredientes
        </p>
      </header>

      <div className="columns">
        {/* ---------- Ingredientes ---------- */}
        <section>
          <div className="section__head">
            <h2>Ingredientes</h2>
            <div className="servings" aria-label="Ajustar porciones">
              <button
                onClick={() => setPorciones((p) => Math.max(1, p - 1))}
                disabled={porciones <= 1}
                aria-label="Menos porciones"
              >
                −
              </button>
              <span>{porciones} porc.</span>
              <button onClick={() => setPorciones((p) => Math.min(20, p + 1))} aria-label="Más porciones">
                +
              </button>
            </div>
          </div>

          <ul className="items">
            {receta.ingredientes.map((ing, i) => {
              const listo = marcados.includes(i)
              return (
                <li key={i}>
                  <label className={listo ? 'item item--done' : 'item'}>
                    <input type="checkbox" checked={listo} onChange={() => setMarcados((m) => alternar(m, i))} />
                    <span className="item__qty">
                      {formatearCantidad(ing.cantidad * factor)} {ing.unidad}
                    </span>
                    <span>{ing.nombre}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </section>

        {/* ---------- Pasos ---------- */}
        <section>
          <div className="section__head">
            <h2>Preparación</h2>
            <span className="muted">
              {hechos.length}/{receta.pasos.length}
            </span>
          </div>

          <ol className="steps">
            {receta.pasos.map((paso, i) => {
              const hecho = hechos.includes(i)
              return (
                <li key={i}>
                  <button
                    className={hecho ? 'step step--done' : 'step'}
                    onClick={() => setHechos((h) => alternar(h, i))}
                    aria-pressed={hecho}
                  >
                    <span className="step__num">{i + 1}</span>
                    <span>{paso}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          {hechos.length === receta.pasos.length && (
            <p className="finish">Listo. Buen provecho.</p>
          )}

          {receta.tip && (
            <p className="tip">
              <span className="eyebrow">Tip</span>
              {receta.tip}
            </p>
          )}
        </section>
      </div>
    </article>
  )
}

export default RecipeDetail
