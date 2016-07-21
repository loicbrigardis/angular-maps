export class Init {
    load() {
        if (localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
            console.log('No markers found...');

            var markers = [
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
            ];

            localStorage.setItem('markers', JSON.stringify(markers))
            return;
        } else {
            console.log('Loading...');
            //localStorage.getItem('markers');
            
        }
    }
}