import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal, { SweetAlertType } from 'sweetalert2';
import { ClientesService } from '../../services/clientes.service';
import { ok } from 'assert';

declare const $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  clientes: Cliente[] = [];


  nuevoCliente: Cliente = {

    nombre: '',
    numContacto: null
  };

  constructor( private clientesService: ClientesService ) { }

  ngOnInit() {
    this.getClientes();
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

  getClientes() {
    this.clientesService.getClientes().subscribe( (resp: any) => {

      if ( resp.ok ) {
        this.clientes = resp.clientes;
      } else {
        this.clientes = [];
      }

    });
  }

  removeCliente( idCliente: string ) {
    console.log( 'Lectura evento: ', idCliente );

    //  Barremos los datos de la lista de clientes con filter y sacamos el cliente con el id emitido ( cliente eliminado )
    this.clientes = this.clientes.filter( cliente => cliente._id !== idCliente );
  }

  createCliente( forma: NgForm ) {

    if ( !forma.valid ) {
      return;
    }

    this.clientesService.createCliente( this.nuevoCliente ).subscribe( (resp: any) => {

      if ( resp.ok ) {

        this.getMessage('Nuevo cliente', 'Has agregado un nuevo cliente', 'success');
        forma.reset();
        $('#modalCliente').modal('hide');
        this.getClientes();
      } else {
        this.getMessage('Nuevo cliente', 'No ha podido ser agregado, por favor reintente', 'error');
      }

    });

  }

}
