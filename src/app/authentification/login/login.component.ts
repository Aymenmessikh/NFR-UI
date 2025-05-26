import { Component } from '@angular/core';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-login',
    imports: [AppFloatingConfigurator, FormsModule, Button, Toast],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(
        private metamask: LoginService,
        private http: HttpClient,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    async loginWithMetaMask() {
        const address = await this.metamask.connectWallet();
        if (address) {
            this.http.post('http://localhost:3000/users/login', { address }).subscribe(
                (res: any) => {
                    // Success: Store token and navigate
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/erp']); // Navigate to home page or another route
                    this.notificationService.showSuccess('Succès', 'Login Successful');
                },
                (error) => {
                    this.notificationService.showError('Error', `Login Failed: ${error}`);
                    console.error('Login error:', error);
                }
            );
        }
    }
}
