import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioPaginaComponent } from './inicio-pagina/inicio-pagina.component';
import { ComoUsarComponent } from './como-usar/como-usar.component';
import { FinanzasComponent } from './finanzas/finanzas.component';
import { GraficasComponent } from './graficas/graficas.component';
import { DesarrolladoresComponent } from './desarrolladores/desarrolladores.component';
import { DonacionesComponent } from './donaciones/donaciones.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
    declarations: [
        AppComponent,
        InicioPaginaComponent,
        ComoUsarComponent,
        FinanzasComponent,
        GraficasComponent,
        DesarrolladoresComponent,
        DonacionesComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgxChartsModule
    ]
})
export class AppModule { }
