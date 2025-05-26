import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toolbar } from 'primeng/toolbar';
import { ModuleResponse } from '../../../models/module/ModuleResponse';
import { ModulesService } from '../../../services/module/modules.service';
import { Location, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { ModuleRequest } from '../../../models/module/ModuleRequest';

@Component({
    selector: 'app-create-module',
    imports: [Button, InputText, ReactiveFormsModule, Toolbar, NgIf],
    templateUrl: './create-module.component.html',
    styleUrl: './create-module.component.scss'
})
export class CreateModuleComponent implements OnInit {
    moduleResponse!: ModuleResponse;
    module!: ModuleRequest;
    isLoading = true;
    errorMessage = '';
    createModuleForm: FormGroup | any;

    constructor(
        private moduleService: ModulesService,
        private location: Location,
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.module = {
            color: '',
            icon: '',
            moduleCode: '',
            uri: '',
            moduleName: ''
        };
        this.createModuleForm = new FormGroup({
            moduleName: new FormControl('', [Validators.required, Validators.minLength(5)]),
            moduleCode: new FormControl('', [Validators.required]),
            uri: new FormControl('', [Validators.required]),
            color: new FormControl('', [Validators.required]),
            icon: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {}

    createModule() {
        this.module.moduleName = this.createModuleForm.get('moduleName').value;
        this.module.moduleCode = this.createModuleForm.get('moduleCode').value;
        this.module.uri = this.createModuleForm.get('uri').value;
        this.module.color = this.createModuleForm.get('color').value;
        this.module.icon = this.createModuleForm.get('icon').value;

        this.moduleService.createModule(this.module).subscribe({
            next: (data) => {
                this.moduleResponse = data;
                this.createModuleForm.reset();
                this.notificationService.showSuccess('Succès', 'Module created successfully');
                this.router.navigate(['/modules/detail', this.moduleResponse.id]);
            },
            error: (error) => {
                console.error('Error creating role:', error);
                this.notificationService.showError('Error', 'Failed to create role');
            }
        });
    }

    cancel() {
        this.location.back();
    }
}
