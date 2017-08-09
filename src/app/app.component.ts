import { Component , OnInit} from '@angular/core';
import { Request , Headers, RequestOptions, Http} from '@angular/http';
import {Router} from '@angular/router'

import {MainServiceService} from './_service/main-service.service'

import * as env from './global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app works!';
  token = localStorage.getItem('token');
  menu_collection : any
  
  my_menu : boolean
  menu_user :boolean
  role_name : string

  url = window.location.href
  split = this.url.split("/")

	constructor(
		private router : Router, 
		private http : Http,
		private main_s : MainServiceService
	){
		var token = localStorage.getItem("token")
		if (!token || token == undefined || token == null) {
			this.router.navigateByUrl("/login")
			this.my_menu = false
		
		} else{
			this.my_menu = true
			this.whois()

		}

	}

	whois(){
	    this.main_s.whois()
	    .subscribe(
	      (data) => {
	         this.mymenu(data.role._id)
	         this.role_name = data.role.namarole
	         console.log(data)

	         if (this.role_name == "user") {
				this.router.navigateByUrl("/user/"+data.nip)
				this.menu_user = true
			 }else{
				this.menu_user = false
			 }

	      }
	    )
	}

	mymenu(param){
		this.main_s.getmymenu(param)
	    .subscribe(
	      (data) => {
	         this.menu_collection = data.data
	      }
	    )
	}

	showme(){
		alert("dadadadadada")
	}

}


