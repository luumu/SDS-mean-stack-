import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {DatadisplayService} from '../../services/datadisplay.service';
import {Chart} from 'chart.js'
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart = [];
  dates = [];
  records = [];
  incomes = [];
  expenses =[];

  public lineChartData:Array<any> = [
  {data: this.incomes, label: 'Income'},
  {data: this.expenses, label: 'Expense'},
];

public lineChartLabels:Array<any> = this.dates;
public lineChartOptions:any = {
  responsive: true
};
public lineChartColors:Array<any> = [
  {
    borderColor: '#3cba9f',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    borderColor: '#c45850',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }

];
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';



  constructor(private dataService: DataService, public dataDisplayService: DatadisplayService) { }

  ngOnInit() {
    this.getChartdata();
  }
  getChartdata() {
    this.dataService.getlastWeek().subscribe(Record => {
       Record.forEach(rec =>{
         var date = ''+rec._id.day+'.'+rec._id.month+'.'+rec._id.year;
         this.dates.push(date);

         this.expenses.push(Math.abs(rec.expense))
         this.incomes.push(rec.income);
         this.records.push({date:new Date(rec._id.year, rec._id.month-1, rec._id.day), income:rec.income, expense: rec.expense})

       });
   });

}
removeDupes(arr){ // used to remove duplicate dates from array not used any where please delete
    let unique_array = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique_array
}

}
