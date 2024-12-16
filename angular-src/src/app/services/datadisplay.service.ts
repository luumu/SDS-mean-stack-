import { Injectable } from '@angular/core';
import {DataService, Record} from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class DatadisplayService {

  constructor(public dataService: DataService) {
   }
   dataSource:Record[] = [];
   RecordData: Record[] = [];
   sortDirection = '';
   to_date: any;
   from_date: any;
   amount: number;
   name: string;

    totalExpense(){
      var total = 0;
      for(var i = 0; i < this.dataSource.length; i++) {
        if(!this.dataSource[i].isIncome){
          total += this.dataSource[i].amount;
        }
      }
      return Math.abs(total);
    }

    totalIncome(){
      var total = 0;
      for(var i = 0; i < this.dataSource.length; i++) {
        if(this.dataSource[i].isIncome){
          total += this.dataSource[i].amount;
        }
      }
      return Math.abs(total);
    }

    nonMandatory(){
      var total = 0;
      for(var i = 0; i < this.dataSource.length; i++) {
        if(!this.dataSource[i].mandatory && !this.dataSource[i].isIncome){
          total += this.dataSource[i].amount;
        }
      }
      return Math.abs(total);
    }

    getRecordData(){
      this.dataService.getRecord().subscribe(Record => {
      this.dataService.RecordData = Record;
      this.dataSource = this.dataService.RecordData

    });
    }

    sortBy(sort: string){ ///https://stackoverflow.com/questions/43311121/sort-an-array-of-objects-in-typescript
      this.sortDirection = this.sortDir(this.sortDirection);

      switch(this.sortDirection) {
        case 'asc':
        if(sort === 'date'){
          this.dataSource = this.dataSource.sort(this.sortByDateAsc);
        }
        if(sort === 'name'){
          this.dataSource = this.dataSource.sort(this.sortByNameAsc);
        }
        if(sort === 'amount'){
          this.dataSource = this.dataSource.sort(this.sortByAmountAsc);
        }
        break;

        case 'desc':
        if(sort === 'date'){
          this.dataSource = this.dataSource.sort(this.sortByDateDesc);
        }
        if(sort === 'name'){
          this.dataSource = this.dataSource.sort(this.sortByNameDesc);
        }
        if(sort === 'amount'){
          this.dataSource = this.dataSource.sort(this.sortByAmountDesc);
        }
      }
    }

    RecordSplice(record){ //removes the record from  datasource array
      let index = this.dataSource.indexOf(record);
      this.dataSource.splice(index,1);

    }
    sortByDateAsc(d1: Record, d2:Record){
      if(new Date(d1.date) < new Date(d2.date)){
        return 1
      }else if (new Date(d1.date) > new Date(d2.date)){
        return -1
      }else {
        return 0;
      }
    }
    sortByDateDesc(d1: Record, d2:Record){
      if(new Date(d1.date) > new Date(d2.date)){
        return 1
      }else if (new Date(d1.date) < new Date(d2.date)){
        return -1
      }else {
        return 0;
      }
    }

    sortByNameAsc(d1: Record, d2:Record) {
      if(d1.name < d2.name){
        return -1
      }else if (d1.name > d2.name){
        return 1
      }else {
        return 0;
      }
    }

    sortByNameDesc(d1: Record, d2:Record) {
      if(d1.name < d2.name){
        return 1
      }else if (d1.name > d2.name){
        return -1
      }else {
        return 0;
      }
    }

    sortByAmountAsc(d1: Record, d2:Record) {
      if(d1.amount < d2.amount){
        return 1
      }else if (d1.amount > d2.amount){
        return -1
      }else {
        return 0;
      }
    }

    sortByAmountDesc(d1: Record, d2:Record) {
      if(d1.amount < d2.amount){
        return -1
      }else if (d1.amount > d2.amount){
        return 1
      }else {
        return 0;
      }
    }

    sortDir(sortDirection){
      if(sortDirection === '') {
        return 'asc';
      } else if(sortDirection === 'asc'){
        return 'desc';
      } if(sortDirection === 'desc'){
        return 'asc';
      }
    }

    filterBy(filter: string){
      switch(filter) {
        case 'both':
        this.dataSource = this.dataService.RecordData;
        break;
        case 'income':
        this.dataSource = this.dataSource.filter(record =>{
          return record.isIncome
        });
        break;
        case 'expense':
        this.dataSource = this.dataSource.filter(record =>{
          return !record.isIncome
        });
        break;
        case 'mandatory':
        this.dataSource = this.dataSource.filter(record =>{
          return record.mandatory
        });
        break;
        case 'date':
        this.dataSource = this.dataSource.filter(record =>{
          return new Date(record.date) >= new Date(this.from_date) &&
          new Date(record.date) <= new Date(this.to_date);
        });
        break;
        case 'name':
        this.dataSource = this.dataSource.filter(record =>{
          return record.name == this.name;
        });
        break;
      }

    }
}
