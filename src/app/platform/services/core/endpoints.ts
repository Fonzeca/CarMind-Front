const endpoints = {
  auth:{
    login: "/login",
    loggedUser:"/loggedUser",
    put_user:"/usuario"
  },
  vehicles:{
    post:"/vehiculo",
    put:"/vehiculo",
    get_all:"/vehiculo",
    get_by_id:"/vehiculo/:id",
    get_check:"/vehiculo/:id/check",
    get_document:"/vehiculo/:id/documento/:tipo",
    get_document_by_vehicle:"/vehiculo/:id/documentos",
    post_upload_document:"/vehiculo/:id/:tipo/upload",
    delete:"/vehiculo/:id",
    post_assign_evaluation:"/vehiculo/:id",
  },
  forms:{
    get_all:'/evaluacion',
    get_by_id:'/evaluacion/:id',
    get_all_history:'/evaluacion/historial',
    get_history_by_logged_user:'/evaluacion/historial/loggedUser',
  },
  types:"/tipos",
  users:{
    get_all:"/usuario",
    post:"/usuario",
    put:"/usuario",
    delete:"/usuario/:id"
  },
  notifications:{
    get:"/notificaciones"
  }
};
export default endpoints;
