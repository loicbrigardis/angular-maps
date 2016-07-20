import { Component } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES, NoOpMapsAPILoader, MapsAPILoader, MouseEvent } from 'angular2-google-maps/core';

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
  
  constructor () {

  }

  clickedMarker (marker:Marker, index:number) {
      console.log('marker' + marker + 'index' + index);
      
  }

  mapClicked($event:MouseEvent) {
      var newMarker = {
          name:"untitled",
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          draggable: false
      }
      this.markers.push(newMarker);
  }

  markerDragEnd (marker: any, $event: MouseEvent) {
      console.log($event);
      var updMarker = {
          name: marker.name,
          lat: parseFloat(marker.lat),
          lng: parseFloat(marker.lng),
          draggable: false
      }

      var newLat = $event.coords.lat;
      var newLng = $event.coords.lng;
  }

}

interface Marker {
    name?: string;
    lat: number;
    lng: number;
    draggable: boolean;

}
