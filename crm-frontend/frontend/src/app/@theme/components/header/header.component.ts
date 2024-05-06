import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { UserStore } from '../../../@core/stores/user.store';
import { SettingsData } from '../../../@core/interfaces/common/settings';
import { User } from '../../../@core/interfaces/common/users';
import { ClienteService } from '../../../@core/backend/common/services/cliente.service';
import { ToasterConfig } from 'angular2-toaster';
import { Howl, Howler } from 'howler';
const { Howl, Howler } = require('howler');

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [ClienteService]
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  picture: any;

  themes = [
    {
      value: 'default',
      name: 'Claro',
    },
    {
      value: 'dark',
      name: 'Escuro',
    },
  ];

  currentTheme = 'default';
  reunioes = [];
  userMenu = this.getMenuItems();
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;
  status: NbComponentStatus = 'primary';

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userStore: UserStore,
    private settingsService: SettingsData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private clienteService: ClienteService,
    private toastrService: NbToastrService) {
    this.reunioes = [];

  }

  getMenuItems() {
    const userLink = this.user ? '/pages/users/current/' : '';
    return [
      { title: 'Dados pessoais', link: userLink, queryParams: { profile: true } },
      { title: 'Log out', link: '/auth/logout' },
    ];
  }

  ngOnInit() {

    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Log out') {
        console.log('logout clicked');
      }
    });

    this.currentTheme = this.themeService.currentTheme;

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: any) => {
        // this.picture = user.picture;
        this.user = user;
        this.userMenu = this.getMenuItems();
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$))
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$))
      .subscribe(themeName => this.currentTheme = themeName);

    this.triggerNotifations();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);
    this.settingsService.updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  triggerNotifations() {
    timer(0, 300000).subscribe(() => {
      this.getNotifications();
    });
  }

  getNotifications() {

    this.clienteService.getAllDailyReuniaoCliente()
      .subscribe(data => {
        this.reunioes = [];
        var reunioes = data['body'];
        reunioes.forEach(element => {
          const dataReuniao = new Date(element['comeco']);
          if (this.isToday(dataReuniao)) {

            const hour = (dataReuniao.getUTCHours() < 10) ? "0" + dataReuniao.getUTCHours() : dataReuniao.getUTCHours();
            const minute = (dataReuniao.getUTCMinutes() < 10) ? "0" + dataReuniao.getUTCMinutes() : dataReuniao.getUTCMinutes();

            const reuniao = {
              title: element.nome + " as "
                + hour + ":"
                + minute, data: element
            };

            if (this.isReuniaoJaFeita(dataReuniao)) {
              return;
            }

            this.reunioes.push(reuniao);

            if (this.startsInLessThan15Minutes(dataReuniao)) {
              this.showToast(this.status, "Atenção!", "Sua reunião as "
                + hour + ":"
                + minute + " está chegando.");

              var sound = new Howl({
                src: ['assets/data/pristine-609.mp3']
              });
              sound.play();
            }
          }
        });
      });
  }

  isToday(someDate) {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  };

  startsInLessThan15Minutes(someDate: Date) {
    const today = new Date()
    var diffMs = (someDate.valueOf() - today.valueOf()); // milliseconds
    var minutes = Math.floor((diffMs / 1000) / 60);
    return minutes <= 15 && minutes > 0 ? true : false;
  };

  isReuniaoJaFeita(someDate: Date) {
    const today = new Date()
    var diffMs = (someDate.valueOf() - today.valueOf()); // milliseconds
    var minutes = Math.floor((diffMs / 1000) / 60);
    return minutes < 0 ? true : false;
  }

  showToast(type: NbComponentStatus, title: string, body: string) {
    const hasIcon = this.hasIcon ? {} : { icon: '' };
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
      ...hasIcon,
    };
    const titleContent = title ? title : '';
    this.toastrService.show(
      body,
      titleContent,
      config);
  }
}
