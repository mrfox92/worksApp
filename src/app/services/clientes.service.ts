import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient ) { }

  getClientes() {
    return this.http.get(`${ URL }/cliente/`);
  }

  getTrabajosClienteById( id: string ) {
    return this.http.get(`${ URL }/trabajo/find/${ id }`);
  }

  //  crear nuevo cliente

  createCliente( cliente: Cliente ) {

    return this.http.post(`${ URL }/cliente/create`, cliente );

  }

  deleteClienteById( id: string ) {
    return this.http.delete( `${ URL }/cliente/delete/${ id }` );
  }
}
