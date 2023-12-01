from fastapi import FastAPI
from fastapi.middleware import Middleware
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from BD import ConexionBD
    
class categoria(BaseModel):
    idcategoria:str
    nombrecategoria:str
    
class nuevaCategoria(BaseModel):
    nombreCategoria:str

class dinero(BaseModel):
    valor: int
    fecha: str

class seleccionCategoria(BaseModel):
    seleccionCategoria: str
    
class limpiar(BaseModel):
    dato: str


app = FastAPI()

origins = [
    "http://localhost:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/listaCategoria')
async def root():
    result = ConexionBD.consultarCategoria()
    return {"data":result}

@app.post('/seleccionCategoria')
async def root(s:seleccionCategoria):
    result = ConexionBD.guardarCategoriaSeleccionada(s.seleccionCategoria)
    return {"message":"Enviada peticion"}

@app.get('/listaHistorialCategorizado')
async def root():
    result = ConexionBD.consultarHistorialCategoria()
    return {"data":result}

@app.post('/ingresarDinero')
async def root(s:dinero):
    valid = ConexionBD.ingresarDinero(s.valor,s.fecha)
    if valid:
        return {"message":"Dinero Ingresado exitosamente",
                "codigo" : 202}
    else:
        return {"message":"No se puede ingresar una fecha anterior a la del ultimo movimiento",
                "codigo" : 404}

@app.post('/retirarDinero')
async def root(s:dinero):
    valid = ConexionBD.retirarDinero(s.valor,s.fecha)
    if valid:
        return {"message":"Dinero Retirado exitosamente",
                "codigo" : 202}
    else:
        return {"message":"No se puede retirar mas cantidad de la existente en la categoria o retirar en una fecha anterior al ultimo movimiento",
                "codigo" : 404}

@app.post('/limpiarHistorial')
async def root(s:limpiar):
    result = ConexionBD.limpiarHistorial(s.dato)
    return {"message":"Enviada peticion"}

@app.post('/agregarCategoria')
async def root(s:nuevaCategoria):
    result = ConexionBD.agregarCategoria(s.nombreCategoria)
    return {"message":"Enviada peticion"}

