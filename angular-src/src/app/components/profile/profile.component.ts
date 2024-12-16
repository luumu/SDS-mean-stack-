import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile:any) => {
      this.user = profile.user;
    },
  err => {
    console.log(err);
    return false;
  });
  //this.dataService.getIncome().subscribe();
  }


}
