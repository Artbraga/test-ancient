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
  quantity = 1;
  constructor(private modalService: NgbModal,
    private service: GraphqlService,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }

  openBox(content: any) {
    this.modalService.open(content).result.then();
  }

  buyBox(modal: any) {
    if (this.quantity <= 0 || this.quantity > 10) {
      this.toastService.show('Quantity showl be a number between 1 and 10.', { classname: 'bg-danger text-light', delay: 5000 });
      return;
    }
    this.service.openBox({boxId: this.box.node.id, amount: this.quantity}).subscribe((x: any) => {
      x.data.openBox.boxOpenings.forEach((item: any) => {
        this.toastService.show(`You won the item ${item.itemVariant.name}`, { classname: 'bg-success text-light', delay: 5000 });
      });
      modal.close();
    }, (err) => {
      this.toastService.show(err.message, { classname: 'bg-danger text-light', delay: 5000 });
    });
  }
}
