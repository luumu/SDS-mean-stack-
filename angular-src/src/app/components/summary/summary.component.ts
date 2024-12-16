import { Component, OnInit } from '@angular/core';
import {DataService, Record} from '../../services/data.service';
import {DatadisplayService} from '../../services/datadisplay.service';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import {FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  pageSize: number;
  show: boolean;

  constructor(public dataService: DataService, private flashMessage: FlashMessagesService,
    public dataDisplayService: DatadisplayService) { }

  ngOnInit() {
    this.show = false;
    this.pageSize = 10;
  }

  showAdd(){ /// Hides or shows the form to add a new record
    if(this.show){
      this.show = false;
    }else {
      this.show = true;
    }

  }

  deleteRecord(record){
    this.dataService.deleteRecord(record).subscribe((data: any) => {
      if(data.success) {
        this.dataDisplayService.RecordSplice(record);
        this.flashMessage.show("Delete successful",
          {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashMessage.show("Delete failed",
          {cssClass: 'alert-danger', timeout: 5000});
      }
    });

  }

  getStyle(record) { //Chhange color based on type
    if(record.isIncome){
      return "green"
    }else {
      return "red";
    }

  }

}
