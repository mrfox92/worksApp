import { Component, OnInit, EventEmitter } from '@angular/core';
import { TrabajosService } from '../../services/trabajos.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal, { SweetAlertType } from 'sweetalert2';

@Component({
  selector: 'app-detalle-trabajo',
  templateUrl: './detalle-trabajo.component.html',
  styleUrls: ['./detalle-trabajo.component.css']
})
export class DetalleTrabajoComponent implements OnInit {
  private idDetalle = '';

  //  newElement =  new EventEmitter<string>();

  trabajo: any;
  detalleTrabajo: Detalle[] = [];
  nuevoDetalle: Detalle = {
    title: '',
    description: '',
    status: false
  };
  //  emitir evento cada vez que se crea un nuevo elemento

  constructor( private trabajosService: TrabajosService, private activateRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.getParamsUrl();
    if ( !this.idDetalle.trim() ) {
      console.log('El id no es valido');
      return;
    }

    //  console.log(`ID válido: ${ this.idDetalle }`);
    //  una vez validado el id, realizamos la peticion a nuestro servicio
    this.getDetailById();
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

  createDetail( forma: NgForm ) {

    console.log( forma.value );
    if ( !forma.valid ) {
      console.log('El formulario no es valido, por favor complete todos los datos solicitados');
      return;
    }
    //  capitalizar detalle
    this.nuevoDetalle.title = this.capitalizarString( this.nuevoDetalle.title );
    this.nuevoDetalle.description = this.capitalizarString( this.nuevoDetalle.description );

    this.trabajosService.createWorkDetail( this.idDetalle, this.nuevoDetalle ).subscribe( ( resp: any ) => {

      if ( resp.ok ) {

        this.getMessage('Creado con éxito', 'Nuevo detalle agregado!', 'success');
        forma.reset();
        console.log( resp );
        //  emitir para que se llame al servicio y recargar los detallesTrabajo
        this.getDetailById();
      } else {

        this.getMessage('Error', 'No se ha podido agregar nuevo detalle, por favor reintente', 'error');
      }

    });
  }

  getDetailById() {
    this.trabajosService.getWorkById( this.idDetalle ).subscribe( (resp: any) => {

      if ( resp.ok ) {
        this.detalleTrabajo = resp.detalle;
        this.trabajo = resp.trabajo;
      } else {
        console.log('No hay detalle ');
      }

    });
  }

  changeStatus( event, id: string ) {

    this.trabajosService.updateStatusDetailById( id, event.target.checked ).subscribe( (resp: any) => {
      console.log( resp.ok );
    });
  }

  getParamsUrl() {
    this.activateRoute.params.subscribe( params => {
      //  console.log( params.id );

      if ( !params.id ) {
        this.idDetalle = '';
      } else {
        this.idDetalle = params.id;
      }

    });
  }

  capitalizarString( cadena: string ): string {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  }

}
