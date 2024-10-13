import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {DecodejwtService} from "../services/decodejwt.service";
import {Role} from "../models/role";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(DecodejwtService);
  const userService = inject(UserService);
  const router = inject(Router);

  userService.isLoggedIn.subscribe((loggedIn: boolean) => {
    if (!loggedIn) {
      router.navigate(['/unauthorized']);
      return false;
    }
    else if (authService.getRoleFromToken()===Role.ADMIN) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  });
  return true;
};
