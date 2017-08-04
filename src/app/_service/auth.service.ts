import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as env from '../global'

@Injectable()

export class AuthService {
	jsonData: any ;
  constructor(private http : Http) {
  	this.http = http;
  }


  login(credetial){ 
  	var header = new Headers();
  	header.append('Content-type', 'Application/json');

  	return this.http.post(env.url + '/u1/login',JSON.stringify(credetial), {headers : header})
  	.map(res=> res.json())
  }


}
