import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {

  constructor( private http: HttpClient ) { }

  getWorks() {

    return this.http.get( `${ URL }/trabajo/` );

  }

  getWorkById( id: string ) {

    return this.http.get( `${ URL }/detalle/${ id }` );
  }

  createWorkDetail( id: string, detalleTrabajo: Detalle ) {
    return this.http.post( `${ URL }/detalle/${ id }`, detalleTrabajo );
  }

  createWork( trabajo: any ) {

    return this.http.post( `${ URL }/trabajo/`, trabajo );
  }

  updateWorkById( trabajo: Trabajo ) {
    return this.http.post( `${ URL }/trabajo/update/${ trabajo._id }`, trabajo );
  }

  updateStatusDetailById( id: string, status: boolean = false ) {

    return this.http.put( `${ URL }/detalle/updateStatus/${ id }`, { status } );
  }
}
