import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Purchase {
  date_created: string;
  user_id: number;
  products: {
    product_id: number;
    cantidad: number;
    price: number;
  }[];
  total_price: number;
}

@Component({
  selector: 'app-purchases-client',
  templateUrl: './purchases-client.component.html',
  styleUrls: ['./purchases-client.component.css']
})
export class PurchasesClientComponent {

  purchases: Purchase[] = [];

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('http://localhost:3001/api/v1/billing-info').subscribe(
      (data) => {
        console.log(data); // Verifica la estructura de los datos recibidos
        this.purchases = data.body; // Ajusta esto según la estructura de tus datos
      },
      (error) => {
        console.error('Hubo un error al obtener los datos:', error);
      }
    );
  }

}
