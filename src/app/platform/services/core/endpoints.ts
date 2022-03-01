const endpoints = {
  login: "/login",
  vehicles:{
    post:"/vehiculo",
    put:"/vehiculo",
    get_all:"/vehiculo",
    get_by_id:"/vehiculo/:id",
    get_check:"/vehiculo/:id/check",
    get_document:"/vehiculo/:id/documento/VTV",
    post_document_:"/vehiculo/:id/documento/VTV/upload",
    delete:"/vehiculo/:id",
    post_assign_evaluation:"/vehiculo/:id",
  },
  evaluations:{
    get_all:'/evaluacion',
    get_by_id:'/evaluacion/:id',
  }
};
export default endpoints;
