import { Component } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES, NoOpMapsAPILoader, MapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    directives: [GOOGLE_MAPS_DIRECTIVES],
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
    isDraggable:boolean;

    markers: Marker[] = [
        {
            name: 'Campany',
            lat: 51.678418,
            lng: 7.809007,
            draggable: true
        },
        {
            name: 'Campany 2',
            lat: 52.678418,
            lng: 7.809007,
            draggable: true
        }
    ]

    constructor() {
        let fb = new FormBuilder();

        this.markerForm = fb.group({
            name: ['', Validators.required],
            lat: ['', Validators.required],
            lng: ['', Validators.required],
            draggable: [false]
        })
    }

    clickedMarker(marker: Marker, index: number) {
        console.log('marker' + marker + 'index' + index);

    }

    mapClicked($event: MouseEvent) {
        let newMarker = {
            name: "untitled",
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false
        }
        this.markers.push(newMarker);
    }

    markerDragEnd(marker: any, $event: MouseEvent) {
        console.log($event);
        let updMarker = {
            name: marker.name,
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.lng),
            draggable: false
        }

        let newLat = $event.coords.lat;
        let newLng = $event.coords.lng;
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
            console.log(this.isDraggable);
            
        }
        else {
            alert('Please fill all field')
        }
    }
}

interface Marker {
    name?: string;
    lat: number;
    lng: number;
    draggable: boolean;

}
