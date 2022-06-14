


export const columnGasto = [
    { title: 'Gasto', dataIndex: 'Casa/Gasto', key: 'colg1', },
    { title: 'Descripción del gasto', dataIndex: 'Descripcion', key: 'colg2', },
    { title: 'Enero', dataIndex: 'Ene', key: 'Ene', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Febrero', dataIndex: 'Feb', key: 'Feb', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Marzo', dataIndex: 'Mar', key: 'Mar', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Abril', dataIndex: 'Abr', key: 'Abr', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Mayo', dataIndex: 'May',  key: 'May', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Junio', dataIndex: 'Jun', key: 'Jun', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Julio', dataIndex: 'Jul', key: 'Jul', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Agosto', dataIndex: 'Ago', key: 'Ago', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Septiembre', dataIndex: 'Sep', key: 'Sep', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Octubre', dataIndex: 'Oct',  key: 'Oct', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Noviembre', dataIndex: 'Nov', key: 'Nov', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Diciembre', dataIndex: 'Dic', key: 'Dic', align: 'right', render: ((monto) => formatNumber( monto) ) },
   ];
   export const columnIngreso = [
    { title: 'Casa', dataIndex: 'Casa/Gasto', key: 'coli1', },
    { title: 'Comunero/a', dataIndex: 'Descripcion', key: 'coli2', },
    { title: 'Enero', dataIndex: 'Ene', key: 'Ene', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Febrero', dataIndex: 'Feb', key: 'Feb', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Marzo', dataIndex: 'Mar', key: 'Mar', align: 'right', render: ((monto) => formatNumber( monto) )},
    { title: 'Abril', dataIndex: 'Abr', key: 'Abr', align: 'right', render: ((monto) => formatNumber( monto) )},
    { title: 'Mayo', dataIndex: 'May',  key: 'May', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Junio', dataIndex: 'Jun', key: 'Jun', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Julio', dataIndex: 'Jul', key: 'Jul', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Agosto', dataIndex: 'Ago', key: 'Ago', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Septiembre', dataIndex: 'Sep', key: 'Sep', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Octubre', dataIndex: 'Oct',  key: 'Oct', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Noviembre', dataIndex: 'Nov', key: 'Nov', align: 'right', render: ((monto) => formatNumber( monto) ) },
    { title: 'Diciembre', dataIndex: 'Dic', key: 'Dic', align: 'right', render: ((monto) => formatNumber( monto) ) },
   ];
    export const optionInforme=
   [
       { atributo: "INGRESO_NORMAL", valor: "Ingreso fondo normal" },
       { atributo: "INGRESO_EMERGENCIA", valor: "Ingreso fondo emergencia" },
       { atributo: "INGRESO_TODOS", valor: "Ingresos totales" },
       { atributo: "GASTO_NORMAL", valor: "Gasto fondo normal" },
       { atributo: "GASTO_EMERGENCIA", valor: "Gasto fondo emergencia" },
       { atributo: "GASTO_TODOS", valor: "Gasto totales" },
   ]
   export const optionInformeMov=
   [
       { atributo: "NORMAL", valor: "Fondo normal" },
       { atributo: "EMERGENCIA", valor: "Fondo emergencia" },
    ]
    export const columnMov = [
        { title: 'Fecha', dataIndex: 'Fecha', key: 'fecha', },
        { title: 'Descripcion', dataIndex: 'comentario', key: 'comentario', },
        { title: 'Ingreso', dataIndex: 'Ingreso', key: 'Ingreso', align: 'right', render: ((monto) => formatNumber( monto) ) },
        { title: 'Gasto', dataIndex: 'Gasto', key: 'Gasto', align: 'right', render: ((monto) => formatNumber( monto) ) },
        { title: 'Saldo', dataIndex: 'Saldo', key: 'Saldo', align: 'right', render: ((monto) => formatNumber( monto) ) },
       ];
       export const columnDetIngreso = [
        { title: 'Fecha ingreso', dataIndex: 'fechaDocumento', key: 'fechaDocumento', },
        { title: 'Comentario', dataIndex: 'comentario', key: 'comentario', },
        { title: 'Monto ingreso', dataIndex: 'montoIngreso', key: 'montoIngreso',align: 'right', render: ((monto) => ( monto !=='' )?formatNumber( parseInt( monto)):'' ) },
        { title: 'Asignado a', dataIndex: 'descripcion', key: 'descripcion', },
        { title: 'Fecha mov.', dataIndex: 'fechaMovimiento', key: 'fechaMovimiento', },
        { title: 'Mes cancela', dataIndex: 'mesPago', key: 'mes', },
        { title: 'Monto', dataIndex: 'monto', key: 'monto', align: 'right', render: ((monto) => formatNumber( monto) ) },
       ];
   const formatNumber = (value) =>{
            return  value.toLocaleString("es-CL");
    };
  
