import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Observable, of, Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import 'flatpickr/dist/flatpickr.css';
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente, ClienteAutoComplete, ClienteData, ReuniaoCliente } from '../../@core/interfaces/common/cliente';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddReuniaoModalComponent } from '../modal-overlays/dialog/add-reuniao/add-reuniao-modal.component';
export function flatpickrFactory() {
  flatpickr.localize(Portuguese);
  return flatpickr;
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'mwl-calendar-event-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar-event.component.scss'],
  templateUrl: './calendar-event.component.html',
})

export class CalendarEventComponent {

  @ViewChild('dialogAdd', { static: false }) dialogAdd: TemplateRef<any>;
  @ViewChild('dialogView', { static: false }) dialogView: TemplateRef<any>;

  reuniaoForm: FormGroup;
  reunioes: ReuniaoCliente[] = [];
  events: CalendarEvent[] = [];

  // cliente auto complete
  clientes: ClienteAutoComplete[];
  cliente: Cliente;
  filteredCliente$: Observable<ClienteAutoComplete[]>;
  @ViewChild('clienteInput') clienteInput;

  // calendar
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Alterar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
  ];
  activeDayIsOpen: boolean = false;

  get id() { return this.reuniaoForm.get('id'); }
  get title() { return this.reuniaoForm.get('title'); }
  get start() { return this.reuniaoForm.get('start'); }
  get end() { return this.reuniaoForm.get('end'); }
  get color() { return this.reuniaoForm.get('color'); }
  get description() { return this.reuniaoForm.get('description'); }
  get idCliente() { return this.reuniaoForm.get('idCliente'); }

  constructor(private router: Router,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private clienteService: ClienteData,
    private toasterService: NbToastrService,
    protected cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    flatpickrFactory();
    this.initForm();
    this.loadClientes();
    this.loadReuniaoCliente();
  }

  initForm() {
    this.reuniaoForm = this.fb.group({
      id: this.fb.control(''),
      title: this.fb.control(''),
      start: this.fb.control(''),
      end: this.fb.control(''),
      color: this.fb.control(''),
      description: this.fb.control(''),
      idCliente: this.fb.control(''),
    });
  }

  loadClientes() {
    this.clienteService.getAllForAutocomplete(true)
      .pipe(debounceTime(500))
      .subscribe((res) => {
        this.clientes = res["body"];
        this.filteredCliente$ = of(this.clientes);
      });
  }

  loadReuniaoCliente() {
    this.clienteService.getAllReuniaoCliente()
      .pipe(debounceTime(500))
      .subscribe((res) => {
        let result = res["body"];
        this.reunioes = result;
        this.events = [];

        result.forEach(element => {
          const reuniaoCliente: ReuniaoCliente = element;
          let userEvent: CalendarEvent =
          {
            id: element.id,
            start: startOfDay(new Date(reuniaoCliente.comeco)),
            end: endOfDay(new Date(reuniaoCliente.fim)),
            title: reuniaoCliente.nome,
            color: colors.blue,
            actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: false,
          };

          this.events.push(userEvent);
          let obj = {
            "date": new Date,
            "events": this.events
          };
          this.dayClicked(obj)
        });

        this.cd.detectChanges();
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  clearForm() {
    this.reuniaoForm = this.fb.group({
      id: this.fb.control(''),
      title: this.fb.control(''),
      start: this.fb.control(''),
      end: this.fb.control(''),
      color: this.fb.control(''),
      description: this.fb.control(''),
      idCliente: this.fb.control(''),
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.clearForm();
    let reuniao = this.reunioes.find(x => x.id == event.id);

    if (reuniao.cliente)
      this.cliente = reuniao.cliente;

    this.reuniaoForm.setValue({
      id: event.id ? event.id : '',
      title: event.title ? event.title : '',
      start: reuniao.comeco ? new Date(reuniao.comeco) : '',
      end: reuniao.fim ? new Date(reuniao.fim) : '',
      color: event.color ? event.color : '',
      description: reuniao.descricao ? reuniao.descricao : '',
      idCliente: reuniao.idCliente ? reuniao.idCliente : '',
    });

    this.dialogService.open(
      this.dialogView,
      {
        context: {
        }
      }
    );
  }

  onNovaReuniao() {
    this.dialogService.open(AddReuniaoModalComponent, {
      context: {
        title: 'Cadastrar reuniao',
        idCliente: 0,
        reuniao: null,
        isFromDashboard: true
      }, dialogClass: 'model-full'
    }).onClose.subscribe(result => this.loadReuniaoCliente());
  }

  addEvent(): void {
    const event = this.reuniaoForm.value;

    let reuniaoCliente: ReuniaoCliente = {
      id: 0,
      nome: '',
      descricao: '',
      comeco: undefined,
      fim: undefined,
      idCliente: 0,
      idUsuario: 0,
      start: undefined,
      title: '',
      usuario: undefined,
      cliente: undefined
    };

    reuniaoCliente.descricao = this.reuniaoForm.controls["description"].value;
    reuniaoCliente.comeco = event.start;
    reuniaoCliente.fim = event.end;
    reuniaoCliente.nome = event.title;
    reuniaoCliente.idCliente = this.reuniaoForm.controls["idCliente"].value;

    this.clienteService.createReuniao(reuniaoCliente)
      .subscribe((result: any) => {
        this.toasterService.success('', `Reunião adicionada com sucesso!`);
        this.clearFields();
        this.loadReuniaoCliente();
        this.clienteInput.nativeElement.value = "";
        this.filter("");
        this.viewClienteHandle("");
        this.filteredCliente$ = of([]);
        this.loadClientes();
      },
        err => {
          this.toasterService.danger('', `Erro ao cadastrar Reunião!`);
          this.clienteInput.nativeElement.value = "";
          this.filter("");
          this.viewClienteHandle("");
          this.filteredCliente$ = of([]);
          this.loadClientes();
        });
  }

  goToReuniao() {
    this.router.navigate(['/pages/cadastro/cliente/edit/', this.reuniaoForm.controls["idCliente"].value], { queryParams: { "visualizarReuniao": true } });
  }

  clearFields() {
    this.events = [];
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  // AUTOCOMPLETE
  onClienteSelectionChange($event) {
    this.filteredCliente$ = this.getFilteredCliente($event.nome);
    this.reuniaoForm.controls['idCliente'].setValue($event.id);
  }

  private filter(value: string): ClienteAutoComplete[] {
    let filterValue = "";
    if (value['id']) {
      filterValue = value['fullName'].toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    return this.clientes.filter(optionValue => optionValue.nome.toLowerCase().includes(filterValue));
  }

  getFilteredCliente(value: string): Observable<ClienteAutoComplete[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  viewClienteHandle(value: any) {
    if (value['id']) {
      return value.nome;
    } else {
      return value;
    }
  }

  onClienteChange() {
    this.filteredCliente$ = this.getFilteredCliente(this.clienteInput.nativeElement.value);
  }
}
