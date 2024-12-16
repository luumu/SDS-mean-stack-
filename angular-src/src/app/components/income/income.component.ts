import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DataService, Record} from '../../services/data.service';
import {DatadisplayService} from '../../services/datadisplay.service';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from '@angular/router';
import {ValidateService} from '../../services/validate.service';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  name: String;
  user_id: String;
  amount: Number;
  mandatory: Boolean;
  isIncome: Boolean = false;
  isExpense: Boolean = false;

  constructor(private dataService: DataService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private dataDisplayService: DatadisplayService,
    private validateService: ValidateService) { }

  ngOnInit() {
  }

  onAddSubmit(){
    if(!this.validateService.validateAmount(this.amount)){
      this.flashMessage.show("Invalid amount",{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    else {
      if(!this.isIncome) {
        this.amount = -this.amount;
      }

      const income = {
        name: this.name,
        user_id: JSON.parse(localStorage.getItem("user")).id,
        amount: this.amount,
        mandatory: this.mandatory,
        isIncome: this.isIncome,
        isExpense: this.isExpense
      }

      this.dataService.addRecord(income).subscribe(data => {
        if(data.success){
            this.flashMessage.show("success"
            ,{cssClass: 'alert-success', timeout: 3000});
              this.dataService.updateRecordData(data.data);
              this.amount = null; //Clear these
              this.name = '';

        }else{
          this.flashMessage.show("Error"
          ,{cssClass: 'alert-danger', timeout: 3000});
          this.amount = null;
          this.name = '';


        }
      });
    }

  }



}
