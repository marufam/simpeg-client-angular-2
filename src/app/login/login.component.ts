import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string
  password : string
  resultData : any
  data : any
  error : any

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit() {
  	var token = localStorage.getItem('token')
  	if (token != null) {
  		this.router.navigateByUrl('/pegawai');
  	}
  }

  goLogin(){
	this.data = {
		name : this.username,
		password : this.password
	}

	this.auth.login(this.data)
	.subscribe(
		(data) => {
			if (data.success == true) {
				localStorage.setItem("token", data.token)
				this.router.navigateByUrl("/pegawai")
        window.location.reload()
			}else{
				this.error = data.message
			}
		}
		
	)	

  }

}
