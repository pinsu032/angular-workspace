import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../service/account.service';
import Swal from 'sweetalert2';

//import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    register!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService : AccountService
        //private accountService: AccountService,
        //private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.register = this.formBuilder.group({
            fullName: ['',Validators.required],
            email: ['',Validators.required],
            mobile: ['',Validators.required],
            gender: ['',Validators.required],
            dob: ['',Validators.required],
            password: ['',Validators.required],
            address: ['',Validators.required]
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onRegister(){
        this.loginService.registerUser(this.register.value).subscribe(data=>{
            Swal.fire({
                text: "User Registeres Successfully..",
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            this.router.navigate(['login']);
        },
        error=>{
            Swal.fire({
                text: "Something went wrong",
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        
      )
    }

    onSubmit() {
        console.log(this.form.value);
        this.submitted = true;
        
        this.loginService.login(this.form.value).subscribe(data=>{
            console.log(data.msg)
            
            if(data.msg == "Login Success..."){
                localStorage.setItem('token',data.token);
                this.router.navigate(['home']);
            }
        },
        error => {
            Swal.fire({
                text: "Something went wrong",
                icon: 'error',
                confirmButtonText: 'Ok'
            } )
            
        }
        )
        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        /* this.loading = true;
        //this.accountService.login(this.f.username.value, this.f.password.value)
           // .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });*/
    } 
}