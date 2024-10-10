import { NgIf } from '@angular/common';
import { asNativeElements, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { from, fromEvent, Observable, of, interval } from 'rxjs';
import internal from 'stream';

@Component({
  selector: 'app-learnings',
  standalone: true,
  imports: [NgIf],
  templateUrl: './learnings.component.html',
  styleUrl: './learnings.component.css'
})
export class LearningsComponent implements OnInit{
  agents!: Observable<string>; // Definite assignment assertion
  agentName!: string;  

  //=== of Operator with Array
  studentList = ["Rafiq", "Rosy", "Rubbecca"];
  students: Observable<string[]> = of(this.studentList) //=== of(["Rafiq", "Rosy", "Rubbecca"])
  //=== of Operator with String
  studentName: Observable<string> = of('Ram is my best friend.');
  //=== of Operator with Object
  studentObj= {
    id: 101,
    Name: 'Rafiq Shah',
    Age: 56
  }
  student$: Observable<any> = of(this.studentObj); //=== $ sign is represented to an observable variable
  //=== from Operator with Array 
  //=== Adding $ at end is good practice to described an observable.
  ordersArr = ['Electronics', 'Mobiles', 'Kitchenware', 'Fashions']
  orders$: Observable<string> = from(this.ordersArr);
  orderName!: string;
  //=== fromEvent Chapter 8 ===
  @ViewChild('validate') 
  validate!: ElementRef;

  @ViewChild('getLink') 
  getLinkData!: ElementRef;

  //===

  ngOnInit(): void {
   /*=== debounceTime Operator Chapter 10 ===*/

    /*=== interval Operator Chapter 9 
    this.orders$.subscribe(data =>{
      const seqNumber$ = interval(500);

      seqNumber$.subscribe(num =>{
        if(num < 5)
        {
        console.log('chapter 9:' + data +' '+ num)
        }
      })
      
    })
      ===*/
/*=== Chapter 8 
  rxJsEventObservable()
{
  const btnObservable$ = fromEvent(this.validate?.nativeElement, 'click' );

  btnObservable$.subscribe(data =>{
    console.log(data)
  })  
}

getEventObservale()
  {
    const linkObservable$ = fromEvent(this.getLinkData?.nativeElement, 'mouseover');

    linkObservable$.subscribe(data =>{
      console.log(data)
    })
  }
===*/
    /*=== Chapter 5 
    this.students.subscribe( data =>{
      console.log(data)
    })
    
    this.studentName.subscribe(data =>{
      console.log(data);
    })
this.student$.subscribe(data => {
  console.log(data);
})
End ===*/
    /*=== Chapter 4
    this.agents = new Observable(
      function(observer){
        try {
          observer.next("Rafiq Mohammad Shah");

          setInterval(()=> {
            observer.next("Renu Parveen Shah");
          }, 5000);

          setInterval(()=> {
            observer.next("Rafirose Khan Shah");
          }, 4000);
          
          setInterval(()=> {
            observer.next("Rubbecca Khan Shah")
          }, 3000)
          
          
        } catch (e) 
        {
          observer.error(e)
        }
    
      });

      this.agents.subscribe(data =>{
        this.agentName = data;
      })
    ===*/
    /*===
    this.orders$.subscribe(data =>{
      setInterval(() => {
        this.orderName = data
      }, 2000)
    });
    ===*/
  }

}
