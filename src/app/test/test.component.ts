import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormArray, NgForm } from '@angular/forms'
import { CdkDragDrop,moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { NodeService } from '../Services/node.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tasksForm = new FormGroup({
    name:new FormControl("",Validators.compose([Validators.required])),
    TaskDurationH:new FormControl("",Validators.compose([Validators.required])),
    TaskDurationM:new FormControl("",Validators.compose([Validators.required])),
    machineId:new FormControl("",Validators.compose([Validators.required])),
  })
  machinesForm = new FormGroup({
    machineName:new FormControl("",Validators.compose([Validators.required])),
  })
  machines:any;
  tasks:any;
  theArray:any;
  task:any;
  counters:any;
  constructor(public Service:NodeService) { 
    this.getMachines()
    this.getTasks()
    interval(1000).subscribe((ev)=>{
      this.counters={}
      for (let i = 0; i < this.tasks.length; i++) {
        this.counters[this.tasks[i].id]=this.timeCounter(this.tasks[i].endDate)
      }
      console.log(this.counters);
      
    })
  }
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
  authorization()
  {
  
    //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
    this.Service.postFun('authorization',this.tasksForm.value).subscribe(data => {

  })
  }
  addBtn(machineId:any){
    this.tasksForm.get('machineId').setValue(machineId)
    console.log(this.tasksForm.value);
  }
  addtask() {
    this.Service.postFun('importTask',this.tasksForm.value).subscribe(data => {
      console.log(data);
      
    })
  }
  addMachine() {
    this.Service.postFun('importMachine',this.machinesForm.value).subscribe(data => {
      console.log(data);
      
    })
  }
  addTask() {
    this.Service.postFun('importTasks',this.tasksForm .value).subscribe(data => {
      console.log(data);
      
    })
  }
  Delete(element:any,array:any){
    console.log(array);

    // this.ownedAnimals.splice(array.indexOf(element),1)

  }
  getMachines(){
    this.Service.getFun('getMachine').subscribe(data => {
      this.machines=data;
    })
  }
  getTasks(){
    this.Service.getFun('getTasks').subscribe(data => {
      console.log(data);
      
      this.tasks=data;
    })
  }
  timeCounter(endDate){
    try {
        var seconds = Math.floor((new Date(endDate).getTime() - (new Date().getTime()))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);
        console.log("seconds",endDate);
        
        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
        return days+"D"+" : "+hours+"H"+" : "+minutes+"M"+" : "+seconds+"S";
    } catch (error:any) {
      console.log(error.message);
    }
  }
}
