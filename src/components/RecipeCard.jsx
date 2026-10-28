function RecipeCard({ receta, numero, onAbrir }) {
  return (
    <li>
      <button className="row" onClick={onAbrir}>
        <span className="row__num">{String(numero).padStart(2, '0')}</span>
        <span className="row__main">
          <span className="row__title">{receta.titulo}</span>
          <span className="row__meta">
            {receta.categoria} · {receta.tiempo} min · {receta.dificultad}
          </span>
        </span>
        <span className="row__arrow" aria-hidden="true">→</span>
      </button>
    </li>
  )
}

export default RecipeCard
