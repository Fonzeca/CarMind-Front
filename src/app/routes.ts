export const AppRoutes = {
    auth: {
      login:"login",
      change_password: "change_password",
      enter_email: "enter_email",
      enter_code: "enter_code"
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
            },
            get createName(){
              return {
                route:`${this.route}/create/:name`,
                main:"create/:name"
              }
            },
            get update(){
              return {
                route(id:any){
                  return this._route.replace(":id", id);
                },
                _route:`${this.route}/update/:id`,
                main:"update/:id"
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
            },
            get evaluation(){
              return {
                route(id:any){
                  return this._route.replace(":id", id);
                },
                _route:`${this.route}/:id/evaluation`,
                main:":id/evaluation",
                get view(){
                  return {
                    route(vehicle_id:any, evaluation_id:any){
                      return this._route.replace(":id", vehicle_id).replace(":evaluation_id", evaluation_id);
                    },
                    _route:`${this._route}/:evaluation_id`,
                    main:`${this.main}/:evaluation_id`.toString()
                  }
                }
              }
            },
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
        get gps(){
          return {
            route:`${this.route}/gps`,
            main:"gps",
            get vehicles(){
              return {
                route:`${this.route}/vehicles`,
                main:"vehicles",
                get details(){
                  return {
                    route:`${this.route}/details`,
                    main:"details"
                  }
                }
              }
            },
            get zones(){
              return {
                route:`${this.route}/zones`,
                main:"zones",
                get details(){
                  return {
                    route:`${this.route}/details`,
                    main:"details"
                  }
                }
              }
            }
          }
        },
        get maintenance(){
          return {
            route:`${this.route}/maintenance`,
            main:"maintenance",
            get defects(){
              return {
                route:`${this.route}/defects`,
                main:"defects",
              }
            },
            get service(){
              return {
                route:`${this.route}/service`,
                main:"service",
              }
            },
            get defect(){
              return {
                route(id:any){
                  return this._route.replace(":id", id);
                },
                _route:`${this.route}/defect/details/:id`,
                main:`${this.route}/defect/details/:id`,
              }
            }
          }
        },
      }
    }
}