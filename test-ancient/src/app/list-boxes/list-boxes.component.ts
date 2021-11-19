import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-list-boxes',
  templateUrl: './list-boxes.component.html',
  styleUrls: ['./list-boxes.component.scss']
})
export class ListBoxesComponent implements OnInit {
  boxes = [];
  constructor(private service: GraphqlService) {

  }

  ngOnInit(): void {
    this.service.getBoxes().subscribe(data => {
      this.boxes = data;
    })
  }

}
