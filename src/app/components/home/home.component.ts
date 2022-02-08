import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formPol: FormGroup;
  private archivos: any = [];
  public loading: boolean = false;
  showSpinner = false;
  hideForm = false;

  constructor(
    public fb: FormBuilder,
    private rest: RestService,
    private router: Router
  ) {
    this.formPol = this.fb.group({
      file: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formPol.invalid) {
      return;
    }

    this.sendFiles(); //funcion que pasa el form al back me imagino
  }

  captureFiles(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.archivos.push(event.target.files[i]);
    }
  }
  sendFiles(): any {
    try {
      this.loading = true;
      this.showSpinner = true;
      const formularioDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        formularioDatos.append('file', archivo);
      });
      formularioDatos.append('model', this.formPol.controls.type.value);

      this.rest
        .post(`http://localhost:3000/multiple`, formularioDatos)
        .subscribe((res) => {
          this.loading = false;
          this.showSpinner = false;
          //this.hideForm = true;
          console.log('Respuesta del servidor', res);
          this.router.navigate([`/displayInfo`]);
        });
      this.archivos = [];
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);
    }

    return;
  }
}
