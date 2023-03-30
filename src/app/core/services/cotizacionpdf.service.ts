import { Injectable } from '@angular/core';
import { IImg, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root',
})
export class CotizacionpdfService {
  constructor() {}

  async generatePdf(data:any) {
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    const today = new Date();
    pdf.add(new Txt('NIT: 371082021').bold().fontSize(6).end);
    pdf.add(new Txt('Direc: Calle Prolongacion Quijarro #126').bold().fontSize(6).end);
    pdf.add(new Txt('Telf: 67370323').bold().fontSize(6).end);
    pdf.add(new Txt('Tarija - Bolivia').bold().fontSize(6).end);
    pdf.add(
      new Txt('COTIZACION DE MATERIALES Y/O SERVICIOS')
        .alignment('center')
        .bold().end
    );
    pdf.add('\n');
    pdf.add(new Txt('Fecha:').margin([0, 0, 0, -15]).decoration('underline').bold().end);
    pdf.add(
      new Table([
        [
          new Txt(`${today.toLocaleDateString()}`).bold().end
        ],
      ]).margin([200, 0, 0, 0]).bold().end
    );
    pdf.add(new Txt('Cliente:').decoration('underline').margin([0, 0, 0, -15]).bold().end);
    pdf.add(
      new Table([
        [
          new Txt('ESAM LATAM').bold().end
        ],
      ]).margin([200, 0, 0, 0]).bold().end
      );
    pdf.add(new Txt('Ref:').decoration('underline').margin([0, 0, 0, -15]).bold().end);
    pdf.add(
      new Table([
        [
          new Txt('Solicitud de Cotizacion').bold().end
        ],
      ]).margin([200, 0, 0, 0]).bold().end
    );
    pdf.add(
      new Txt(`
      Sírvase de nuestra cotizacion el material solicitado detallado en las líneas abajo, indicando precios, tipo de cambio, formas de pago, plazos de entrega, validez de la oferta, periodo de garantia y otros que consideren importantes.
      `)
        .alignment('justify')
        .italics().end
    );
    pdf.add(
      new Table([
        [
          new Txt('Nro').bold().end,
          new Txt('Descripcion').bold().end,
          new Txt('Nombre').bold().end,
          new Txt('Unidad Medida').bold().end,
          new Txt('Precio Bs.').bold().end,
        ],
        ...data
      ])
        .heights(rowIndex => rowIndex === 0 ? 25 : 0)
        .end
    );
    pdf.add('\n');
    pdf.add(new Txt('Tipo de Cambio:                                                                       6,96').decoration('underline').fontSize(9).margin([0, 2, 0, -15]).end);
    pdf.add(new Txt('Forma de pago:                                                                        Efectivo Cheque').decoration('underline').fontSize(9).margin([0, 15, 0, 0]).end);
    pdf.add(new Txt('Plazo de entrega:                                                                     48 hrs.').decoration('underline').fontSize(9).margin([0, 1, 0, 0]).end);
    pdf.add(new Txt('Validez de Cotizacion:                                                             15 dias calendario').decoration('underline').fontSize(9).margin([0, 1, 0, 0]).end);
    pdf.add(new Txt('Periodo de Garantia:                                                                6 meses').decoration('underline').fontSize(9).margin([0, 1, 0, 0]).end);
    pdf.add([
      new Txt([new Txt('\n').end]).end,
      new Txt([new Txt('PROPUESTA:').alignment('left').bold().fontSize(10).end])
        .end,
      new Txt([
        new Txt('Servicio Tecnico gratuito por 12 MESES.')
          .alignment('left')
          .bold()
          .fontSize(10).end,
      ]).end,
      new Txt([
        new Txt('Todas las configuraciones correspondientes')
          .alignment('left')
          .fontSize(10).end,
      ]).end,
    ]);
    pdf.add('\n');
    pdf.add(
      new Table([
        [new Txt('DATOS DEL PROVEEDOR').bold().end],
        [
          new Txt('Direccion:                         Calle Prolongacio Quijarro #126').bold().end,
        ],
        [new Txt('Telefonos:                            72959782 - 67370323').bold().end],
        [
          new Txt(
            'CYBERCORP S.R.L Cta Cte. N° 10000042875415 Banco Union'
          ).bold().end,
        ],
        [new Txt('N° de NIT                            371082021').bold().end], 
      ])
        .fontSize(9).end
    );
    pdf.add('\n');
    pdf.add(new Txt('Agradeciendo su atencion a la presente, saludamos a Ud(s)muy atentamnete.').end);

    pdf.create().open();
  }
}
