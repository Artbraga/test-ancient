import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GraphqlService } from '../services/graphql.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss']
})
export class BoxItemComponent implements OnInit {
  @Input() box: any;
  constructor(private modalService: NgbModal,
    private service: GraphqlService,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }

  openBox(content: any) {
    this.modalService.open(content).result.then((result) => {
    });
  }

  buyBox(modal: any) {
    this.service.openBox({boxId: this.box.node.id, amount: 1}).subscribe((x: any) => {
      this.toastService.show(`You won the item ${x.data.openBox.boxOpenings[0].itemVariant.name}`, { classname: 'bg-success text-light', delay: 5000 });
      modal.close();
    }, (err) => {
      this.toastService.show(err.message, { classname: 'bg-danger text-light', delay: 5000 });
    }, () => {
      // this.service.updateUser().subscribe();
    });
  }
}
