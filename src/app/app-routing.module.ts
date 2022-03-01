import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      loadChildren:  () => import('./platform/platform.module').then(m=> m.PlatformModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true, // <- Indicar que se use el hash
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
