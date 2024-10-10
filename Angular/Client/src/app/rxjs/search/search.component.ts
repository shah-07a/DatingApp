import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormControlName, FormBuilder } from '@angular/forms'; 
import { debounceTime, take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup; // Define the searchForm property
  name!: FormControl;
  constructor(private formBuilder: FormBuilder ) {}
  
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl('Start Search...')
    });
    // this.searchForm.get('name')?.valueChanges.subscribe(data =>{
    //   console.log
    //  });
    /*=== debounceTime Operator ===*/

     this.searchForm.get('name')?.valueChanges
     .pipe(
      //===take(5), //=== Operator take will take n of values.
      takeWhile((v) => this.checkCondition(v)),
      debounceTime(1000)) //=== Operator debounceTime time lag before it emit next value.
      .subscribe(data =>{
      console.log(data)
     });
  }
  checkCondition(value: string | any[])
  {
    return value.length > 6 ? false : true;
  }
  readValue()
  {

  }
}
