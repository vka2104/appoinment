import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules, NoPreloading, PreloadingStrategy } from "@angular/router";

const routes: Routes = [
  {
    path:"home", loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule)
  },
  {
    path:"slots", loadChildren: () => import('./slots/slots.module').then(m => m.SlotsModule)
  },
  {
    path:"**", redirectTo:"home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
