import { Component, OnDestroy, OnInit } from '@angular/core';
import 'flatpickr/dist/flatpickr.css';
import { NbToastrService } from '@nebular/theme';
import { ClienteService } from '../../@core/backend/common/services/cliente.service';
import { UserStore } from '../../@core/stores/user.store';
import { timer } from 'rxjs';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [ClienteService]
})


export class DashboardComponent implements OnInit, OnDestroy {

  welcomeCard: CardSettings = {
    title: '',
    iconClass: 'nb-home',
    type: 'primary',
  };

  private alive = true;

  constructor(private userStore: UserStore, private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.triggerWelcomeMessage();
  }

  triggerWelcomeMessage() {
    timer(0, 300000).subscribe(() => {
      this.setupWelcomeMessage();
    });
  }

  setupWelcomeMessage() {
    let mensagem = "";

    var today = new Date();
    var hrs = today.getHours();
    var periodoDia;

    if (hrs < 12) {
      periodoDia = 'Bom dia ';
      // this.welcomeCard.iconClass = 'nb-sunny';
    }
    else if (hrs >= 12 && hrs <= 17) {
      periodoDia = 'Boa tarde ';
      // this.welcomeCard.iconClass = 'nb-sunny';
    }
    else if (hrs >= 17 && hrs <= 24) {
      periodoDia = 'Boa noite ';
      // this.welcomeCard.iconClass = 'moon-outline';
    }
    mensagem += periodoDia + this.userStore.getUser().firstName + "!";

    this.clienteService.getAllDailyReuniaoCliente()
      .subscribe(data => {
        var reunioes = data['body'];
        if (reunioes.length > 0) {
          mensagem += " Existem " + reunioes.length + " reuniões agendadas para hoje. Bom trabalho!";
        } else {
          mensagem += " Não há reuniões agendadas para hoje até agora. Bom trabalho!"
        }

        this.welcomeCard.title = mensagem;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
