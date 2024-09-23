import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  accountService = inject(AccountService);
  //=== It was previous approach @Input() usersFromHomeComponet: any;
  usersFromHomeComponet = input.required<any>();
  //=== It was previous approach  @Output() cancelRegister = new EventEmitter();
  cancelRegister = output<boolean>();
  model: any = {};

register()
{
  this.accountService.Register(this.model).subscribe({
    next: response => {
      console.log(response),
      this.cancel()
    },
    error: error => console.log(error)
})
}
cancel()
{
  this.cancelRegister.emit(false);
}


}
