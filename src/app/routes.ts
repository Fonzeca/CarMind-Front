export const AppRoutes = {
    auth: {
      login:"login"
    },
    get platform() {
      return {
        route:"platform",
        main:"platform",
        get forms(){
          return {
            route:`${this.route}/forms`,
            main:"forms",
            get create(){
              return {
                route:`${this.route}/create`,
                main:"create"
              }
            }
          }
        },
        get vehicles() {
          return {
            route: `${this.route}/vehicles`,
            main:"vehicles",
            get review(){
              return {
                route(id:any){
                  return this._route.replace(":id", id);
                },
                _route:`${this.route}/:id/review`,
                main:":id/review",
                get view(){
                  return {
                    route(vehicle_id:any, review_id:any){
                      return this._route.replace(":id", vehicle_id).replace(":review_id", review_id);
                    },
                    _route:`${this._route}/:review_id`,
                    main:`${this.main}/:review_id`.toString()
                  }
                }
              }
            }
          }
        },
        get my_account(){
          return {
            route:`${this.route}/my-account`,
            main:"my-account",
          }
        },
        get users(){
          return {
            route:`${this.route}/users`,
            main:"users",
          }
        },
      }
    }
}
