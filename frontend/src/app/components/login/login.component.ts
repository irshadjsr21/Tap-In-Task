import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Default User Input
  defaultValues = {
    username: 'User name',
    password: 'password'
  };

  // Default Error
  defaultError = 'Login Failed. Try with correct credentials';

  // Input Form Group
  form: FormGroup;

  // Error to display
  error: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Initializing Form
    this.form = this.fb.group({
      username: [this.defaultValues.username],
      password: [this.defaultValues.password]
    });

    // Getting Error from query params
    this.activeRoute.queryParamMap.subscribe(params => {
      if (params['params'] && params['params']['error']) {
        this.error = params['params']['error'];
      }
    });
  }

  // ********** Handle Form Submission ***********
  onSubmit(): void {
    const { username, password } = this.form.value;

    // If form has default values => show error
    if (
      username === this.defaultValues.username ||
      password === this.defaultValues.password
    ) {
      this.error = 'Invaild Input';
    } else {
      // If form has values other than default => login user
      this.authService.loginUser({ username, password }).subscribe(
        res => {
          if (res['token']) {
            this.authService.setToken(res['token']);
            this.router.navigateByUrl('/secret');
          } else {
            this.error = this.defaultError;
          }
        },
        error => {
          this.error = this.defaultError;
        }
      );
    }
  }

  // ***** Functions to Change Input Values on focus and blur *****
  focus(input): void {
    this.error = '';
    if (input === 'username') {
      this.changeValues('username', this.defaultValues.username, '');
    } else if (input === 'password') {
      this.changeValues('password', this.defaultValues.password, '');
    }
  }

  blur(input): void {
    if (input === 'username') {
      this.changeValues('username', '', this.defaultValues.username);
    } else if (input === 'password') {
      this.changeValues('password', '', this.defaultValues.password);
    }
  }

  // ********** Helper Function to Interchange Values ********
  private changeValues(key, oldValue, newValue): void {
    if (this.form.value[key] === oldValue) {
      this.form.setValue({ ...this.form.value, [key]: newValue });
    }
  }
}
