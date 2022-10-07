import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import {generarId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [aumentar, setAumentar] = useState(false)
  const [extraPresupuesto, setExtraPresupuesto] = useState(0)
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

// *********************************LUGAR DE LOS USE EFECT***********************
  useEffect(() =>{
    if(Object.entries(gastoEditar).length != 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 250)
      
    }

  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0 ){
      setIsValidPresupuesto(true)
    }

  },[])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

    const handleNuevoGasto = (e) => {
      setModal(true)
      setGastoEditar({})

      setTimeout(() => {
        setAnimarModal(true)
      }, 250)
    }

    useEffect(() => {
      if(filtro){
        // filtrar gastos por la categoria seleccionada
        const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)

        setGastosFiltrados(gastosFiltrados)
      }
    }, [filtro])

// *********************************FIN DEL LUGAR DE LOS USE EFECT***********************

  const guardarGasto = gasto => {
    if(gastoEditar.id){
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      // Nuevo gasto

      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
  }

  const masPresupuesto = extra => {
    setPresupuesto(presupuesto + Number(extra))
  } 

  const eliminarGasto = id => {
    // ( gastosActualizados es una copia del state de gstos pero 
    // aqui se sacan todos los gastos diferentes al que seleccionamos basado en el id ) y ese state/objeto/conjuntoDeDatos
    // se pasa a setGastos y asi gastos es igual a gastosActualizados que es como dice al principio del comentario 
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        handleNuevoGasto={handleNuevoGasto}
        setAumentar={setAumentar}
      />

      {isValidPresupuesto && (

        <div>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
            
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='Icono de nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
      </div>
      )}

      {modal || aumentar ? <Modal 
        setModal={setModal} 
        gastoEditar={gastoEditar}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}

        guardarGasto={guardarGasto}
        setGastoEditar={setGastoEditar}

        setAumentar={setAumentar}
        aumentar={aumentar}
        setExtraPresupuesto={setExtraPresupuesto}
        extraPresupuesto={extraPresupuesto}
        masPresupuesto={masPresupuesto}
      >
      </Modal> : ''}
      
    </div>
  )
}

export default App
