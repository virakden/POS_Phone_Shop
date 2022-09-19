import { LoginResponse, Data } from './../../core/models/auth.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { AuthenticationService } from '../../core/services/auth.service';
import { Login } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = 'Invalid Credentials';
  returnUrl!: string;
  loginErr?: string;
  isLoading!: false;

  // set the current year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,

  ) {
    // redirect to dashboard if already logged in
    if (this.authenticationService.getLoginUser()) {
      this.router.navigate(['/']);
      // console.log("test");
      
    }
  }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.initFrom();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initFrom(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      remember: [false],
    });

    const userData = JSON.parse(<string>localStorage.getItem('REMEMBER')) as Login;
    if (userData) {
      this.loginForm.controls['email'].setValue(userData.email);
      this.loginForm.controls['password'].setValue(userData.password);
      this.loginForm.controls['remember'].setValue(userData.remember);

    }
  }

  

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form login
   */
  login(loginData: Login) {
    const merge = Object.assign({
      email: loginData.email,
      password: this.authenticationService.Encrypt(loginData.password)
    });
    console.log('merge', merge);
    this.authenticationService.login(loginData).subscribe(
      (res: LoginResponse) => {
        console.log(res.response.status);
        
        if (res.response.status === 200 ){
          sessionStorage.setItem('token', res.results.token);
          if( loginData.remember === true){
            this.authenticationService.rememberLoginUser(res.results);
            localStorage.setItem('REMEMBER', JSON.stringify(loginData));
            this.router.navigate(['/']);
          }
          else {
            localStorage.removeItem('REMEMBER');
            this.authenticationService.setLoginUser(res.results);
          }
          // localStorage.setItem('REMEMBER', JSON.stringify(loginData));
          this.router.navigate(['/']);
        } else {
          this.isLoading = false;
          this.loginErr = res.response.message;
        }
        this.isLoading = false;
        console.log(res);
      },
      
    )

  }
  // ErrorInterceptor(): ((error: any) => void) | undefined {
  //   throw new Error('Method not implemented.');
  // }
 

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
