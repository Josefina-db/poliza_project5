import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  private results: any = [];

  constructor(public fb: FormBuilder, private rest: RestService) {
    this.formPol = this.fb.group({
      file: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults() {
    try {
      this.rest.get(`http://localhost:3000/results`).subscribe((response) => {
        console.log(response);
        this.results = response;
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  }

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
      const formularioDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        formularioDatos.append('file', archivo);
      });
      formularioDatos.append('model', this.formPol.controls.type.value);

      this.rest
        .post(`http://localhost:3000/multiple`, formularioDatos)
        .subscribe((res) => {
          this.loading = false;
          console.log('Respuesta del servidor', res);
        });
      this.archivos = [];
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);
    }

    return;
  }
}
