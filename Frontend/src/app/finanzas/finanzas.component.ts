import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoriaResponse, categoriaSeleccionadaResponse, EliminarCatResponse, IngresarResponse, RetirarResponse, TransferirResponse} from '../modelos/responses';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrl: './finanzas.component.css'
})
export class FinanzasComponent {

  listaCategoria: Array<any> = [];
  listaHistorialCategorizado: Array<any> = [];
  formularioIngresar!: FormGroup;
  formularioRetirar!: FormGroup;
  formularioTransferir!: FormGroup;
  formularioCategoria!: FormGroup;
  mensajeError!: string;
  responseCode!: number;
  hayError:boolean = false;
  public show:boolean = false;
  public show2:boolean = false;
  public buttonName:any = 'Show';

  constructor(private http : HttpClient,private  fb:FormBuilder, private router:Router)
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

      this.crearFormularioIngresar()
      this.crearFormularioRetirar()
      this.crearFormularioTransferir()
      this.crearFormularioCategoria()
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
  
    this.http.post("http://127.0.0.1:8000/seleccionCategoria",datoCategoria).subscribe(
      {
        next: res => this.mostrarError("Categoria recuperada exitosamente!!!!"),
        error: err => this.mostrarError("Error al enviar la Categoria")
      })

      this.http.get<categoriaSeleccionadaResponse>("http://127.0.0.1:8000/listaHistorialCategorizado").subscribe(
      {
        next:(res)=>{
          this.listaHistorialCategorizado = res.data
          console.log(this.listaHistorialCategorizado)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  agregarDinero(){
    
    const datosFormulario = {
      valor:this.formularioIngresar.value.valor,
      fecha:this.formularioIngresar.value.fecha
    }

    this.hayError = false
    console.log(datosFormulario)

    this.http.post<IngresarResponse>("http://127.0.0.1:8000/ingresarDinero",datosFormulario).subscribe(
      {
        next: res => this.completarRetirar(res.codigo,res.message),
        error: err => this.completarRetirar(404,"Hubo un Error con el servidor, Intentalo nuevamente")
      })

    this.http.get<categoriaSeleccionadaResponse>("http://127.0.0.1:8000/listaHistorialCategorizado").subscribe(
      {
        next:(res)=>{
          this.listaHistorialCategorizado = res.data
          console.log(this.listaHistorialCategorizado)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  retirarDinero(){
    
    const datosFormulario = {
      valor:this.formularioRetirar.value.valor,
      fecha:this.formularioRetirar.value.fecha
    }

    this.hayError = false
    console.log(datosFormulario)

    this.http.post<RetirarResponse>("http://127.0.0.1:8000/retirarDinero",datosFormulario).subscribe(
      {
        next: res => this.completarRetirar(res.codigo,res.message),
        error: err => this.completarRetirar(404,"Hubo un Error con el servidor, Intentalo nuevamente")
      })

    
  }

  async completarRetirar(code:number,message:string){
    this.responseCode = code
    this.mensajeError = message
    if(this.responseCode ==404){
      this.hayError = true
    }else{

      this.http.get<categoriaSeleccionadaResponse>("http://127.0.0.1:8000/listaHistorialCategorizado").subscribe(
      {
        next:(res)=>{
          this.listaHistorialCategorizado = res.data
          console.log(this.listaHistorialCategorizado)
        },
        error: (error) => {
          console.log(error)
        }
      })

    }
  }


  limpiarHistorial(dato:number){

    const datosFormulario = {
      dato:dato,
    }

    this.hayError = false
    console.log(dato)

    this.http.post("http://127.0.0.1:8000/limpiarHistorial",datosFormulario).subscribe(
      {
        next: res=> this.mostrarError("Datos eliminados correctamente!!!!"),
        error: err => this.mostrarError("Error al limpiar el historial.")
      })
    
    this.http.get<categoriaSeleccionadaResponse>("http://127.0.0.1:8000/listaHistorialCategorizado").subscribe(
        {
          next:(res)=>{
            this.listaHistorialCategorizado = res.data
            console.log(this.listaHistorialCategorizado)
          },
          error: (error) => {
            console.log(error)
          }
        })
  }

  agregarCategoria(){
    
    const datosFormulario = {
      nombreCategoria:this.formularioCategoria.value.nombreCategoria
    }

    this.hayError = false
    console.log(datosFormulario)

    this.http.post("http://127.0.0.1:8000/agregarCategoria",datosFormulario).subscribe(
      {
        next: res=> this.mostrarError("Categoria agregada exitosamente!!!!"),
        error: err => this.mostrarError("Error al enviar el formulario")
      })

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
  }

  eliminarCategoria(dato:number){
    
    const datosFormulario = {
      dato:dato,
    }

    this.hayError = false
    console.log(datosFormulario)

    this.http.post<EliminarCatResponse>("http://127.0.0.1:8000/eliminarCategoria",datosFormulario).subscribe(
      {
        next: res => this.completarRetirar(res.codigo,res.message),
        error: err => this.completarRetirar(404,"Hubo un Error con el servidor, Intentalo nuevamente")
      })

    
  }

  cambiarCategoriaEliminar(value:any){

    const datoCategoria = { 
      seleccionCategoria: value.target.value
    }

    this.hayError = false;
    console.log(datoCategoria);
  
    this.http.post("http://127.0.0.1:8000/seleccionCategoriaEliminar",datoCategoria).subscribe(
      {
        next: res => this.mostrarError("Categoria a Eliminar recuperada exitosamente!!!!"),
        error: err => this.mostrarError("Error al enviar la Categoria a Eliminar")
      })
  }

  cambiarCategoriaTransferir(value:any){

    const datoCategoria = { 
      seleccionCategoria: value.target.value
    }

    this.hayError = false;
    console.log(datoCategoria);
  
    this.http.post("http://127.0.0.1:8000/seleccionCategoriaTransferir",datoCategoria).subscribe(
      {
        next: res => this.mostrarError("Categoria a Transferir recuperada exitosamente!!!!"),
        error: err => this.mostrarError("Error al enviar la Categoria a Transferir")
      })
  }

  transferirDinero(){
    
    const datosFormulario = {
      valor:this.formularioTransferir.value.valor,
      fecha:this.formularioTransferir.value.fecha
    }

    this.hayError = false
    console.log(datosFormulario)

    this.http.post<TransferirResponse>("http://127.0.0.1:8000/transferirDinero",datosFormulario).subscribe(
      {
        next: res => this.completarRetirar(res.codigo,res.message),
        error: err => this.completarRetirar(404,"Hubo un Error con el servidor, Intentalo nuevamente")
      })
    
    this.http.get<categoriaSeleccionadaResponse>("http://127.0.0.1:8000/listaHistorialCategorizado").subscribe(
      {
        next:(res)=>{
          this.listaHistorialCategorizado = res.data
          console.log(this.listaHistorialCategorizado)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }



  crearFormularioIngresar(){
    this.formularioIngresar = this.fb.group({
      valor:['',Validators.required],
      fecha:['',Validators.required]
    })
  }
  crearFormularioRetirar(){
    this.formularioRetirar = this.fb.group({
      valor:['',Validators.required],
      fecha:['',Validators.required]
    })
  }
  crearFormularioTransferir(){
    this.formularioTransferir = this.fb.group({
      valor:['',Validators.required],
      fecha:['',Validators.required]
    })
  }

  crearFormularioCategoria(){
    this.formularioCategoria = this.fb.group({
      nombreCategoria:['',Validators.required]
    })
  }


  toggle() {
    this.show = !this.show;

    // Change the name of the button.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  toggle2() {
    this.show2 = !this.show2;

    // Change the name of the button.
    if(this.show2)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
}
