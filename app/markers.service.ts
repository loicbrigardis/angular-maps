import { Injectable } from '@angular/core';
import { Init } from './init-markers';


@Injectable()
export class MarkersService extends Init {


    constructor() {
        super();
        this.load();
    }

    getMarkers() {
        var markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    }

    addMarkers(marker: any) {
        var markers = JSON.parse(localStorage.getItem('markers'));
        markers.push(marker);

        localStorage.setItem('markers', JSON.stringify(markers));

    }

    updateMarker(marker: any, newLat: number, newLng: number) {
        var markers = JSON.parse(localStorage.getItem('markers'));

        for (let i = 0; i < markers.length; i++) {
            if (marker.lat == markers[i].lat && marker.lng == markers[i].lng) {
                markers[i].lat = newLat;
                markers[i].lng = newLng;
            }
        }
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    deleteMarker(markerId: number) {
        var markers = JSON.parse(localStorage.getItem('markers'));
        markers.splice(markerId, 1);

        localStorage.setItem('markers', JSON.stringify(markers));
    }

}