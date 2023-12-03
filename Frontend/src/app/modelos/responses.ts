export interface categoriaResponse{
    data:Array<any>
}

export interface categoriaSeleccionadaResponse{
    data:Array<any>
}

export interface IngresarResponse{
    message:string
    codigo:number
}

export interface TransferirResponse{
    message:string
    codigo:number
}

export interface RetirarResponse{
    message:string
    codigo:number
}

export interface EliminarCatResponse{
    message:string
    codigo:number
}

export interface DatosResponse{
    name: string,
    value: number
}

export interface DatosPastelResponse{
    data:Array<any>
}
