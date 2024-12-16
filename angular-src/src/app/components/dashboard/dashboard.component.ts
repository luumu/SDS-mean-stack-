import { Component, OnInit } from '@angular/core';
import {DatadisplayService} from '../../services/datadisplay.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataDisplayService: DatadisplayService) { }

  ngOnInit() {
    this.dataDisplayService.getRecordData();
  }

}
