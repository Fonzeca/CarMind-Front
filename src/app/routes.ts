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
