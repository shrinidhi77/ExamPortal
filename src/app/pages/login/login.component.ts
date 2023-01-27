import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  public loginData = {
    username: '',
    password: '',
  };

  ngOnInit(): void {

  }

  formSubmit() {
    console.log("login button clicked");
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Enter User name", "", {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Enter Password", "", {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    // requesting server to generate the token 
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        // login...
        // store token and user details store send it to admin page
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            // redirect  ...ADMIN: admin dashboard
            // redirect  ...NORMAL: normal dashboard
            if (this.login.getUserRole() == 'ADMIN') {
              // admin dashboard
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == 'NORMAL') {
              // window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          }
        );


      }, (error) => {
        console.log('Error !');
        console.log(error);

        this.snack.open("Invalid Details !! Try again", "", {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        return;
      }
    );


  }




}
