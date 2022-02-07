import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
@Component({
  selector: 'app-display-info',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.scss'],
})
export class DisplayInfoComponent implements OnInit {
  constructor(private rest: RestService) {}
  public displayedColumns: string[] = ['file', 'analysis', 'model', 'fields'];
  public dataSourceFile: any[] = [];
  ngOnInit(): void {
    this.loadResults().then((value: any) => {
      this.dataSourceFile = value;
      console.log('line 18', this.dataSourceFile);
    });
    //this.dataSource=ELEMENT_DATA;
  }
  loadResults() {
    try {
      return this.rest.get(`http://localhost:3000/results`).toPromise();
    } catch (e) {
      console.log('ERROR', e);
      throw e;
    }
  }
  toJson(object: any) {
    return JSON.stringify(object);
  }
}
