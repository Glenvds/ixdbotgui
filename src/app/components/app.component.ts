import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IMusicData } from "../models/queue-info";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ixbotgui';
    info: IMusicData[];

    constructor(private readonly apiService: ApiService) {
        this.loadData();
    }

    private loadData() {
        this.apiService.listenToInfoUpdate().subscribe(data => {
            this.info = data?.musicData;
        });
    }
}

