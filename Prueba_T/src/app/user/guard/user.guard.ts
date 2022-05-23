import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canActivate() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('auth');
      return false;
    }

    return true;
  }

  canLoad() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('auth');
      return false;
    }

    return true;
  }
}
