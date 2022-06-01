import React from 'react'; 

export const Home = () => {
  return (
      <>

     <h3>Gestión de Gastos Comunes</h3>
   <div>
     <p>Este sistema permite registar los ingresos y gastos de un condominio.</p>
     <p>El sistema administra dos fondos: el Fondo de Operación y el Fondo de Emergencia.</p>
   <p> Los ingresos se regitran en parte como ingresos al Fondo de Operación y en parte como aportes al
      Fondo de Emergencia, de acuerdo a montos establecidos para cada casa.</p>
     <p>Con esos valores se pueden generar 2 tipos de informes:</p>
     <li>Informes mensuales de ingresos, gastos y saldos del Fondo Normal y del Fondo de Emergencia.</li>
     <li>Informes individuales, con los ingresos pagados por una casa específica.</li>
        
   </div>
<br></br>
      </>
  )
}
