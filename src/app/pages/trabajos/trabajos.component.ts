import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../../services/trabajos.service';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {

  trabajos: any[] = [];

  constructor( public trabajosService: TrabajosService ) { }

  ngOnInit() {

    this.trabajosService.getWorks().subscribe( (resp: any) => {

      if ( resp.ok ) {
        this.trabajos = resp.trabajos;
        console.log( this.trabajos );
      } else {
        console.log('No hay trabajos que mostrar');
      }

    });
  }

}
