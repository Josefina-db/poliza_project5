import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
export interface FieldProperties {
  field: string;
  content: string;
  confidence: number;
}
@Component({
  selector: 'app-display-info',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.scss'],
})
export class DisplayInfoComponent implements OnInit {
  constructor(private rest: RestService) {}
  public dataSourceFile: any[] = [];
  public analizedFile!: any[];
  ngOnInit(): void {
    this.loadResults().then((value: any) => {
      this.dataSourceFile = value;
      this.dataSource = this.dataSourceFile[0].analysis.fields;
      this.analizedFile = [
        {
          fileName: this.dataSourceFile[0].file,
          modelName: this.dataSourceFile[0].analysis.model,
          modelConfidence: this.dataSourceFile[0].analysis.confidence,
        },
      ];
    });
  }
  loadResults() {
    try {
      return this.rest.get(`http://localhost:3000/results`).toPromise();
    } catch (e) {
      console.log('ERROR', e);
      throw e;
    }
  }
  columns = [
    {
      columnDef: 'field',
      header: 'Field name',
      cell: (element: FieldProperties) => `${element.field}`,
    },
    {
      columnDef: 'content',
      header: 'Field value',
      cell: (element: FieldProperties) => `${element.content}`,
    },
    {
      columnDef: 'confidence',
      header: 'Field confidence',
      cell: (element: FieldProperties) => `${element.confidence}`,
    },
  ];
  dataSource = this.dataSourceFile;
  displayedColumns = this.columns.map((c) => c.columnDef);
}
