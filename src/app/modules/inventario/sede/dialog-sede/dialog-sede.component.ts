import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertsService, ISede, SedeService } from 'src/app/core';

@Component({
  selector: 'app-dialog-sede',
  templateUrl: './dialog-sede.component.html',
  styleUrls: ['./dialog-sede.component.css'],
})
export class DialogSedeComponent implements OnInit {
  form!: FormGroup;
  sedeEdit !: ISede;
  constructor(
    private fb: FormBuilder,
    private _sedeService: SedeService,
    private _alertService: AlertsService,
    public modalRef: MdbModalRef<DialogSedeComponent>
  ) {
    this.form = this.formulario();
  }

  ngOnInit(): void {
    if(this.sedeEdit){
      this.setForm();
    }
  }
  submitSede() {
    const sede: ISede = this.form.value;
    if (!this.sedeEdit) {
      this.addSede(sede);
    } else {
      this.updateSede(sede);
    }
  }
  private addSede(sede: ISede) {
    this._sedeService.agregarSede(sede).subscribe({
      next: (response) => {
        console.log(response);
        this._alertService.alertSucces('Sede Registrado');
        this.form.reset();
        this.modalRef.close(response);
      },
      error: (error) => {
        console.log(error);
        this._alertService.alertError('A ocurrido un error');
      },
    });
  }

  private updateSede(sede: ISede) {
    this._sedeService.modificarSede(sede).subscribe({
      next: (response) => {
        console.log(response);
        this._alertService.alertSucces('Sede Actualizado');
        this.form.reset();
        this.modalRef.close(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  private setForm() {  
    this.form.patchValue(this.sedeEdit);
  }
  private formulario(){
    return this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }
}
