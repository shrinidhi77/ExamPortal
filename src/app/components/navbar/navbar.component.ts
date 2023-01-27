import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  user: any;
  userRole: any;

  constructor(public login: LoginService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
   
    this.login.loginStatusSubject.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.userRole = this.user.authorities[0].authority;
    });
    
    console.log(this.isLoggedIn);
    console.log(this.user);
    console.log(this.userRole);

  }

  public logOut() {
    this.login.logout();
    window.location.reload();
  }
}
