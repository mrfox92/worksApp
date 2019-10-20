import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input() trabajos: any [] = [];
  modalTrabajo: any[] = [];

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  verDetalle( id: string ) {
    //  console.log( 'click', id );
    //  redireccionamos a la url que solicitara el servicio
    this.router.navigate(['/detalle', id]);
  }

  getWorkModal( trabajo: any[] ) {
    this.modalTrabajo = trabajo;
  }

  print( id: string ) {
    this.router.navigate(['/imprimir', id]);
  }

}
