import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';

export interface analyzedPolicy {
  file: string;
  analysis: {
    model: string;
    confidence: number;
    fields: [
      {
        field: string;
        content: string;
        confidence: number;
      }
    ];
  };
}

@Component({
  selector: 'app-display-info',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.scss'],
})
export class DisplayInfoComponent implements OnInit {
  constructor(private rest: RestService) {}
  public results: any = [];

  ngOnInit(): void {
    this.loadResults();
    console.log(this.results);
  }

  loadResults() {
    try {
      this.rest
        .get(`http://localhost:3000/results`)
        .subscribe((response: any) => {
          console.log(response);
          response.forEach((analisis: any) => {
            this.results.push(analisis);
          });
          console.log(this.results[0]);
        });
    } catch (e) {
      console.log('ERROR', e);
    }
  }
  displayedColumns: string[] = ['file'];
  dataSource = this.results;
}
