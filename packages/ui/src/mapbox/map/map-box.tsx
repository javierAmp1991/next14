//@ts-ignore
import style from "./style.module.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {useEffect, useRef, useState} from "react";

export const token: string ="pk.eyJ1IjoiY2RyZmVuaXgiLCJhIjoiY2xodG4zMWFsMng5dDNmcWwxdnkzeXoxeSJ9.RPIXw5_96Ux3jkr_g3nc2A";
export const mapStyle: string = "mapbox://styles/mapbox/streets-v12";
export const staticStyle: string = "streets-v12";

export interface IMapbox {
  IsActiveGeocoder: boolean;
  IsActiveMarker: boolean;
  IsActiveGeolocate: boolean;
  IsActiveClickMap: boolean;
  IsActivePolygon?: boolean;
  Polygons?: any[];
  ViewPort?: MapViewPortProps;
  GetData?: Function;
  GetPolygon?: Function;
  ReRender: boolean;
  ActiveDeletePolygon?: boolean;
  ActiveInitialDraw?: boolean;
  Address?: string
}

export interface MapViewPortProps {
  Lng: number;
  Lat: number;
  Zoom?: number;
}

const defaultViewPort: MapViewPortProps = {
    Lng: -71.6133994,
    Lat: -33.0519634,
    Zoom: 15,
};

mapboxgl.accessToken = token;

export const Mapbox = ({props}: { props: IMapbox }) => {
    const initialViewPort: MapViewPortProps = props.ViewPort ? props.ViewPort : defaultViewPort;
    const mapRef = useRef<HTMLDivElement>(null);
    const [viewPort, setViewPort] = useState(initialViewPort);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current!,
            style: mapStyle,
            center: [viewPort.Lng, viewPort.Lat],
            zoom: viewPort.Zoom,
        });
        const marker = new mapboxgl.Marker({
            color: "#0674e3",
            draggable: true,
        }).setLngLat([viewPort.Lng, viewPort.Lat]).addTo(map);

        if (props.Polygons && props.ViewPort) {
             map.on('styledata', () => {
                 if (props.Polygons) {
                     map.addLayer({
                         id: 'polygon-layer',
                         type: 'fill',
                         source: {
                             type: 'geojson',
                             data: {
                                 type: 'Feature',
                                 geometry: {
                                     type: 'Polygon',
                                     coordinates: [props.Polygons]
                                 },
                                 properties: {

                                 }
                             }
                         },
                         paint: {
                             'fill-color': '#2e8dec',
                             'fill-opacity': 0.5,
                         }
                     });
                     map.addLayer({
                         id: 'polygon-line',
                         type: 'line',
                         source: {
                             type: 'geojson',
                             data: {
                                 type: 'Feature',
                                 geometry: {
                                     type: 'Polygon',
                                     coordinates: [props.Polygons]
                                 },
                                 properties: {
                                 }
                             }
                         },
                         paint: {
                             'line-color': '#0674e3',
                             'line-width': 1
                         }
                     });
                 }
             });
         }

      if (props.IsActiveGeocoder) {
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false,
                placeholder: "Buscar dirección",
                minLength: 4
            });
            map.addControl(geocoder);
            geocoder.on("result", (e) => {
                const [lng, lat] = e.result.geometry.coordinates;
                handleNewPosition(lng, lat)
            });
        }

        if (props.IsActiveGeolocate) {
            const geolocateControl = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showAccuracyCircle: false,
            });
            map.addControl(geolocateControl);
            geolocateControl.on("geolocate", (e) => {
                // @ts-ignore
                const {longitude, latitude} = e.coords;
                handleNewPosition(longitude, latitude)
            });
        }

        if (props.IsActiveMarker) {
            marker.on("dragend", () => {
                const {lng, lat} = marker.getLngLat();
                handleNewPosition(lng, lat)
            });
        }

        if (props.IsActiveClickMap) {
            map.on("click", (e) => {
                const {lng, lat} = e.lngLat;
                handleNewPosition(lng, lat)
            });
        }

        const fullscreenControl = new mapboxgl.FullscreenControl();
        map.addControl(fullscreenControl);

        const navControl = new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true
        });
        map.addControl(navControl);

        function handleNewPosition(lng: number, lat: number) {
            setViewPort({...viewPort, Lng: lng, Lat: lat});
            marker.setLngLat([lng, lat]);
            map.flyTo({
                center: [lng, lat],
                essential: true,
                animate: true,
                speed: 0.5,
            });

            getDataFromMapBox(lng, lat)
                .then(data => {
                    if (props.GetData !== undefined) props.GetData(data, lng, lat);
                })
                .catch(error => {
                    console.error(error);
                });
        }

        return () => {
            map.remove();
            marker.remove();
        };
    }, [props.ReRender])

    return <div className={style.main} ref={mapRef}/>

    async function getDataFromMapBox(lng: number, lat: number) {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`);
            return await response.json();
        } catch (error) {
            throw new Error('Error al obtener los datos de Mapbox');
        }
    }

    function getPolygonCenter(coordinates: any[]) {
        const numVertices = coordinates.length;
        let sumLat = 0;
        let sumLng = 0;

        for (const vertex of coordinates) {
            sumLat += vertex[1];
            sumLng += vertex[0];
        }

        const centerLat = sumLat / numVertices;
        const centerLng = sumLng / numVertices;

        return [centerLng, centerLat];
    }
}