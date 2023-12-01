import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPaginaComponent } from './inicio-pagina/inicio-pagina.component';
import { AppComponent } from './app.component';
import { ComoUsarComponent } from './como-usar/como-usar.component';
import { DesarrolladoresComponent } from './desarrolladores/desarrolladores.component';
import { DonacionesComponent } from './donaciones/donaciones.component';
import { FinanzasComponent } from './finanzas/finanzas.component';
import { GraficasComponent } from './graficas/graficas.component';

const routes: Routes = [
  {path:'',component:InicioPaginaComponent},
  {path:'comoUsar',component:ComoUsarComponent},
  {path:'desarrolladores',component:DesarrolladoresComponent},
  {path:'donaciones',component:DonacionesComponent},
  {path:'finanzas',component:FinanzasComponent},
  {path:'graficas',component:GraficasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
