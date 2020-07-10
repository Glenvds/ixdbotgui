import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, interval, of } from "rxjs";
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
        interval(6000).subscribe(async () => {

            const info = await this.getInfo$().toPromise();
            if (!this.currentState && !info) return;
            if (this.currentState && info.timestamp === this.currentState.timestamp) return;
            this.infoSubject.next(info);
            this.currentState = info;

        });
    }

    getInfo$(): Observable<IBotState> {
        /*const mock : IBotState = {timestamp: new Date(), musicData:[
            {title: 'Kendrick Lamar - Swimming Pools (Drank)', url:'www.whatever.com', requester:{displayAvatarURL:'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', username: 'Koby'}},
            {title: 'Pharoahe Monch - Simon Says [High Quality]', url:'www.whatever', requester:{displayAvatarURL:'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', username: 'Smolders'}},
            {title: 'ScHoolboy Q - Floating ft. 21 Savage', url:'www.whatever', requester:{displayAvatarURL:'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', username: 'Gay Jerre'}},
            {title: 'NCT 127 엔시티 127 Simon Says MV', url:'www.whatever', requester:{displayAvatarURL:'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', username: 'Karla'}},
        ] } */
        return this.httpClient.get<IBotState>("http://192.168.0.100:8080/");

        //return of(mock)
    }

    listenToInfoUpdate(): Observable<IBotState> {
        return this.infoSubject.asObservable();
    }


}
