import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  id_user: string | null = null;
  idAsString: string | undefined;
  userLoginOn:boolean=false;
  constructor(private loginService:LoginService, private router: Router) { }

  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.id_user = sessionStorage.getItem('roles_id');
    if (this.id_user !== null) {
      this.idAsString = this.id_user.toString();
    }
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

  cerrarSesion() {
    sessionStorage.removeItem('roles_id');
    this.router.navigate(['/login']);
  }

}
