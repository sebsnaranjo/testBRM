import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BillingService } from 'src/app/services/billing.service';
import { ProductService } from 'src/app/services/product.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  data: any[] | undefined;

  id_user: string | null = null;

  products: any[] = [];
  cart: any[] = [];
  currentPurchaseCode: number = Math.floor(Math.random() * 1000) + 1; //Codigo de compra (El mismo para la compra)

  constructor(private productService: ProductService, private billingService: BillingService) {}

  ngOnInit(): void {

    this.id_user = sessionStorage.getItem('id');

    //Listar productos
    this.productService.getProducts().subscribe((data: any) => {
      if (data.ok && data.body) {
        this.products = data.body;
      }
    });
  }

  //Logica para productos
  addToCart(product: any): void {
    const existingProduct = this.cart.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.amount++; // Si el producto ya está en el carrito aumenta la cantidad
    } else {
      this.cart.push({ ...product, amount: 1 }); // Agregar un nuevo elemento al carrito si es un producto diferente
    }
  }

  buyAll(): void {
    for (const product of this.cart) {
      const billingInfo = {
        cantidad: product.amount,
        price: product.price,
        cod_purchase: this.currentPurchaseCode, 
        date_created: new Date().toISOString(),
        users_id: this.id_user, // ID del usuario, ajustar según tu lógica de autenticación
        products_id: product.id
      };
      this.billingService.postBilling(billingInfo);
    }

    this.generatePDF(this.cart);

    this.cart = []; // Vaciar el carrito
    this.currentPurchaseCode = Math.floor(Math.random() * 1000) + 1; // Generar un nuevo código de compra
  }

  generatePDF(cart: any[]): void {
    const docDefinition = {
      content: [
        { text: 'Factura de compra', style: 'header' },
        { text: '\n' }, // Agrega un salto de línea
  
        // Tabla con los datos de los productos en el carrito
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Producto', 'Cantidad', 'Precio'],
              ...cart.map(product => [product.name, product.amount, product.price])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };
  
    // Generar el PDF
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download('Factura.pdf'); // Descargar el PDF con el nombre 'carrito_compras.pdf'
  }
}
