import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NodeService {

  baseURL="http://localhost:5000/"; 

  constructor(private http:HttpClient) {}
    getFun(endPoint:any){
      return this.http.get<any>(this.baseURL+endPoint)
    }
    postFun(endPoint:any,body:any){
      return this.http.post<any>(this.baseURL+endPoint,body)
    }
   
}
