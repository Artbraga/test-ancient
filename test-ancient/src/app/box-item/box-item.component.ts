import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss']
})
export class BoxItemComponent implements OnInit {
  @Input() box: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.box);
  }

}
