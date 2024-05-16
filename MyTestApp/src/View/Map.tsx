import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Dimensions,
    PermissionsAndroid,
    TextInput,
    TouchableOpacity,
    Text
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('screen');

const Map = ({ navigation }: { navigation: any }) => {
    const [selectBeacons, setSelectBeacons] = useState(''); ('');
    const [userLocation, setUserLocation] = useState<object | null>(null);
    const [nearestEntry, setNearestEntry] = useState<object | null>(null);
    const [nearestStairsOrElevator, setNearestStairsOrElevator] = useState<object | null>(null);
    const [destination, setDestination] = useState<object | null>(null);
    const [isStart, setIsStart] = useState(false)
    const [destiny, setDestiny] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    const region = {
        latitude: 41.17844,
        longitude: -8.60788,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }

    const locations = ["East Car Entrance", "Alternative Entrance - E", "Alternative Entrance - G", "Main Entrance", "West Car Entrance", "Main entrance - Block B", "Alternative entrance - Block B", "B404", "Main entrance - Block C", "Alternative entrance - Block C", "Main entrance - Block I", "Main entrance - Block J"]

    const entriesISEP = [{
        latitude: 41.17882943953348,
        longitude: -8.606200017093682,
        image: "https://paulorodrigues-isep.sirv.com/TASSI/Entrada_Estacionamente_Este_360.JPG",
        name: "East Car Entrance",
        description: "Car entrance for Isep students and teachers and for visitors (until 8:00 pm)"
    }, {
        latitude: 41.17845872325719,
        longitude: -8.60671239222479,
        image: "https://paulorodrigues-isep.sirv.com/TASSI/Entrada_E.png",
        name: "Alternative Entrance - E",
        description: "Entrance to the ISEP campus through building E, to the east of the campus. Closes at 8pm"
    }, {
        latitude: 41.177265447670074,
        longitude: -8.608728016664339,
        image: "https://paulorodrigues-isep.sirv.com/TASSI/Entrada_G.png",
        name: "Alternative Entrance - G",
        description: "Alternative entrance to the ISEP campus for those coming from the south of the campus"
    }, {
        latitude: 41.17810274173643,
        longitude: -8.609222148337787,
        image: "https://paulorodrigues-isep.sirv.com/TASSI/Entrada_H.png",
        name: "Main Entrance",
        description: "Main entrance to the ISEP campus through building H. This entrance has a small park and a reception that closes at 11:30 pm"
    }, {
        latitude: 41.17880187874693,
        longitude: -8.609259818377929,
        image: "https://paulorodrigues-isep.sirv.com/TASSI/Entrada_Carros_Oeste.png",
        name: "West Car Entrance",
        description: "Main driveway, located west of the ISEP campus, for students and faculty."
    }]

    const BlockB = {
        entries: [{
            latitude: 41.17793516079107,
            longitude: -8.607817171758688,
            name: "Main entrance - Block B",
            description: "Main entrance to Block B",
            image: "https://paulorodrigues-isep.sirv.com/TASSI/BlocoB_Entrada.jpg"
        }, {
            latitude: 41.17752190252769,
            longitude: -8.607872384067498,
            name: "Alternative entrance - Block B",
            description: "Alternative entrance to Block B. It is located between blocks G and B, under the point that connects them",
            image: "https://paulorodrigues-isep.sirv.com/TASSI/BlocoB_Entrada_Alternativa.jpg"
        }],
        classrooms: [{
            classroom: "B404",
            latitude: 41.17779859734326,
            longitude: -8.60778236945829,
            name: "B404",
            description: "Classroom B404, located on the 4th floor of block B. Classroom for multimedia classes",
            image: "https://paulorodrigues-isep.sirv.com/TASSI/B404.jpg"
        }],
        stairs: [{
            latitude: 41.177934862829,
            longitude: -8.607774502873458,
            name: "Main stairs - Block B",
            description: "Main staircase of Block B, located right after the main entrance to Block B"
        }, {
            latitude: 41.17747023177218,
            longitude: -8.607831537419225,
            name: "Alternative stairs - Block B",
            description: "Alternative staircase to Block B, located just after the alternative entrance to block B"
        }],
        elevator: [{
            latitude: 41.17794222593095,
            longitude: -8.607742689503528,
            name: "Elevator - Block B",
            image: "https://paulorodrigues-isep.sirv.com/TASSI/BlocoB_Elevador.jpg",
            description: "Block B elevator, located right at the main entrance to block B and next to the main stairs"
        }]
    }

    const BlockC = {
        entries: [{
            latitude: 41.17900255554174,
            longitude: -8.606729063123415,
            name: "Alternative entrance - Block C",
            description: ""
        }, {
            latitude: 41.17864523026521,
            longitude: -8.607208507984893,
            name: "Main entrance - Block C",
            description: ""
        }],
        stairs: [{
            latitude: 41.17896350725777,
            longitude: -8.606906762058527,
            name: "Stairs 1 - Block B",
            description: ""
        }, {
            latitude: 41.178726804575106,
            longitude: -8.607149501974398,
            name: "Stairs 2 - Block B",
            description: ""
        }],
        elevator: [{
            latitude: 41.17879241521212,
            longitude: -8.607072388465197,
            name: "Elevator - Block C",
            description: ""
        }]
    }

    const BlockE = {
        entries: [{
            latitude: 41.178598891226166,
            longitude: -8.606697640155447,
            name: "E-block entry Hall",
            description: "Entrance door to block E. Here you can find a security guard if you need information. Closes at 8pm",
            image: "https://paulorodrigues-isep.sirv.com/TASSI/Hall_BlocoE.JPG"
        }]
    }

    const BlockIJ = {
        entries: [{
            latitude: 41.17864776730567,
            longitude: -8.607487133679149,
            name: "Main entrance - Block J",
            description: ""
        }, {
            latitude: 41.17814968871318,
            longitude: -8.608192664870705,
            name: "Main entrance - Block I",
            description: ""
        }],
        stairs: [{
            latitude: 41.17809417147981,
            longitude: -8.608104151973187,
            name: "Main stairs - Block J",
            description: ""
        }, {
            latitude: 41.17835711588376,
            longitude: -8.607517550653029,
            name: "Main stairs - Block I",
            description: ""
        }, {
            latitude: 41.1785995664709,
            longitude: -8.60744983140121,
            name: "Alternative stairs - Block I and J",
            description: ""
        }],
        elevator: [{
            latitude: 41.17832956462679,
            longitude: -8.607516635528016,
            name: "Elevator - Block I",
            description: ""
        }, {
            latitude: 41.178090985842296,
            longitude: -8.608087534701143,
            name: "Elevator - Block I and J",
            description: "",
            image: "https://paulorodrigues-isep.sirv.com/TASSI/BlocoIJ_elevador_Piso0.jpg"
        }]
    }

    const viewBeaconInfo = (beacon: { latitude: number; longitude: number; image: string; name: string; }) => {
        navigation.navigate('BeaconInfo', { beaconInfo: beacon, onPressGoTo: goTo });
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                .then((granted: any) => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Permissão concedida");
                        getCurrentLocation();
                    } else {
                        console.log("Permissão negada");
                    }
                })
                .catch((error: any) => console.log(error));
        } else {
            getCurrentLocation();
        }
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position: { coords: { latitude: any; longitude: any; }; }) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            },
            (error: any) => console.log(error),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    }

    const findNearestEntry = ({ latitude, longitude }) => {
        const entries = [
            { latitude: 41.17793516079107, longitude: -8.607817171758688 },
            { latitude: 41.17752190252769, longitude: -8.607872384067498 }
        ];

        let minDistance = Number.MAX_VALUE;
        let nearestEntry = null;

        entries.forEach(entry => {
            const distance = calculateDistance(latitude, longitude, entry.latitude, entry.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                nearestEntry = entry;
            }
        });


        setNearestEntry(nearestEntry);
    }

    const findNearestStairsOrElevator = async ({ latitude, longitude }) => {
        const Accessibility = await AsyncStorage.getItem('accessibilityLvl')

        let minDistance = Number.MAX_VALUE;
        let nearestStairsOrElevator = null;

        if (Accessibility == 0) {
            const entries = [
                { latitude: 41.177934862829, longitude: -8.607774502873458 },
                { latitude: 41.17747023177218, longitude: -8.607831537419225 }
            ];

            entries.forEach(entry => {
                const distance = calculateDistance(latitude, longitude, entry.latitude, entry.longitude);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestStairsOrElevator = entry;
                }
            });
        } else {
            nearestStairsOrElevator = { latitude: 41.17794222593095, longitude: -8.607742689503528 }
        }

        setNearestStairsOrElevator(nearestStairsOrElevator);
    }

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Raio da Terra em km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distância em km
        return d;
    }

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180)
    }

    const getRouteCoordinates = () => {
        console.log(nearestStairsOrElevator);

        if (userLocation && nearestEntry && destination) {
            if (nearestStairsOrElevator) {
                return [userLocation, nearestEntry, nearestStairsOrElevator, destination];
            } else {
                return [userLocation, nearestEntry, destination];
            }
        } else {
            return [];
        }
    }

    const start = () => {
        setIsStart(true);
    }

    const findLocationCoordinates = (locationName: string) => {
        // Procurar no objeto entriesISEP
        for (const entry of entriesISEP) {
            if (entry.name === locationName) {
                return { latitude: entry.latitude, longitude: entry.longitude };
            }
        }

        // Procurar no objeto BlockB
        for (const item of Object.values(BlockB)) {
            for (const entry of item) {
                if (entry.name === locationName) {
                    return entry;
                }
            }
        }

        // Procurar no objeto BlockC
        for (const item of Object.values(BlockC)) {
            for (const entry of item) {
                if (entry.name === locationName) {
                    return entry;
                }
            }
        }

        // Procurar no objeto BlockIJ
        for (const item of Object.values(BlockIJ)) {
            for (const entry of item) {
                if (entry.name === locationName) {
                    return entry;
                }
            }
        }

        // Se o local não for encontrado, retornar null
        return null;
    }

    const goTo = () => {
        const coor = findLocationCoordinates(destiny)

        setDestination(coor)
        findNearestEntry(userLocation);
        findNearestStairsOrElevator(userLocation);

        setIsStart(false);
    }

    const handleSearch = (searchTerm: string) => {
        // Função para percorrer os blocos e encontrar as salas correspondentes ao termo de pesquisa
        const searchMatches = [];

        // Percorra o BlockB
        BlockB.classrooms.forEach(classroom => {
            if (classroom.classroom.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchMatches.push(classroom);
            }
        });

        // Percorra o BlockC
        /*BlockC.classrooms.forEach(classroom => {
            if (classroom.classroom.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchMatches.push(classroom);
            }
        });

        // Percorra o BlockIJ
        BlockIJ.classrooms.forEach(classroom => {
            if (classroom.classroom.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchMatches.push(classroom);
            }
        });*/

        setSearchResults(searchMatches);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="gray"
                    onChangeText={(text: string) => handleSearch(text)}
                />
                <Picker
                    selectedValue={selectBeacons}
                    style={styles.picker}
                    dropdownIconColor="#9a1924"
                    onValueChange={(itemValue: React.SetStateAction<string>) => setSelectBeacons(itemValue)}
                >
                    <Picker.Item label="All Beacons" value="" />
                    <Picker.Item label="Entries ISEP Beacons" value="entries" />
                    <Picker.Item label="Block B Beacons" value="B" />
                    <Picker.Item label="Block C Beacons" value="C" />
                    <Picker.Item label="Block I and J Beacons" value="IJ" />
                </Picker>
                <TouchableOpacity style={styles.StartBtn} onPress={start}>
                    <Text style={styles.StartBtnText}>Start</Text>
                </TouchableOpacity>
            </View>
            <MapView
                style={styles.map}
                region={region}
                zoomEnabled={true}
                minZoomLevel={17}
                showsUserLocation={true}
                loadingEnabled={true}
            >
                {searchResults.length == 0 && (
                    <>
                        {entriesISEP.map((entrie, index) => (
                            (selectBeacons === '' || selectBeacons === "entries") && (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: entrie.latitude, longitude: entrie.longitude }}
                                    pinColor={'red'}
                                    stopPropagation
                                    onPress={() => viewBeaconInfo(entrie)}
                                />
                            )
                        ))}
                        {Object.keys(BlockB).map((key) => (
                            (selectBeacons === '' || selectBeacons === "B") && (
                                BlockB[key].map((coord: { latitude: any; longitude: any; image?: string; name?: string; }, index: React.Key | null | undefined) => (
                                    <Marker
                                        key={index}
                                        coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
                                        pinColor={'#F67402'}
                                        stopPropagation
                                        onPress={() => viewBeaconInfo(coord)}
                                    />
                                )
                                )
                            )
                        ))}
                        {Object.keys(BlockC).map((key) => (
                            (selectBeacons === '' || selectBeacons === "C") && (
                                BlockC[key].map((coord: { latitude: any; longitude: any; image?: string; name?: string; }, index: React.Key | null | undefined) => (
                                    <Marker
                                        key={index}
                                        coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
                                        pinColor={'#990000'}
                                        stopPropagation
                                        onPress={() => viewBeaconInfo(coord)}
                                    />
                                )
                                )
                            )
                        ))}
                        {Object.keys(BlockE).map((key) => (
                            (selectBeacons === '' || selectBeacons === "C") && (
                                BlockE[key].map((coord: { latitude: any; longitude: any; image?: string; name?: string; }, index: React.Key | null | undefined) => (
                                    <Marker
                                        key={index}
                                        coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
                                        pinColor={'#990000'}
                                        stopPropagation
                                        onPress={() => viewBeaconInfo(coord)}
                                    />
                                )
                                )
                            )
                        ))}
                        {Object.keys(BlockIJ).map((key) => (
                            (selectBeacons === '' || selectBeacons === "IJ") && (
                                BlockIJ[key].map((coord: { latitude: any; longitude: any; image?: string; name?: string; }, index: React.Key | null | undefined) => (
                                    <Marker
                                        key={index}
                                        coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
                                        pinColor={'#254F8C'}
                                        stopPropagation
                                        onPress={() => viewBeaconInfo(coord)}
                                    />
                                )
                                )
                            )
                        ))}
                    </>
                )}
                {
                    searchResults.length > 0 && (
                        <>
                            {searchResults.map((coord: { latitude: any; longitude: any; image?: string; name?: string; }, index: React.Key | null | undefined) => (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
                                    pinColor={'#254F8C'}
                                    stopPropagation
                                    onPress={() => viewBeaconInfo(coord)}
                                />
                            )
                            )}
                        </>
                    )
                }


                {userLocation && nearestEntry && destination && (
                    <>
                        <Marker
                            coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
                            pinColor={'red'}
                            title="Você está aqui"
                        />
                        <Marker
                            coordinate={{ latitude: nearestEntry.latitude, longitude: nearestEntry.longitude }}
                            pinColor={'yellow'}
                            title="Ponto de entrada mais próximo"
                        />
                        {nearestStairsOrElevator && (
                            <Marker
                                coordinate={{ latitude: nearestStairsOrElevator.latitude, longitude: nearestStairsOrElevator.longitude }}
                                pinColor={'yellow'}
                                title="Escadas mais próximo"
                            />
                        )}
                        <Marker
                            coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                            pinColor={'green'}
                            title={`Sala de aula ${destination.classroom}`}
                        />
                        <Polyline
                            coordinates={getRouteCoordinates()}
                            strokeWidth={4}
                            strokeColor="#9a1924"
                        />
                    </>
                )}
            </MapView>
            {isStart && (
                <View style={styles.startContainer}>
                    <Text style={styles.startText}>Destiny:</Text>
                    <Picker
                        selectedValue={destiny}
                        style={styles.pickerDestiny}
                        dropdownIconColor="#9a1924"
                        onValueChange={(itemValue: React.SetStateAction<string>) => setDestiny(itemValue)}
                    >
                        <Picker.Item label="Select your destination" value="" />
                        {locations.map((location, index) => (
                            <Picker.Item label={location} value={location} />
                        ))}
                    </Picker>
                    <TouchableOpacity style={styles.GoBtn} onPress={goTo}>
                        <Text style={styles.GoBtnText}>GO TO</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    map: {
        width: width,
        height: height
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 35,
        width: 125,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fcf0e8',
        color: "black",
        marginRight: 5,
    },
    picker: {
        height: 35,
        width: 125,
        color: 'black',
        backgroundColor: '#fcf0e8',
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 5,
    },
    StartBtn: {
        height: 35,
        width: 125,
        backgroundColor: '#9a1924',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,

    },
    StartBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    startContainer: {
        position: "absolute",
        top: "20%",
        left: "18%",
        width: 265,
        height: 225,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        borderColor: '#9a1924',
        borderWidth: 10
    },
    GoBtn: {
        backgroundColor: '#9a1924',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 20, // Espaço para evitar que o botão seja cortado
    },
    GoBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    startText: {
        color: "black",
        fontSize: 16
    },
    pickerDestiny: {
        height: 40,
        width: "100%",
        color: 'black',
        backgroundColor: '#fcf0e8',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20
    }
});

export default Map;