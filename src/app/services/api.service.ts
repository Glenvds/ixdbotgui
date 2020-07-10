import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, interval } from "rxjs";
import { IMusicData, IBotState } from "../models/queue-info";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private readonly infoSubject = new BehaviorSubject<IBotState>(null);
    private currentState: IBotState;


    constructor(
        private readonly httpClient: HttpClient
    ) {
        interval(3000).subscribe(async () => {

            const info = await this.getInfo$().toPromise();
            if (!this.currentState && !info) return;
            if (this.currentState && info.timestamp === this.currentState.timestamp) return;
            this.infoSubject.next(info);
            this.currentState = info;

        });
    }

    getInfo$(): Observable<IBotState> {
        return this.httpClient.get<IBotState>("http://localhost:8080/");
    }

    listenToInfoUpdate(): Observable<IBotState> {
        return this.infoSubject.asObservable();
    }


}
