"use client"
import L from "leaflet";

export default async function leaflet(Coordinates) {
    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }
    const { lat, lng } = Coordinates;
    if (lat && lng) {
        const key = "gSuDqf4NmysTCNMxY0xv";

        var map = L.map("map", {
            scrollWheelZoom: false,
            dragging: true,
        }).setView([lat, lng], 13);

        var streetLayer = L.tileLayer(
            `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
            {
                tileSize: 512,
                zoomOffset: -1,
                minZoom: 3,
                maxZoom: 18,
                attribution:
                    '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
                crossOrigin: true,
            }
        );

        var satelliteLayer = L.tileLayer(
            `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${key}`,
            {
                tileSize: 512,
                zoomOffset: -1,
                minZoom: 3,
                maxZoom: 18,
                attribution:
                    '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
                crossOrigin: true,
            }
        );

        var baseLayers = {
            "Street View": streetLayer,
            "Satellite View": satelliteLayer,
        };

        streetLayer.addTo(map);

        L.control.layers(baseLayers).addTo(map);

        var Bigcircle = L.circle([lat, lng], {
            radius: 300,
        }).addTo(map);

        var Smcircle = L.circle([lat, lng], {
            radius: 3,
            color: "red",
        }).addTo(map);

        var feature_grp = L.featureGroup([Bigcircle, Smcircle]).addTo(map);

        map.fitBounds(feature_grp.getBounds());

        Smcircle.bindPopup("<b>This is the location</b>").openPopup();
    }
}
