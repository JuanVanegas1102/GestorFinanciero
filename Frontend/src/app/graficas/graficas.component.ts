import { Component } from '@angular/core';
import { DatosPastelResponse, DatosResponse, categoriaResponse, categoriaSeleccionadaResponse } from '../modelos/responses';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent {

  listaCategoria: Array<any> = [

  ];
  listaDatosGraficas: any[ ]= [];
  dataset: any[ ]= [];
  datasetPastel: any[ ]= [];
  listaDatosPastel: any[ ]= [];
  mensajeError!: string;
  responseCode!: number;
  hayError:boolean = false;

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };


  constructor(private http : HttpClient,private  fb:FormBuilder, private router:Router, private chart:NgxChartsModule)
  {
    
  }
  ngOnInit(){

      this.http.get<categoriaResponse>("http://127.0.0.1:8000/listaCategoria").subscribe(
      {
        next:(res)=>{
          this.listaCategoria = res.data
          console.log(this.listaCategoria)
        },
        error: (error) => {
          console.log(error)
        }
      })


      this.http.get<DatosPastelResponse>("http://127.0.0.1:8000/listaDatosPastel").subscribe(
      {
        next:(res)=>{
          
          for (let i=0;i<res.data.length;i++){
            console.log(typeof(res.data[i][0]))
            this.datasetPastel.push({name: res.data[i][0],value: res.data[i][1]});
          }
          this.listaDatosPastel = this.datasetPastel
          console.log(this.listaDatosGraficas)
          console.log(this.datasetPastel)
        },
        error: (error) => {
          console.log(error)
        }
      })

  }

  mostrarError(mensaje:string){
    this.hayError = true
    this.mensajeError = mensaje
  }

  cambiarCategoria(value:any){

    const datoCategoria = { 
      seleccionCategoria: value.target.value
    }

    this.hayError = false;
    console.log(datoCategoria);
    this.listaDatosGraficas = [];
    this.dataset = [];
  
    this.http.post("http://127.0.0.1:8000/seleccionCategoria",datoCategoria).subscribe(
      {
        next: res => this.mostrarError("Categoria recuperada exitosamente!!!!"),
        error: err => this.mostrarError("Error al enviar la Categoria")
      })

      this.http.get<categoriaSeleccionadaResponse>("http://127.0.0.1:8000/listaDatosGraficas").subscribe(
      {
        next:(res)=>{
          
          for (let i=0;i<res.data.length;i++){
            console.log(typeof(res.data[i][0]))
            this.dataset.push({name: res.data[i][0],value: res.data[i][1]});
          }
          this.listaDatosGraficas = this.dataset
          console.log(this.listaDatosGraficas)
          console.log(this.dataset)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
}
