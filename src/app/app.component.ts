import { Component, computed, effect, inject } from '@angular/core';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Auth App';
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() =>  {
    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  })

  public authStatusChangeEffect = effect(()=> {
    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }
    //console.log('Auth Status Change', this.authService.authStatus());
  })
}
