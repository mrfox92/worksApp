import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal, { SweetAlertType } from 'sweetalert2';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  @Input() clientes: Cliente[] = [];
  @Output() cargarClientes = new EventEmitter<string>();

  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) { }

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

    if ( tipo === 'question' ) {
      return Swal.fire({
        title: titulo,
        text: texto,
        type: tipo,
        showConfirmButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Borrar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      });
    }
  }

  listarTrabajos( cliente: Cliente ) {
    this.router.navigate(['cliente/trabajos/', cliente._id ]);
  }

  borrarCliente( cliente: Cliente ) {
    //  preguntar por confirmacion de borrado
    //  No borrar: salir de la notificacion
    //  Borrar: llamar a servicio y pasar el ID del Cliente a borrar
    this.getMessage('Borrar Cliente', `¿Estás seguro que deseas borrar cliente ${ cliente.nombre }?`, 'question')
        .then( respQuestion => {

          if ( !respQuestion.value ) {
            return;
          }
          //  llamamos a nuestro servicio
          this.clientesService.deleteClienteById( cliente._id ).subscribe( (resp: any) => {

            if ( resp.ok ) {
              this.cargarClientes.emit( cliente._id );  //  emitimos el elemento eliminado para quitarlo de la lista
              this.getMessage('Cliente Borrado', 'El cliente ha sido borrado con éxito', 'success');
            } else {
              this.getMessage('Error al Borrar', 'El cliente no ha podido ser borrado, por favor reintente', 'error');
            }

          });

        });
  }

}
