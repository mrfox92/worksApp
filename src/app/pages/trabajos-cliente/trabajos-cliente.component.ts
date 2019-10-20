import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trabajos-cliente',
  templateUrl: './trabajos-cliente.component.html',
  styleUrls: ['./trabajos-cliente.component.css']
})
export class TrabajosClienteComponent implements OnInit {

  idCliente: string;
  trabajosPorCliente: Trabajo[] = [];

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    //  obtenemos el parametro desde la URL
    this.activatedRoute.params.subscribe( async params => {

      this.idCliente = await params.id;

      if ( !this.idCliente.trim() ) {
        this.router.navigate(['/inicio']);
      }

      this.clientesService.getTrabajosClienteById( this.idCliente ).subscribe( (resp: any) => {

        if ( resp.ok ) {
          this.trabajosPorCliente = resp.trabajosCliente;
        } else {
          this.trabajosPorCliente = [];
        }

      });

    });
  }

}
