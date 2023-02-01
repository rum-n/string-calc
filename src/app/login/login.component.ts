import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  wrongCredentials = false;
  username = '';
  password = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({ username: '', password: '' });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (
      this.loginForm.value.username === 'sasha' &&
      this.loginForm.value.password === 'elearnio'
    ) {
      sessionStorage.setItem('logged', 'true');
      this.router.navigate(['/calculator']);
    } else {
      this.wrongCredentials = true;
      this.loginForm.reset();
    }
  }
}
