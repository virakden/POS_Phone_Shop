import { first } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment.prod';
import { AuthfakeauthenticationService } from './../../../../core/services/authfake.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})

/**
 * Cover Component
 */
export class CoverComponent implements OnInit {

  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;

  toast!: false;
  // set the current year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router,
    private authFackservice: AuthfakeauthenticationService, private route: ActivatedRoute,) {

      if ( this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
      // email: ['admin@gmail.com', [Validators.required, Validators.email]],
      // password: ['123456', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      
    }
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
