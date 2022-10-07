import React from 'react'
import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import Cerrar from '../img/cerrar.svg'

const Modal = ({
  setModal,
  animarModal, 
  setAnimarModal, 
  guardarGasto, 
  gastoEditar, 
  setGastoEditar, 
  aumentar, 
  setAumentar,
  setExtraPresupuesto,
  extraPresupuesto,
  masPresupuesto,
}) => {

  const [ nombre, setNombre ] = useState('')
  const [ cantidad, setCantidad ] = useState('')
  const [ categoria, setCategoria ] = useState('')
  const [ alerta, setAlerta] = useState('')
  const [ fecha, setFecha] = useState('')
  const [ id, setId] = useState('')

  useEffect(() => {

    if(Object.entries(gastoEditar).length != 0){
      setModal(true)
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 250)
      
    }

  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    if([nombre, cantidad, categoria].includes('') || cantidad < 1 ){
      setAlerta('Los campos son obligatorios')
      setTimeout(() => {
        setAlerta('')
      }, 2000);
      return
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
    // ocultar el modal despues de guardar los datos en el arreglo
    // (revisar esta parte si hay errores mas adelante)
    ocultarModal()
  }

  const handleSend = e => {
    e.preventDefault();

    if( Number(extraPresupuesto) === 0 ){
      setAlerta('Los campos son obligatorios')
      setTimeout(() => {
        setAlerta('')
      }, 2000);
      return
    }

    masPresupuesto(Number(extraPresupuesto))
    // ocultar el modal despues de guardar los datos en el arreglo
    // (revisar esta parte si hay errores mas adelante)
    ocultarModal()
  }

  const ocultarModal = () => {

    setAumentar(false)
    setAnimarModal(false)
    setGastoEditar({})

      setTimeout(() => {
        setModal(false) 
        
      }, 350)
  }

  return (
    <div className="modal">
        <div className='cerrar-modal'>
            <img src={Cerrar} alt="Icono para Cerrar el modal" 
            onClick={ocultarModal}
            />
        </div>

        {aumentar ? 

          <form action="" onSubmit={handleSend} className="formulario">
            {alerta && <Alerta tipo='error'>{alerta}</Alerta> }

            <div className="campo">
              <label htmlFor="extra">Dinero Extra</label>
              <input type="number" placeholder='añade la cantidad del gasto' id='cantidad'
              value={extraPresupuesto} onChange={ e => {setExtraPresupuesto(Number(e.target.value))}}
              />
            </div>

            <input type="submit" value="Añadir extra" />
          </form> 

        : 
      
          <form action="" onSubmit={handleSubmit}
          className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
            <legend>{Object.entries(gastoEditar).length != 0 ? 'Editar Gasto' : 'Nuevo gasto'}</legend>
  
            {alerta && <Alerta tipo='error'>{alerta}</Alerta> }
  
            <div className="campo">
              <label htmlFor="nombre">Nombre Gasto</label>
              <input type="text" placeholder='añade el nombre del gasto' id='nombre' 
              value={nombre} onChange={ (e) => {setNombre(e.target.value) }}
              />
            </div>
  
            <div className="campo">
              <label htmlFor="cantidad">Cantidad</label>
              <input type="number" placeholder='añade la cantidad del gasto' id='cantidad' 
              value={cantidad} onChange={ e => {setCantidad(Number(e.target.value))}}
              />
            </div>
  
            <div className='campo'>
              <label htmlFor="categoria">Categoria</label>
  
              <select id="categoria"
              value={categoria} onChange={ (e) => {setCategoria(e.target.value) }}
              >
                <option value="">--Selecciona una categoria--</option>
                <option value="ahorro">ahorro</option>
                <option value="comida">comida</option>
                <option value="casa">casa</option>
                <option value="salud">salud</option>
                <option value="ocio">ocio</option>
                <option value="suscripciones">suscripciones</option>
                <option value="gastos">Gastos varios</option>
              </select>
  
            </div>
  
            <input type="submit" value={Object.entries(gastoEditar).length != 0 ? 'Editar' : 'Añadir'} />
          </form>
        }

        
    </div>
  )
}

export default Modal