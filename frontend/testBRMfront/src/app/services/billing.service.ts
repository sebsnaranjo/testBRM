import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private billingApiUrl = 'http://localhost:3001/api/v1/billing';

  constructor(private http: HttpClient) { }

  postBilling(billingInfo: any) {
    this.http.post(this.billingApiUrl, billingInfo).subscribe(
      (response) => {
        console.log('Producto comprado:', response);
      },
      (error) => {
        console.error('Error al comprar el producto:', error);
      }
    );
  }
}
