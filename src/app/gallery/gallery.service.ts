import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class CardsList {

    constructor(private httpClient: HttpClient) { }

    public getCardDetails() {
        return this.httpClient
            .get('assets/privateGallery.json');
    }

}