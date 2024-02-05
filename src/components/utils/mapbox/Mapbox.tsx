
// todo: if mapbox is used, then enable this commented css import
// import 'mapbox-gl/dist/mapbox-gl.css';
import './Mapbox.scss';
import { useState } from 'preact/hooks';
import Map, {
    Marker,
    NavigationControl,
    Popup,
    GeolocateControl,
    FullscreenControl,
} from 'react-map-gl';
import useIubendaPreferences from '@utils/iubenda/useIubendaPreferences';
import Button from '@atoms/Button';
import RichText from '@atoms/rich-text/RichText.tsx';

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
            link: { url, label, classes }
        };
    };
}
export default function Mapbox({ marker, accessToken }: Props) {
    const iubendaPreferences = useIubendaPreferences();
    const [markerClicked, setMarkerClicked] = useState(false);

    const onMarkerClick = () => {
        setMarkerClicked(!markerClicked);
    };
    // if (!iubendaPreferences || !iubendaPreferences[3])
    //     return (
    //         <div class="flex w-full h-full items-center justify-center bg-gray-100 text-center"></div>
    //     );
    return (
        <Map
            mapboxAccessToken={accessToken}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            initialViewState={{
                latitude: marker.latitude,
                longitude: marker.longitude,
                zoom: 13,
            }}
            scrollZoom={false}
            width="100%"
            height="100%"
            onLoad={() => {
                document.dispatchEvent(new CustomEvent('cursor-update'));
            }}
        >
            <NavigationControl position="bottom-right" />

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
                    offset={[0, -(marker.size[1] + 5)]}
                    onClose={() => setMarkerClicked(false)}
                    onOpen={() => document.dispatchEvent(new CustomEvent('cursor-update'))}
                >
                    <div className="flex flex-col items-center p-4 gap-1 lg:gap-2 text-center ">
                        <h4 className="text-base text-center font-bold text-uppercase">
                            {marker.content.title}
                        </h4>
                        <RichText text={marker.content.description} />
                        {
                            marker.content.link && marker.content.link.url &&
                            <Button linkStyle="link" link={marker.content.link} class="outline-none" />
                        }
                    </div>
                </Popup>
            )}
        </Map>
    );
}
