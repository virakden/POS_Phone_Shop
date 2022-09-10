import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Register Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { UserProfileService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {

  // Login Form
  signupForm!: FormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserProfileService) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * Register submit form
   */
   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      
    }
  }

}
