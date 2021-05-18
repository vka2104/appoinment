import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSlotComponent } from './list-slot/list-slot.component';

const routes: Routes = [
  {
    path:"list", component: ListSlotComponent
  },
  {
    path:"**", redirectTo: "list"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotsRoutingModule { }
