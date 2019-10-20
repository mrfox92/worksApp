import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrabajosService } from '../../services/trabajos.service';
import Swal, { SweetAlertType } from 'sweetalert2';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  nuevoTrabajo: Trabajo = {
    title: '',
    description: '',
    annotation: '',
    total: 0
  };

  constructor( private trabajosService: TrabajosService ) { }

  ngOnInit() {
  }

  getMessage( titulo: string, texto: string, tipo: SweetAlertType ) {

    Swal.fire({
      title: titulo,
      text: texto,
      type: tipo,
      confirmButtonText: 'Ok',
      timer: 2000
    });
  }

  createWork( forma: NgForm ) {

    if ( forma.invalid ) {

      console.log('El formulario no es válido');
      return;
    }
    console.log('El formulario es valido');
    //  console.log( forma.form.value );
    //  capitalizamos las propiedades
    this.nuevoTrabajo.title = this.capitalizarString( this.nuevoTrabajo.title );
    this.nuevoTrabajo.description = this.capitalizarString( this.nuevoTrabajo.description );
    //  capitalizamos solo si la cadena de texto no esta vacia
    if ( this.nuevoTrabajo.annotation.trim() ) {

      this.nuevoTrabajo.annotation = this.capitalizarString( this.nuevoTrabajo.annotation );
    }

    this.trabajosService.createWork( this.nuevoTrabajo ).subscribe( (resp: any) => {

      if ( resp.ok ) {
        //  console.log('Trabajo creado exitosamente');
        this.getMessage( 'Trabajo agregado!', 'Trabajo creado exitosamente', 'success' );

        forma.reset();
      } else {
        this.getMessage( 'Error!', 'El trabajo no ha podido ser creado', 'error' );
      }

    });
  }

  capitalizarString( cadena: string ): string {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  }

}
