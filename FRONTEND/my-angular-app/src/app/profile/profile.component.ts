import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone:true
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup; 

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });

    // Load the user's current profile data here, if available
    this.loadProfile();
  }

  loadProfile() {
    // Simulate loading data from AuthService
    // This should ideally be replaced with actual data loading logic
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.profileForm.patchValue(profile);
      },
      error: (error) => console.error('Error loading profile', error)
    });
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe({
        next: () => alert('Profile updated successfully!'),
        error: (error) => alert('Failed to update profile: ' + error)
      });
    }
  }
}
