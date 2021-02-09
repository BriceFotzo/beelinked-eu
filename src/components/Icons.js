import L from 'leaflet';
import bee from '../assets/images/logo.yellow.svg';

const iconPerson = new L.Icon({
    iconUrl: bee,
    iconRetinaUrl: bee,
    iconAnchor: [5, 55],
    // popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 60),
    className: 'leaflet-div-icon'
});

export { iconPerson };

