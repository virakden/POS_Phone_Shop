import { Constant } from './../../core/constants/constant';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { AuthenticationService } from '../../core/services/auth.service';
import { LoginModel } from './login.model';

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
  // f!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  loading = false;
  errorMessage!: string;
  toast!: false;
  constants: any;

  // set the current year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router,
    private route: ActivatedRoute,) {
    // redirect to home if already logged in
    if (this.authenticationService.getLoginUser()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    // this.initForm();

    this.loginForm = this.fb.group({
      email: [null, Validators.required], // email
      password: [null, Validators.required], //
      remember: false
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required], // email
      password: [null, Validators.required], //
      remember: false
    });
  }

  /**
   * Form submit
   */
  onSubmit(loginData: LoginModel) {
    this.loading = true;
    if (!loginData.email) {
      this.errorMessage = 'Please enter username';
      this.loading = false;
    } else if (!loginData.password) {
      this.errorMessage = 'Please enter password';
      this.loading = false;
    } else {
      const loginRequest = {
        username: loginData.email,
        password: this.authenticationService.Encrypt(loginData.password)
      };
      // stop here if form is invalid
      this.authenticationService.login(loginData).subscribe(
        (res: any) => {
          console.log(res)
          localStorage.setItem('token',res.results.token)
          this.router.navigate(['/home'])
        //   if (res.response.status === 200) {
        //     this.saveAccessToken(this.loginForm.controls["remember"].value, res.results.token);
        //     this.authenticationService.getUserInfo().subscribe(
        //       (userInfo: any) => {
        //         this.getMenuItem(userInfo);
        //         // this.statusSuccess(this.f.controls.remember.value, userInfo.results);
        //         console.log(userInfo)
        //       }
        //     );
        //   } else {
        //     this.loading = false;
        //     this.errorMessage = res.response.message;
        //   }
        // }, (error) => {
        //   this.loading = false;
        //   this.errorMessage = error.message;
        }
      );
    }
  }

  saveAccessToken(isRemember: boolean, token: string) {
    if (isRemember) {
      localStorage.setItem(Constant.TOKEN, JSON.stringify(this.authenticationService));
    } else {
      sessionStorage.setItem(Constant.TOKEN, JSON.stringify(this.authenticationService));
    }

  }

  getMenuItem(userInfo: any) {

  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
