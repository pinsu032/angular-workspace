import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IshopapiService } from '../../service/ishopapi.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() public electronicsCount:number = 0;
  @Input() public jewellaryCount : number = 0;
  @Input() public mensCount : number = 0;
  @Input() public womensCount : number = 0;

  @Output() public FilterClicked:EventEmitter<string> = new EventEmitter<string>();
  @Output() public FilterChange:EventEmitter<string> = new EventEmitter<string>();

  constructor(private service : IshopapiService) { }

  public categories:any=[];

  ngOnInit(): void {
    this.loadCategory();
  }

  public buttonClicked(e:any){
    this.FilterClicked.emit(e.target.name);
  }

  public filterChanged(e:any){
    this.FilterChange.emit(e.target.value);
  }

  public loadCategory(){
    this.service.loadCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
    
  }

}