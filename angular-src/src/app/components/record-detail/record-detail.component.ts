import { Component, OnInit } from '@angular/core';
import {DataService, Record} from '../../services/data.service';
import {DatadisplayService} from '../../services/datadisplay.service';
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {
  Record = {};
//  id = '';

  constructor(private dataService: DataService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private dataDisplayService: DatadisplayService) { }

  ngOnInit() {
    this.getRecord(this.route.snapshot.params['id'])
  }

  onEditSubmit(record){
    this.dataService.editRecord(record).subscribe(data => {
      if(data.success){
          this.flashMessage.show("success"
          ,{cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/dashboard']);

      }else{
        this.flashMessage.show("Error"
        ,{cssClass: 'alert-danger', timeout: 3000});


      }
    });

  }

  getRecord(id){
    this.dataService.getOne(id).subscribe(data => {
      console.log(data.data);
      if(data.success){
          this.flashMessage.show("success"
          ,{cssClass: 'alert-success', timeout: 3000});
            this.Record = data.data;

      }else{
        this.flashMessage.show("Error"
        ,{cssClass: 'alert-danger', timeout: 3000});

      }
    })
  }

}
