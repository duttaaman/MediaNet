import { Component, OnInit } from '@angular/core';
import { CardsList } from './gallery.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private cardsList: CardsList, private modalService: NgbModal) { }
  cards: any;

  ngOnInit() {
    this.cardsList.getCardDetails().subscribe(data => {
      this.cards = data;
    })
  }

  open(card) {

    const modalRef = this.modalService.open(ModalPopupComponent, { size: 'lg' });
    modalRef.componentInstance.card = card;
  }

}
