import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  currentDate = new Date().toISOString().split('T')[0];

  createForm = this.formBuilder.group({
    num_lot: ['', [Validators.required]],
    name: ['', Validators.required],
    price: ['', Validators.required],
    amount: ['', Validators.required],
    date_entry: [this.currentDate, Validators.required],
    date_update: [this.currentDate, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    
  }

  createProduct(): void {
    if (this.createForm.valid) {
      const productData = this.createForm.value;
      this.productService.postProduct(productData);
    }
  }

}
