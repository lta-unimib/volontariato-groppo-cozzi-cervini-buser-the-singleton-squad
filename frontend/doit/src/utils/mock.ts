export const mockAddresses = [
    {
        placePrediction: {
            place:
                "places/Eh01dGggQXZlbnVlLCBWaWEsIExvY2FubywgTGF6aW8sIExvbWJhcmRpYQ==",
            placeId:
                "Eh01dGggQXZlbnVlLCBWaWEsIExvY2FubywgTGF6aW8sIExvbWJhcmRpYQ==",
            text: {
                text: "Piazza del Duomo, Milano, Lombardia, Italia",
                matches: [{ endOffset: 1 }],
            },
            structuredFormat: {
                mainText: { text: "Piazza del Duomo", matches: [{ endOffset: 1 }] },
                secondaryText: { text: "Milano, Lombardia, Italia" },
            },
            types: ["route", "geocode"],
        },
    },
    {
        placePrediction: {
            place:
                "places/EiE1dGggQXZlbnVlIFNvdXRoLCBHbGFuYWRvLCBMb21iYXJkLCBJdGFsaWE=",
            placeId:
                "EiE1dGggQXZlbnVlIFNvdXRoLCBHbGFuYWRvLCBMb21iYXJkLCBJdGFsaWE=",
            text: {
                text: "Viale Monza, Milano, Lombardia, Italia",
                matches: [{ endOffset: 1 }],
            },
            structuredFormat: {
                mainText: { text: "Viale Monza", matches: [{ endOffset: 1 }] },
                secondaryText: { text: "Milano, Lombardia, Italia" },
            },
            types: ["route", "geocode"],
        },
    },
    {
        placePrediction: {
            place: "places/ChIJb-d2-RCGBUAR3DzpSbrkxg4",
            placeId: "ChIJb-d2-RCGBUAR3DzpSbrkxg4",
            text: {
                text: "Corso Vittorio Emanuele II, Milano, Lombardia, Italia",
                matches: [{ endOffset: 1 }],
            },
            structuredFormat: {
                mainText: { text: "Corso Vittorio Emanuele II", matches: [{ endOffset: 1 }] },
                secondaryText: { text: "Milano, Lombardia, Italia" },
            },
            types: ["geocode", "street_address"],
        },
    },
    {
        placePrediction: {
            place: "places/ChIJzZ7nRdk_G0AR-V_x7ayBGJk",
            placeId: "ChIJzZ7nRdk_G0AR-V_x7ayBGJk",
            text: {
                text: "Piazza Cadorna, Milano, Lombardia, Italia",
                matches: [{ endOffset: 1 }],
            },
            structuredFormat: {
                mainText: { text: "Piazza Cadorna", matches: [{ endOffset: 1 }] },
                secondaryText: { text: "Milano, Lombardia, Italia" },
            },
            types: ["geocode", "street_address"],
        },
    },
    {
        placePrediction: {
            place: "places/ChIJ6d3Ftrw9l0ARhtpz1QeV7ik",
            placeId: "ChIJ6d3Ftrw9l0ARhtpz1QeV7ik",
            text: {
                text: "Viale della Liberazione, Milano, Lombardia, Italia",
                matches: [{ endOffset: 1 }],
            },
            structuredFormat: {
                mainText: { text: "Viale della Liberazione", matches: [{ endOffset: 1 }] },
                secondaryText: { text: "Milano, Lombardia, Italia" },
            },
            types: ["geocode", "street_address"],
        },
    },
];

export const mockPlaces = [
    {
        placeId:
            "places/Eh01dGggQXZlbnVlLCBWaWEsIExvY2FubywgTGF6aW8sIExvbWJhcmRpdA==",
        adrAddress: `<span class="street-address">Piazza del Duomo</span>, <span class="locality">Milano</span>, <span class="region">Lombardia</span>, <span class="country-name">Italia</span>`,
        address: {
            address1: "Piazza del Duomo",
            address2: "",
            city: "Milano",
            country: "Italia",
            formattedAddress: "Piazza del Duomo, Milano, Lombardia, Italia",
            lat: 45.4641,
            lng: 9.1919,
            postalCode: "20123",
            region: "Lombardia",
        },
    },
    {
        placeId:
            "places/EiE1dGggQXZlbnVlIFNvdXRoLCBHbGFuYWRvLCBMb21iYXJkLCBJdGFsaWE=",
        adrAddress: `<span class="street-address">Viale Monza</span>, <span class="locality">Milano</span>, <span class="region">Lombardia</span>, <span class="country-name">Italia</span>`,
        address: {
            address1: "Viale Monza",
            address2: "",
            city: "Milano",
            country: "Italia",
            formattedAddress: "Viale Monza, Milano, Lombardia, Italia",
            lat: 45.4972,
            lng: 9.2364,
            postalCode: "20125",
            region: "Lombardia",
        },
    },
    {
        placeId: "places/ChIJb-d2-RCGBUAR3DzpSbrkxg4",
        adrAddress: `<span class="street-address">Corso Vittorio Emanuele II</span>, <span class="locality">Milano</span>, <span class="region">Lombardia</span>, <span class="country-name">Italia</span>`,
        address: {
            address1: "Corso Vittorio Emanuele II",
            address2: "",
            city: "Milano",
            country: "Italia",
            formattedAddress: "Corso Vittorio Emanuele II, Milano, Lombardia, Italia",
            lat: 45.4642,
            lng: 9.1917,
            postalCode: "20122",
            region: "Lombardia",
        },
    },
    {
        placeId: "places/ChIJzZ7nRdk_G0AR-V_x7ayBGJk",
        adrAddress: `<span class="street-address">Piazza Cadorna</span>, <span class="locality">Milano</span>, <span class="region">Lombardia</span>, <span class="country-name">Italia</span>`,
        address: {
            address1: "Piazza Cadorna",
            address2: "",
            city: "Milano",
            country: "Italia",
            formattedAddress: "Piazza Cadorna, Milano, Lombardia, Italia",
            lat: 45.4709,
            lng: 9.1865,
            postalCode: "20123",
            region: "Lombardia",
        },
    },
    {
        placeId: "places/ChIJ6d3Ftrw9l0ARhtpz1QeV7ik",
        adrAddress: `<span class="street-address">Viale della Liberazione</span>, <span class="locality">Milano</span>, <span class="region">Lombardia</span>, <span class="country-name">Italia</span>`,
        address: {
            address1: "Viale della Liberazione",
            address2: "",
            city: "Milano",
            country: "Italia",
            formattedAddress: "Viale della Liberazione, Milano, Lombardia, Italia",
            lat: 45.4850,
            lng: 9.1912,
            postalCode: "20124",
            region: "Lombardia",
        },
    },
];
