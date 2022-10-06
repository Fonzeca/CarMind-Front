const endpoints = {
  auth:{
    login: "/login",
    loggedUser:"/loggedUser",
    put_user:"/usuario",
    firstLogin:"/usuario/newPassword",
    sendEmailToChangePass: "/public/usuario/recuperar",
    sendCodeToChangePass: "/public/usuario/validateRecoverToken",
    changePassword: "/public/usuario/resetPassword"
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
      delete:'/evaluacion/:id'
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
  },
  trackin:{
    get_last_log:"/trackin/getLastLogByImei",
    get_route:"/trackin/getRouteByImei",
    get_vehicles_state_by_imeis: "/trackin/getVehiclesStateByImeis",
    get_zones_by_empresa_id: "/trackin/getZonesByEmpresaId",
    create_zone: "/trackin/createZone",
    edit_zone_by_id: "/trackin/editZoneById",
    delete_zone: "/trackin/deleteZoneById",
  }
};
export default endpoints;
