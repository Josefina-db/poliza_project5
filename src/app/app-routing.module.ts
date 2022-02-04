import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DisplayInfoComponent } from './components/display-info/display-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'displayInfo', component: DisplayInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
