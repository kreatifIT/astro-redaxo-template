import 'mapbox-gl/dist/mapbox-gl.css';
import './Mapbox.scss';
import { useState } from 'preact/hooks';
import Map, {
    Marker,
    NavigationControl,
    Popup,
    GeolocateControl,
} from 'react-map-gl';
import useIubendaPreferences from '@utils/iubenda/useIubendaPreferences';

interface Props {
    accessToken: string;
    marker: {
        latitude: number;
        longitude: number;
        image: string;
        size: [number, number];
        content: {
            title: string;
            description: string;
        };
    };
}
export default function Mapbox({ marker, accessToken }: Props) {
    const iubendaPreferences = useIubendaPreferences();
    const [markerClicked, setMarkerClicked] = useState(false);

    const onMarkerClick = () => {
        setMarkerClicked(!markerClicked);
    };
    if (!iubendaPreferences || !iubendaPreferences[3])
        return (
            <div class="flex w-full h-full items-center justify-center bg-gray-100 text-center"></div>
        );
    return (
        <Map
            mapboxAccessToken={accessToken}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            initialViewState={{
                latitude: marker.latitude,
                longitude: marker.longitude,
                zoom: 14,
            }}
            scrollZoom={false}
            width="100%"
            height="100%"
        >
            <NavigationControl />
            <GeolocateControl />

            <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                anchor="center"
                offset={[0, -marker.size[1] / 2]}
                onClick={onMarkerClick}
            >
                <img
                    src={marker.image}
                    class="cursor-pointer"
                    loading="lazy"
                    width={marker.size[0]}
                    height={marker.size[1]}
                />
            </Marker>
            {markerClicked && (
                <Popup
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    closeButton={true}
                    closeOnClick={true}
                    closeOnMove={true}
                    anchor="bottom"
                    offset={[0, -(marker.size[1])]}
                    onClose={() => setMarkerClicked(false)}
                >
                    <div className="flex flex-col items-center p-4 text-center">
                        <h4 className="mb-1 text-center text-sm font-bold">
                            {marker.content.title}
                        </h4>
                        <p>{marker.content.description}</p>
                    </div>
                </Popup>
            )}
        </Map>
    );
}
