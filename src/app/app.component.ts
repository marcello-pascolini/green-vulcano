import { Component } from '@angular/core';
import { HttpService } from 'src/services/httpService';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

    modelData: any  
    pages: number[] = [1,2,3]

    loaded:boolean = true
    error: boolean = false
    filteredData: any
    modelForm = new FormGroup(
        {
            model: new FormControl('')
        }
    )

    constructor(private http:HttpService){}


    ngOnInit(): void{
        this.http.getData().subscribe({
            next: (data) => {
                this.modelData = data
                console.log();
            }
        });
    }

    searchModel(){
       this.filteredData = this.modelData.filter((item: any ) => item.model.match(this.modelForm.value.model));
       if(this.filteredData.length === 0) {
        this.loaded = false
        this.error = true
        }   else {
        this.error = false
        this.loaded = false
       }
       this.modelForm.reset() 
    }
  
    csvDownload(){
        var options = { 
            fieldSeparator: ';',
            quoteStrings: '',
            decimalseparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Model Report',
            useBom: true,
            noDownload: false,
            headers: Object.keys(this.modelData[0])
          };
          new ngxCsv(this.modelData, "Report", options)
    }
  

    detectBattery(level:number) : any{
        if(level <= 30) return 'low'
        if(level > 30 && level <= 60) return 'medium'
        if(level > 60 )return 'good'
    }

    detectFuel(fuel:number) :any{
        if(fuel <= 10 ) return 'low'
        if(fuel > 30) return 'good'
        else return 'medium'
    }

    reverseTable(){
        return this.modelData.sort((a:any,b :any) => (a.id < b.id)).reverse();
    }

}
