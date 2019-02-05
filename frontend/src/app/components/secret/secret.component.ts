import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {
  // Data Form API
  data;

  // Loading status
  isLoading = true;

  // Errors to display
  error = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getData();
  }

  // ********** Get Secret Data from API **********
  getData() {
    this.authService.getSecret().subscribe(
      res => {
        if (res && res['data']) {
          this.data = res['data'];
        }
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.error = error[error] || 'Some Error Occured';
      }
    );
  }
}
