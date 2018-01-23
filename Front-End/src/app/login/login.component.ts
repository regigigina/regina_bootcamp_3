import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http : Http, private route : Router ) { }

  ngOnInit() {
  }

  Login(f : NgForm){

    if(f.value.identity=="" || f.value.password==""){
      return console.log('User name and password cannot be empty.')
    }
    else{
      let obj = {
        identity : f.value.identity,
        password : f.value.password
      }
  
      let header = new Headers({ "Content-Type" : "application/json" });
      let options = new RequestOptions({ headers : header });
  
      this.http.post("http://localhost:3000/api/user/login", obj, options)
      .subscribe(
        result => {
  
          if(!f.value.remember){
            sessionStorage.setItem("token", result.json().token);
            console.log("Saved in session storage.")
            this.route.navigate(['/']);
          }
          else{
            localStorage.setItem("token", result.json().token);
            console.log("Saved in local storage.")
            this.route.navigate(['/']);
          }        
        },
        error =>{
          console.log("User not found.")
        }
      );
    }
  }
}
