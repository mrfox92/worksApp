import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrabajosService } from '../../services/trabajos.service';
//  pdfMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { getLocaleDateFormat } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {

  idTrabajo = '';
  trabajo: Trabajo;
  detalleTrabajo: Detalle[] = [];

  constructor(
    private trabajosService: TrabajosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {

      this.idTrabajo = params.id;

      if ( !this.idTrabajo.trim() ) {
        console.log('ID no valido');
      }

      console.log('ID valido');

      this.trabajosService.getWorkById( this.idTrabajo ).subscribe( (resp: any) => {

        if ( resp.ok ) {
          console.log(resp);
          this.trabajo = resp.trabajo;
          this.detalleTrabajo = resp.detalle;
          this.generatePdf();
        }

      });

    });
  }


  generatePdf() {
    //  definicion del documento

    //  const documentDefinition = { content: 'Este es un simple PDF hecho con PDFMake' };
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf( documentDefinition ).download( `${ this.trabajo.title }.pdf` ); //  descargar pdf
    //  pdfMake.createPdf( documentDefinition ).open(); abrir pdf en una nueva ventana
    //  pdfMake.createPdf( documentDefinition ).open({}, window); abrir pdf en la misma ventana
    //  pdfMake.createPdf( documentDefinition ).print(); imprimir pdf

  }

  getDocumentDefinition() {
    return {
      info: {
        title: `${ this.trabajo.title }_Detalle`
      },
      header: {
        text: this.trabajo.title,
        alignment: 'center',
        style: 'header'
      }
      ,
      footer: {

        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },
      content: [
        {
          style: 'tableExample',
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],

            body: [
              [ 'Actividad', 'Descripción', 'Observación', 'Fecha ingreso' ],
              [ this.trabajo.title, this.trabajo.description, this.trabajo.annotation, this.trabajo.createdAt ],
            ]
          }
        },
        {
          text: 'Detalle:',
          style: 'header'
        },
        {
          columns: [
              [
                ...this.detalleTrabajo.map( detalle => `${ detalle.title }: ${ detalle.description }` )
              ]
          ],
          // optional space between columns
          columnGap: 10
        }
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 20, 0, 20],
          decoration: 'underline'
        },
        name: {
          fontSize: 12,
          bold: false
        },
        tableExample: {
          fontSize: 10,
          margin: [0, 40, 0, 0]
        }
      }
    };
  }

}
