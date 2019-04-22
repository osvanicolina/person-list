import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonasComponent } from './personas/personas.component';
import { Persona } from './persona.model';
import { LoginService } from './login/login.service';

@Injectable()
export class DataServices{
    constructor(private httpClient: HttpClient,
                private loginService: LoginService){}
    
    //Cargar Personas
    cargarPersonas(){
        const token = this.loginService.getIdToken();
        return this.httpClient.get('https://listado-personas-853ee.firebaseio.com/datos.json?auth=' + token);
    }

    //Guardar personas
    guardarPersonas(personas: Persona[]){
        const token = this.loginService.getIdToken();
        this.httpClient.put('https://listado-personas-853ee.firebaseio.com/datos.json?auth=' + token, personas)
        .subscribe(
            response => console.log("Resultado de guardar Personas: " + response),
            error => console.log("Error al guardar Personas: " + error)
        ); //Es importante que la dirección termine en .json, post es para que guarde y put para que reemplace
    }

    //modificar persona
    modificarPersona(index: number, persona: Persona){
        const token = this.loginService.getIdToken();
        let url: string;
        url = 'https://listado-personas-853ee.firebaseio.com/datos/' + index + '.json?auth=' + token;
        this.httpClient.put(url, persona)
            .subscribe(
                response => console.log("Resultado modificar Persona: " + response),
                error => console.log("Error modificar Persona: " + error)
            );
    }

    //Eliminar persona
    eliminarPersona(index:number){
        const token = this.loginService.getIdToken();
        let url: string;
        url = 'https://listado-personas-853ee.firebaseio.com/datos/' + index + '.json?auth=' + token;
        this.httpClient.delete(url)
            .subscribe(
                response => console.log("Resultado eliminar Persona: " + response),
                error => console.log("Error eliminar Persona: " + error)
            );
    }
}