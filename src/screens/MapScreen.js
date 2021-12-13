import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, PermissionsAndroid } from 'react-native'
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors } from '../Colors/Colors';
import { Custom_Fonts } from '../Constants/Font';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../Redux/userDetail';

const MapScreen = ({ navigation,route }) => {
    const mapRef = useRef(null)
    const placesRef = useRef();
    const [address, setAddress] = useState('')
    const [focused, setFocused] = useState(false)
    const [currentLatitude, setCurrentLatitude] = useState(0.0)
    const [currentLongitude, setCurrentLongitude] = useState(0.0)
    let dispatch = useDispatch()
    let location = useSelector(state => state.userReducer).location


    useEffect(() => {
        const requestLocationPermission = async () => {
            let hasLocationPermission = false
            if (Platform.OS === 'ios') {
                hasLocationPermission = true
                get_current_location()
            } else {

                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: "TipTop Location Permission",
                            message:
                                "TipTop needs to access your location ",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK"
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        get_current_location();
                        hasLocationPermission = true
                    } else {
                        console.log("Permission")
                    }
                } catch (err) {
                }
            }
        };
        requestLocationPermission();
    }, []);

    function get_current_location() {
        Geolocation.getCurrentPosition(location => {
            setCurrentLatitude(location.coords.latitude)
            setCurrentLongitude(location.coords.longitude)
            get_address(location)
        }, error => {
            const { code, message } = error;
            console.warn(code, message);
            get_address(location)
        })
    }

    function get_address(location) {
        console.log(location)
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.coords.latitude + ', ' + location.coords.longitude + '&key=' + 'AIzaSyDF8hXkFM1W4lXgZxWWb5XKLrPUa757xAU').
            then(async (res) => {
                let resjson = await res.json()
                if (resjson.results.length > 0) {
                    let addressComponent = resjson.results[0].address_components
                    let city = addressComponent.filter((data) => data.types.includes('locality'))
                    let state = addressComponent.filter((data) => data.types.includes('administrative_area_level_1'))
                    let fetchCity = city.length > 0 ? city[0].long_name + ', ' : ''
                    let fetchState = state.length > 0 ? state[0].short_name : ''
                    let combined = fetchCity + fetchState
                    setAddress(combined)
                }
            }).catch((error) => console.log("results error => ", error.message))

    }




    return (
        <View style={styles.screen}>
            <StatusBar
                barStyle="dark-content"
            />
            <View>
                <GooglePlacesAutocomplete
                    ref={placesRef}
                    styles={{
                        container: { borderColor: Colors.themeBlue, borderWidth: 1.5, position: 'absolute', width: '95%', zIndex: 500, alignSelf: 'center', top: Platform.OS === "ios" ? "5%" : "1%", backgroundColor: "white", borderRadius: 6 },
                        listView: { paddingVertical: 5 },
                        separator: {}
                    }}
                    placeholder='Search'
                    fetchDetails={true}
                    onPress={(data, details) => {
                        if (details?.geometry?.location?.lat) {

                            setCurrentLatitude(details?.geometry?.location?.lat)
                            setCurrentLongitude(details?.geometry?.location?.lng)
                            setAddress(data?.description)
                            let addressComponent = details.address_components
                            let city = addressComponent.filter((data) => data.types.includes('locality'))
                            let state = addressComponent.filter((data) => data.types.includes('administrative_area_level_1'))
                            let fetchCity = city.length > 0 ? city[0].long_name + ', ' : ''
                            let fetchState = state.length > 0 ? state[0].short_name : ''
                            let combined = fetchCity + fetchState
                            setAddress(combined)
                            placesRef.current.blur()
                            mapRef.current.animateToRegion({
                                latitude: details?.geometry?.location?.lat,
                                longitude: details?.geometry?.location?.lng
                            })
                        }

                        if (Platform.OS == "ios") {
                            setFocused(false)
                        }
                    }}
                    textInputProps={{
                        onFocus: () => setFocused(true),
                        onblur: () => setFocused(false),

                        blurOnSubmit: true,
                        onSubmitEditing: () => setFocused(false),
                    }}
                    query={{
                        key: 'AIzaSyDF8hXkFM1W4lXgZxWWb5XKLrPUa757xAU',
                        language: 'en',
                    }}
                />
                <MapView
                    ref={mapRef}
                    style={{ width: "100%", height: "100%" }}
                    initialRegion={{
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={{
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    zoomEnabled={true}
                >
                    <Marker
                        pinColor={"red"}
                        coordinate={{
                            latitude: currentLatitude,
                            longitude: currentLongitude
                        }}
                    />
                </MapView>

                <TouchableOpacity style={{
                    width: "90%",
                    height: 50,
                    backgroundColor: Colors.themeBlue,
                    borderRadius: 25,
                    position: "absolute",
                    bottom: 30,
                    alignSelf: "center",
                    justifyContent: "center"
                }} onPress={() => {


                    location = {
                        ...location,
                        lat: currentLatitude,
                        long: currentLongitude,
                        location: address
                    }

                    dispatch(setLocation(location))

                    navigation.goBack()
                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 17,
                        fontFamily: Custom_Fonts.Montserrat_SemiBold
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default MapScreen