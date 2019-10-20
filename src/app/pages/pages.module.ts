import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TrabajosComponent } from './trabajos/trabajos.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ComponentsModule } from '../components/components.module';
import { DetalleTrabajoComponent } from './detalle-trabajo/detalle-trabajo.component';
import { RouterModule } from '@angular/router';
import { ImprimirComponent } from './imprimir/imprimir.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TrabajosClienteComponent } from './trabajos-cliente/trabajos-cliente.component';

@NgModule({
  declarations: [
    TrabajosComponent,
    NuevoComponent,
    DetalleTrabajoComponent,
    ImprimirComponent,
    ClientesComponent,
    TrabajosClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
