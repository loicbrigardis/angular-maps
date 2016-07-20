import { bootstrap }    from '@angular/platform-browser-dynamic';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  GOOGLE_MAPS_PROVIDERS
]);

