import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({
  presupuesto, 
  setPresupuesto, 
  isValidPresupuesto, 
  setIsValidPresupuesto, 
  gastos, 
  setAumentar,
  setGastos
}) => {

  return (
    <header>
        <h1>PLANIFICADOR DE GASTOS</h1>

        {isValidPresupuesto ? (
          <ControlPresupuesto 
            presupuesto={presupuesto}
            gastos={gastos}
            setAumentar={setAumentar}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          >

          </ControlPresupuesto>
        ) : (
          <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )}
        
    </header>
    
  )
}

export default Header