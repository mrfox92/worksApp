import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { DetalleTrabajoComponent } from './pages/detalle-trabajo/detalle-trabajo.component';
import { ImprimirComponent } from './pages/imprimir/imprimir.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { TrabajosClienteComponent } from './pages/trabajos-cliente/trabajos-cliente.component';

const appRouting: Routes = [
    { path: 'inicio', component: ClientesComponent },
    { path: 'trabajos', component: TrabajosComponent },
    { path: 'nuevo', component: NuevoComponent },
    { path: 'detalle/:id', component: DetalleTrabajoComponent },
    { path: 'imprimir/:id', component: ImprimirComponent },
    { path: 'cliente/trabajos/:id', component: TrabajosClienteComponent },
    { path: '', pathMatch: 'full', redirectTo: '/inicio' },
    { path: '**', redirectTo: '/inicio' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRouting)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
