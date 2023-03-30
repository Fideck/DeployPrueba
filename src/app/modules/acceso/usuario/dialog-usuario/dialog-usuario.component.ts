import { Component, OnInit } from '@angular/core';
import { AlertsService, User } from 'src/app/core';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-dialog-users',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.css']
})
export class DialogUsuarioComponent implements OnInit {
  //Luis Martinez RF1
  public form!:FormGroup;
  usuarioEdit!: User;
  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private _alertServices:AlertsService,
    public modalRef: MdbModalRef<DialogUsuarioComponent>) {
      this.form = this.formulario();
     }

  ngOnInit(): void {
  }
  registrar(): void {
    const proveedor: User = this.form.value;
    this.usuarioService.agregarUsuario(proveedor).subscribe(
      (resp) => {
        this._alertServices.alertSucces('Usuario registrado');
        this.form.reset();
        this.modalRef.close(resp);
      },
      (errors) => {
        this._alertServices.alertError('A ocurrido un error');
      }
    );
  }
  private setForm() {
    this.form.patchValue(this.usuarioEdit);
  }
  private formulario(){
    return this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      usertype: ['', Validators.required],
    });
  }
}
