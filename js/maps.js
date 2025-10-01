function initMap() {
  var mapOptions = {
    center: { lat:10.106803798171317, lng:-84.2404469484573},
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(10.106803798171317, -84.2404469484573),
    map: map
  });

  function actualizarPosicion(posicion) {
    var latitud = posicion.coords.latitude;
    var longitud = posicion.coords.longitude;
    var nuevaPosicion = new google.maps.LatLng(latitud, longitud);
    marker.setPosition(nuevaPosicion);
    map.setCenter(nuevaPosicion);
  }

  navigator.geolocation.watchPosition(actualizarPosicion, null, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
}

// initMap carga la API de Google Maps.
function initMap() {

    // Ubicaciones de las Sucursales
    const sucursales = [
        {
            nombre: "LaVentanita Express de Denis - San Juán",
            mapId: "map-sanjuan",
            coords: { lat: 10.10668684397168, lng: -84.24050380243314 },
            zoom: 15
        },
        {
            nombre: "La Ventanita Express de Denis - Fraijanes",
            mapId: "map-fraijanes",
            coords: { lat: 10.142961710538406, lng: -84.19457106554171 },
            zoom: 15
        },
        {
            nombre: "La Ventanita Express de Denis - San Isidro",
            mapId: "map-sanisidro",
            coords: { lat: 10.08004104951632, lng: -84.19533211840114 },
            zoom: 15
        },
        {
            nombre: "Denis House - Coffee & Restarant",
            mapId: "map-restaurant",
            coords: { lat: 10.142961710538406, lng: -84.19457106554171 },
            zoom: 15
        },
    ];

    // Crear el mapa y el marcador para cada una
    sucursales.forEach(sucursal => {
        // Verificar si el contenedor existe. Si no existe, salta a la siguiente sucursal
        const mapElement = document.getElementById(sucursal.mapId);
        if (!mapElement) return; 

        // Opciones del mapa
        const mapOptions = {
            center: sucursal.coords, 
            zoom: sucursal.zoom,
            disableDefaultUI: true, // Opcional: Oculta controles como zoom, etc.
        };

        // Inicializar el mapa
        const map = new google.maps.Map(mapElement, mapOptions);

        // Crear el marcador
        const marker = new google.maps.Marker({
            position: sucursal.coords,
            map: map,
            title: sucursal.nombre
        });

        // Ventana de información (InfoWindow) al hacer click
        const infoWindowContent = `
            <div>
                <strong>${sucursal.nombre}</strong>
            </div>
        `;
        
        const infowindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        });

        // Evento click para mostrar la InfoWindow
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
            });
        });
    });
}