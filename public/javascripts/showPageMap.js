
mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
        center: campground.geometry.coordinates, // starting position [lng, lat]
        zoom: 8 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl()); //controls- zoom in, zoom out,etc

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3>`
        )
    )
    .addTo(map)