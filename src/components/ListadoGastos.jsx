import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
        

        <div>
            {gastos.length ? 
              <div className='flexible'>
                <h4>{'<--'} desliza para Eliminar</h4>
                <h4>desliza para Actualizar{'-->'}</h4>
              </div> 
            : ''}
          </div>


          {
            filtro ? (
              <>
              <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta Categoria'}</h2>
                  {gastosFiltrados.map( gasto => (
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                    />
                  ))}
            </>
            ) 
            : (
              <>
              <h2>{gastos.length ? 'Gastos' : 'No hay gastos aun'}</h2>
              {  gastos.map( gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
                ))}
              </>
          )
          }
        
    </div>
  )
}

export default ListadoGastos