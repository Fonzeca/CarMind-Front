const endpoints = {
  auth:{
    login: "/login",
    loggedUser:"/loggedUser",
    put_user:"/usuario",
    firstLogin:"/usuario/newPassword"
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
    post_assign_evaluation:"/vehiculo/:id/asignarEvaluacion",
    get_forms_by_vehicle:"/vehiculo/:id/formularios",
    get_recent_forms_by_vehicle:"/vehiculo/:id/formularios/historial",
    get_review_history_by_vehicle:"/vehiculo/:id/revision",
    get_forms_pending_to_review_by_vehicle:"/vehiculo/:id/logsParaRevisar",
    post_review:"/revision",
  },
  get forms () {
    return {
      get_all:'/evaluacion',
      get_by_id:'/evaluacion/:id',
      get_historial_by_id:'/evaluacion/historial/:id',
      get_all_history:'/evaluacion/historial',
      get_history_by_logged_user:'/evaluacion/historial/loggedUser',
      post:'/evaluacion',
      get_evaluation:'/evaluacion/:id',
      put:'/evaluacion/:id/modify',
    }
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
