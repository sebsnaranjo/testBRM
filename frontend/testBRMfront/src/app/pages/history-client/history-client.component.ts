import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface BillingItem {
  id: number;
  cantidad: number;
  price: number;
  cod_purchase: number;
  date_created: string;
  users_id: number;
  products_id: number;
}

@Component({
  selector: 'app-history-client',
  templateUrl: './history-client.component.html',
  styleUrls: ['./history-client.component.css']
})
export class HistoryClientComponent implements OnInit {

  data: any[] | undefined;
  id_user: string | null = null;
  idAsString: string | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.id_user = sessionStorage.getItem('id');
    if (this.id_user !== null) {
      this.idAsString = this.id_user.toString();
    }

    this.http.get<any>('http://localhost:3001/api/v1/billing/history/' + this.idAsString).subscribe(response => {
      this.data = response.body;
    });
  }
}
