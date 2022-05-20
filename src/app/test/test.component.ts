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
  machineIds:any;
  constructor(public Service:NodeService) { 
    this.getMachines()
    this.getTasks()
    console.log(this.tasks);
    console.log(this.counters);
    interval(1000).subscribe((ev)=>{
      this.counters={}
      for (let i = 0; i < Object.keys(this.tasks).length; i++) {
        if(this.tasks[Object.keys(this.tasks)[i]][0]!=undefined)
          this.counters[this.tasks[Object.keys(this.tasks)[i]][0].id]=this.timeCounter(this.tasks[Object.keys(this.tasks)[i]][0].endDate)
      }
    })
  }
  ngOnInit(): void {
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
  updateTask(machineId:any,taskId:any,machineIdBefore:any,taskIDsBefore:any) {
    this.Service.postFun('updateTask',{machineId,taskId,machineIdBefore,taskIDsBefore}).subscribe(data => {
      console.log(data);
      // this.getTasks()
    })
  }
  addMachine() {
    this.Service.postFun('importMachine',this.machinesForm.value).subscribe(data => {
      console.log(data);
      this.getMachines()
    })
  }
  addTask() {
    console.log(this.tasksForm.value);
    this.Service.postFun('importTasks',this.tasksForm.value).subscribe(data => {
      console.log(data);
      this.getTasks()
    })
  }
  deleteMachine(element:any){
    this.Service.postFun('deleteMachine',{id:element}).subscribe(data => {
      console.log(data);
      this.getMachines()
    })
  }
  deleteTask(element:any){
    this.Service.postFun('deleteTask',{id:element}).subscribe(data => {
      console.log(data);
      this.getTasks()
    })
  }
  getMachines(){
    this.machineIds=[]
    this.Service.getFun('getMachine').subscribe(data => {
      this.machines=data;
      for (let i = 0; i < this.machines.length; i++) {
        this.machineIds.push(this.machines[i].id.toString())
      }
      console.log(this.machineIds);
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
        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
        return days+"D"+" : "+hours+"H"+" : "+minutes+"M"+" : "+seconds+"S";
    } catch (error:any) {
      console.log(error.message);
    }
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
    console.log(event.container);
    let taskIDs=[];
    let taskIDsBefore=[];
    for (let i = 0; i < event.container.data.length; i++) {
      taskIDs.push(event.container.data[i]['id'])
    }
    for (let i = 0; i < event.previousContainer.data.length; i++) {
      taskIDsBefore.push(event.previousContainer.data[i]['id'])
    }
    console.log(taskIDs,taskIDsBefore);
    this.updateTask(event.container.id,taskIDs,event.previousContainer.id,taskIDsBefore)
    this.timeCalculation(event.container.data[0]['id'])
  }
  timeCalculation(id:any){
    
  }
}
