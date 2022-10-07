import React from 'react'
import { useState, useEffect } from 'react'
const Filtros = ({setFiltro, filtro}) => {
  return (
    <div className="filtros sombra contenedor">
        <form action="">
            <div className='campo'>
                <label htmlFor="">Filtrar Gastos</label>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="">--Todos las Categorias--</option>
                    <option value="ahorro">ahorro</option>
                    <option value="comida">comida</option>
                    <option value="casa">casa</option>
                    <option value="salud">salud</option>
                    <option value="ocio">ocio</option>
                    <option value="suscripciones">suscripciones</option>
                    <option value="gastos">Gastos varios</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros