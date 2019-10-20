import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ListaComponent } from './lista/lista.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { PdfComponent } from './pdf/pdf.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';



@NgModule({
  declarations: [ MenuComponent, ListaComponent, ModalComponent, PdfComponent, ListaClientesComponent ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    ListaComponent,
    ModalComponent,
    ListaClientesComponent
  ]
})
export class ComponentsModule { }
