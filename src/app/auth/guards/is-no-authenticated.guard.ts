import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';



export const isNoAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.authStatus() == AuthStatus.authenticated){
    router.navigate(['/dashboard']);
    return false;
  }

  return true;

  //Otra forma que también funciona
  // console.log("Usuario atenticadao- ",authService.authStatus());
  // if(authService.authStatus() === AuthStatus.authenticated) return false;
  // return true;
};
