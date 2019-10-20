import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrabajosService } from '../../services/trabajos.service';
import Swal, { SweetAlertType } from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalTrabajo: Trabajo;

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

  updateDataWork( forma: NgForm ) {

    if ( !forma.valid ) {
      this.getMessage( 'Error!', 'El formulario no es valido, por favor reintente', 'error' );
      return;
    }

    this.trabajosService.updateWorkById( this.modalTrabajo ).subscribe( (resp: any) => {

      if ( resp.ok ) {

        this.getMessage( 'Actualizado', 'Datos Actualizados correctamente', 'success' );

      } else {
        this.getMessage( 'Error!', 'El formulario no es valido, por favor reintente', 'error' );
      }

    });

  }

}
