import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true  
})
export class LoginComponent {
  username: string = '';  
  password: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.router.navigate(['/protected-route']); // Redirection
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials'; // Afficher l'erreur
      }
    });
  }
}
