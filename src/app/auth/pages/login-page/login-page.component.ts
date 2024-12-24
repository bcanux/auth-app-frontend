import { Component,  inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {


  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email:  ['brandon@gmail.com', [Validators.required, Validators.email]],
    password:  ['123456', [Validators.required, Validators.minLength(6)]]

  });

  login(){

    const {email, password } = this.myForm.value;

    this.authService.login(email, password)
    .subscribe({
      //console.log(success);
      next:() => this.router.navigateByUrl('/dashboard'),
      error: (message) =>  {
        Swal.fire('Error', message, 'error')
      }
    });

    //console.log(this.myForm.value);
  }

}