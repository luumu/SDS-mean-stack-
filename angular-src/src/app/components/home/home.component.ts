import { Component, OnInit } from '@angular/core';
import {DatadisplayService} from '../../services/datadisplay.service';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

}
