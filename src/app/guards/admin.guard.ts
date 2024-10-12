import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {DecodejwtService} from "../services/decodejwt.service";
import {Role} from "../models/role";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(DecodejwtService);
  const router = inject(Router);

  if (authService.getRoleFromToken()===Role.ADMIN) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
