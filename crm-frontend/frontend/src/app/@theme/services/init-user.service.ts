import { Observable } from 'rxjs';
import { User, UserData } from '../../@core/interfaces/common/users';
import { tap } from 'rxjs/operators';
import { UserStore } from '../../@core/stores/user.store';
import { Injectable } from '@angular/core';
import { NbJSThemesRegistry, NbThemeService } from '@nebular/theme';

@Injectable()
export class InitUserService {
  constructor(protected userStore: UserStore,
    protected usersService: UserData,
    protected jsThemes: NbJSThemesRegistry,
    protected themeService: NbThemeService) { }

  initCurrentUser(): Observable<User> {
    return this.usersService.getCurrentUser()
      .pipe(tap((user: User) => {
        if (user) {

          this.userStore.setUser(user);
          localStorage.setItem('user', JSON.stringify(user));

          if (user.settings && user.settings.themeName) {
            if (this.jsThemes.has(user.settings.themeName)) {
              this.themeService.changeTheme(user.settings.themeName);
            }
          }
        }
      }));
  }
}
