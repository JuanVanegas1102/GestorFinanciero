import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoriaResponse, categoriaSeleccionadaResponse} from '../modelos/responses';

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
  formularioCategoria!: FormGroup;
  mensajeError!: string;
  responseCode!: number;
  hayError:boolean = false;
  public show:boolean = false;
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
        next: res => this.mostrarError("Envio exitoso!!!!"),
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

    this.http.post("http://127.0.0.1:8000/ingresarDinero",datosFormulario).subscribe(
      {
        next: res=> this.mostrarError("Envio exitoso!!!!"),
        error: err => this.mostrarError("Error al enviar el formulario")
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

    this.http.post("http://127.0.0.1:8000/retirarDinero",datosFormulario).subscribe(
      {
        next: res=> this.mostrarError("Envio exitoso!!!!"),
        error: err => this.mostrarError("Error al enviar el formulario")
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

  limpiarHistorial(dato:number){

    const datosFormulario = {
      dato:dato,
    }

    this.hayError = false
    console.log(dato)

    this.http.post("http://127.0.0.1:8000/limpiarHistorial",datosFormulario).subscribe(
      {
        next: res=> this.mostrarError("Envio exitoso!!!!"),
        error: err => this.mostrarError("Error al enviar el formulario")
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
        next: res=> this.mostrarError("Envio exitoso!!!!"),
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
}
