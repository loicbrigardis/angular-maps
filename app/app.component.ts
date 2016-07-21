import { Component } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES, NoOpMapsAPILoader, MapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common'
import { MarkersService } from './markers.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    directives: [GOOGLE_MAPS_DIRECTIVES],
    providers: [MarkersService],
    templateUrl: 'app.component.html',
    styles: [`
        .sebm-google-map-container {
            height:350px;
            width:100%;
            padding:10px 0 0 0;
        }
    `]
})
export class AppComponent {
    title: string = 'Google map project';
    zoom: number = 10;
    lat: number = 51.678418;
    lng: number = 7.809007;
    markerForm: ControlGroup;
    isDraggable: boolean;
    markers: Marker[];



    constructor(private _markersService: MarkersService) {
        let fb = new FormBuilder();

        this.markerForm = fb.group({
            name: ['', Validators.required],
            lat: ['', Validators.required],
            lng: ['', Validators.required],
            draggable: [false]
        });

        this.markers = this._markersService.getMarkers();
    }



    mapClicked($event: MouseEvent) {
        let newMarker = {
            name: "untitled",
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false
        }
        this.markers.push(newMarker);
        this._markersService.addMarkers(newMarker);
    }

    markerDragEnd(marker: any, $event: MouseEvent) {
        let updMarker = {
            name: marker.name,
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.lng),
            draggable: false
        }

        let newLat = $event.coords.lat;
        let newLng = $event.coords.lng;

        this._markersService.updateMarker(updMarker, newLat, newLng);
    }

    addMarker(marker: any) {

        if (this.markerForm.valid) {
            if (marker.draggable == 'yes') {
                this.isDraggable = true
            }
            else {
                this.isDraggable = false
            }

            let newMarker = {
                name: marker.name,
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
                draggable: this.isDraggable
            }

            this.markers.push(newMarker);
            this._markersService.addMarkers(newMarker);

        }
        else {
            alert('Please fill all field')
        }
    }

    removeMarker(marker: Marker) {
        for (let i = 0; i < this.markers.length; i++) {
            if (marker == this.markers[i]) {
                this.markers.splice(i, 1);
                this._markersService.deleteMarker(i);
            }
        }
        
    }
}

interface Marker {
    name?: string;
    lat: number;
    lng: number;
    draggable: boolean;

}
