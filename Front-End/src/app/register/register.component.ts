import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
  }

  Register(f : NgForm){

    if(!f.value.agree){
      return console.log("Agreement box unchecked");
    }

    let obj={
      name : f.value.name,
      email : f.value.email,
      password : f.value.password
    }
    let header = new Headers({"Content-Type" : "application/json"});
    let options = new RequestOptions({ headers : header });

    this.http.post("http://localhost:3000/api/user/register", obj, options)
    .subscribe(
      result => {
        this.route.navigate(['/login']);
      },
      error => {
        console.log("Error.")
      }
    );
  }

}
