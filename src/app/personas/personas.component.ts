import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../personas.service';
import { LogginService } from '../LoggingService.service';
import { Persona } from '../persona.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private personasService: PersonasService,
              private router: Router){}

  ngOnInit(): void {
    this.personasService.obtenerPersonas()
    .subscribe(
      (personas: Persona[]) => {
        this.personas = personas;
        this.personasService.setPersonas(personas);
      }
    );
  }

  agregar(){
    this.router.navigate(['personas/agregar']);
  }
}
