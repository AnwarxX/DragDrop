import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms'

import { CdkDragDrop,moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  theArray:any;
  addBtn(array1:any){
    this.theArray=array1
  }
  Add(PARAM: any) {
    console.log(PARAM);
    this.theArray.push(PARAM) 
  }
  Delete(element:any,array:any){
    console.log(array);

    this.ownedAnimals.splice(array.indexOf(element),1)

  }

  ownedAnimals=[

  ]
  animalsWishList=[

  ]
  animalsPets=[

  ]
  test1=[

  ]
  test2=[

  ]


  constructor() { }

  ngOnInit(): void {
  }
  onDrop(event:CdkDragDrop<string []>){
    if (event.previousContainer === event.container) {
        moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
    else{
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
    console.log(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }


}
