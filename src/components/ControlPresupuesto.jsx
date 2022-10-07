import React from 'react'
import { useEffect, useState } from 'react'

import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
  presupuesto, 
  gastos, 
  setAumentar, 
  setGastos, 
  setPresupuesto, 
  setIsValidPresupuesto
}) => {

    const[disponible, setDisponible] = useState(0)
    const[gastado, setGastado] = useState(0)
    const[porcentaje, setPorcentaje] = useState(0)

    const totalGastado = gastos.reduce( (total, gasto ) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado
    // calcular porcentaje gastado
    const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(1)

    useEffect(() => { 
        setGastado(totalGastado)
        setPorcentaje(nuevoPorcentaje)
        setDisponible(totalDisponible) 
    }, [gastos])

    useEffect(() => {
      setPorcentaje(nuevoPorcentaje)
      setDisponible(totalDisponible) 
    }, [presupuesto])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency', currency: 'USD'
        })
    }

    const handleReset = () => {
      const resultado = confirm('¿Deseas borrar el presupuesto y todos los gastos?')

      if(resultado){
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
      }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
        <CircularProgressbar
        value={porcentaje}
        text={`${porcentaje}% gastado`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#3b82f6",
          textColor: "#fff",
          pathColor: porcentaje > 100 ? "#DC2626" : "#fff",
          trailColor: "#c9c9c9",
          pathTransitionDuration: 2,
        })}
      />

        </div>
        <div className='contenido-presupuesto'>
          <div className='flexible'>
          <button
              className="reset-appx"
              type="button"
              onClick={ () => setAumentar(true)}
            >
              +presupuesto
            </button>

            <button
              className="reset-app"
              type="button"
              onClick={handleReset}
            >
              Resetear ♠
            </button>
            
          </div>
            
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 && 'negativo'}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
            
        </div>

    </div>
  )
}

export default ControlPresupuesto