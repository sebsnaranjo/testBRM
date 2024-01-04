import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3001/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  postProduct(productData: any) {
    this.http.post(this.apiUrl, productData).subscribe( (data) =>{
      console.log(data);
    })
  } 

}
