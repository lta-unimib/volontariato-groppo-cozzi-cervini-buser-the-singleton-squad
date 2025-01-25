export const addSingleMarkers = ({
                                     locations,
                                     map,
                                 }: {
    locations: google.maps.LatLngLiteral[];
    map: google.maps.Map;
}) => {
    locations.forEach((location) => {
        new google.maps.Marker({
            position: location,
            map,
        });
    });
};