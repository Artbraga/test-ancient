import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-box',
  templateUrl: './detail-box.component.html',
  styleUrls: ['./detail-box.component.scss']
})
export class DetailBoxComponent implements OnInit {
  @Input() box: any;
  constructor() { }

  ngOnInit(): void {
  }
}
