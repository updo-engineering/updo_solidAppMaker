import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, FlatList, Image, ScrollView, Dimensions, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const { width, height } = Dimensions.get('window');
import {saveProvider } from "../apiSauce/HttpInteractor";
import { Constants } from "../Constants/Constants";
import ActionButton from "react-native-circular-action-menu";
import { useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';


const UpdoerProfile = (props) => {
    const [selectedIndex, setIndex] = useState(4)
    const [reviewIndex, setreviewIndex] = useState(4)
    let providerData = props.route.params.data
    const [serviceID, setServiceID] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const token = useSelector(state => state.userReducer.token)
    const auth = useSelector(state => state.userReducer.auth)
    const user = useSelector(state => state.userReducer.user)

    const ReviewItem = ({ item, index }) => (

        <View style={{ borderBottomWidth: 0.5, borderColor: "grey" }}>
            <TouchableOpacity style={{ flexDirection: "row" }} activeOpacity={0.8} onPress={() => {
                reviewIndex === index ? setreviewIndex(3) : setreviewIndex(index)
            }} >
                <View>
                    <Image style={{ marginHorizontal: 12, marginTop: 16, resizeMode: "cover", width: 50, height: 50, borderRadius: 25 }} source={require("../assets/dummy.png")} />
                    <Text style={{ fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 12, marginBottom: 15 }}>{item.title}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 8, marginTop: 16, color: Colors.themeBlue }}>★</Text>
                        <Text style={{ fontSize: 14, fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 16, color: "#8E8E8E" }}>June 20, 2020</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                        <View style={{ height: 28, borderRadius: 15, borderColor: "black", borderWidth: 1, margin: 8, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginHorizontal: 16 }}>HairColor</Text>
                        </View>
                        <View style={{ height: 28, borderRadius: 15, borderColor: "black", borderWidth: 1, margin: 8, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginHorizontal: 16 }}>Hair</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {reviewIndex == index ?
                <View style={styles.pickerStyle}>
                    <TextInput style={styles.pickerTitleStyle} placeholder="Write a comment..." />
                    <Image style={{ width: 32, height: 32, resizeMode: "contain", marginEnd: 20 }} source={require("../assets/sendBtn.png")} />
                </View> : <View />}
        </View>
    );


    const SlidingImg = ({ item }) => (
        <View style={{
            height: 220,
            width: width, alignItems: "center"
        }}>
            <View style={{
                height: 220,
                width: width * 0.9,
                borderRadius: 16,
                justifyContent: "center", elevation: 3,
                shadowColor: "grey", shadowOpacity: 0.4,
                shadowOffset: { width: 0, height: 1 }
            }}>
                <Image style={{
                    height: 220,
                    width: width * 0.9, resizeMode: "stretch", borderRadius: 16
                }} source={item.image_link != "" ? { uri: Constants.IMG_BASE_URL + item.image_link } : require("../assets/dummy.png")} />
            </View>
        </View>
    );


    const ServicesItem = ({ item, index }) => (
        <TouchableOpacity style={styles.item} onPress={() => {
            setServiceID(index)
        }} >
            <Image style={{ marginEnd: 12, resizeMode: "contain", width: 24, height: 24 }} source={ item.service_id.service_icon != "" ? { uri: Constants.IMG_BASE_URL + item.service_id.service_icon } : require("../assets/hairColor.png")} />
            <Text style={styles.title}>{item.service_id.service_name}</Text>
        </TouchableOpacity>
    );



    const SubServiceItem = ({ item }) => (
        <View style={{
            flexDirection: "row", paddingHorizontal: 22, paddingVertical: 8
        }}>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, width: "60%" }}>{item.service_name}</Text>
            <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14 }}>from ${item.service_price}</Text>
        </View>
    );

    const AvailablityItem = ({ item }) => (
        <View style={{
            flexDirection: "row", paddingHorizontal: 8, paddingVertical: 8
        }}>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, width: "60%" }}>{item.day}</Text>
            <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15 }}>{item.start_time} - {item.end_time}</Text>
        </View>
    );


    return (
        <View style={{ backgroundColor: "white" }}>
            <ScrollView
                style={{ width: "100%", height: "100%" }}
                horizontal={false}
                scrollEventThrottle={16}
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <SafeAreaView>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack()
                        }} >
                            <Image style={{ width: 16, height: 16, resizeMode: "contain", marginHorizontal: 12 }} source={require(".//../assets/backBtn.png")} /></TouchableOpacity>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 22 }}>{providerData.name}</Text>
                        <TouchableOpacity style={{ position: "absolute", end: 16}} onPress={() => {
                          props.navigation.navigate('MessageScreen', { key: user._id + '_' + providerData._id , chatHeader: providerData.name, toID: providerData._id })
                        }} >
                        <Image style={{ width: 24, height: 24, resizeMode: "contain" }} source={require(".//../assets/msg.png")} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
                        <View style={{
                            width: 65, height: 65, margin: 16, backgroundColor: "white", borderRadius: 32, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
                            shadowOffset: { width: 0, height: 1 }
                        }}>
                            <Image style={{ width: 65, height: 65, resizeMode: "cover", borderRadius: 32 }} source={providerData.profile_pic != "" ? { uri: Constants.IMG_BASE_URL + providerData.profile_pic } : require("../assets/dummy.png")} /></View>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require(".//../assets/likeIcon.png")} />
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 13, marginHorizontal: 4 }}>100% Recommended (19+)</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require(".//../assets/navPin.png")} />
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 13, marginHorizontal: 4 }}>{providerData.address.city},{providerData.address.location.split(",").slice(-1)[0]}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", height: 120, justifyContent: "space-between", alignContent: "center", paddingHorizontal: 8 }}>
                        <Image style={styles.socialImgStyle} source={require("../assets/insta.png")} />
                        <Image style={styles.socialImgStyle} source={require("../assets/pinterest.png")} />
                        <Image style={styles.socialImgStyle} source={require("../assets/twitter.png")} />
                        <Image style={styles.socialImgStyle} source={require("../assets/youTube.png")} />
                    </View>

                    <FlatList
                        horizontal={true}
                        scrollEnabled={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={providerData.images}
                        renderItem={SlidingImg}
                        keyExtractor={item => item.id}
                    />

                    <FlatList
                        style={{ marginLeft: 8, marginTop: 16 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={providerData.services}
                        renderItem={ServicesItem}
                        keyExtractor={item => item.id}
                    />

                    <View style={{
                        borderRadius: 16, backgroundColor: "#F1FBFF", margin: 16, borderColor: Colors.themeBlue, elevation: 4, shadowColor: "grey",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
                    }}>
                        <FlatList
                            key="subService"
                            style={{ marginLeft: 8, marginVertical: 40 }}
                            horizontal={false}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            data={providerData.services[serviceID].sub_services}
                            renderItem={SubServiceItem}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={{ borderRadius: 12, backgroundColor: "white", marginVertical: 15 }}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue }]} activeOpacity={0.8} onPress={() => {
                                selectedIndex === 0 ? setIndex(4) : setIndex(0)
                            }} >
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.btnTitleStyle}>About {providerData.name}</Text>
                                    <Image style={{ width: 20, height: 20, alignSelf: "flex-end", marginEnd: 16, resizeMode: "contain" }} source={require("../assets/downWhite.png")} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {selectedIndex === 0 ?
                            <View style={{
                                minHeight: 80, backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, marginTop: -8, width: "93%", alignSelf: "center", shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
                                shadowOffset: { width: 0, height: 1 }, borderBottomEndRadius: 8, borderBottomLeftRadius: 8
                            }}>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15 }}>{providerData.about_me}</Text>
                            </View> : null}
                    </View>

                    <View style={{ borderRadius: 12, backgroundColor: "white", marginVertical: 15 }}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue }]} activeOpacity={0.8} onPress={() => {
                                selectedIndex === 1 ? setIndex(4) : setIndex(1)
                            }} >
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.btnTitleStyle}>General Availability</Text>
                                    <Image style={{ width: 20, height: 20, alignSelf: "flex-end", marginEnd: 16, resizeMode: "contain" }} source={require("../assets/downWhite.png")} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {selectedIndex === 1 ?
                            <View style={{
                                backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, marginTop: -8, width: "93%", alignSelf: "center", shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
                                shadowOffset: { width: 0, height: 1 }, borderBottomEndRadius: 8, borderBottomLeftRadius: 8
                            }}>
                                <FlatList
                                    key="availability"
                                    horizontal={false}
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={providerData.availability}
                                    renderItem={AvailablityItem}
                                    keyExtractor={item => item.id}
                                />
                            </View> : null}
                    </View>


                    <View style={{ borderRadius: 12, backgroundColor: "white", marginVertical: 15 }}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue }]} activeOpacity={0.8} onPress={() => {
                                selectedIndex === 2 ? setIndex(4) : setIndex(2)
                            }} >
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.btnTitleStyle}>Credentials</Text>
                                    <Image style={{ width: 20, height: 20, alignSelf: "flex-end", marginEnd: 16, resizeMode: "contain" }} source={require("../assets/downWhite.png")} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {selectedIndex === 2 ?
                            <View style={{
                                height: 80, backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, marginTop: -8, width: "93%", alignSelf: "center", shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
                                shadowOffset: { width: 0, height: 1 }, borderBottomEndRadius: 8, borderBottomLeftRadius: 8
                            }}>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15 }}>{providerData.credentials}</Text>
                            </View> : null}
                    </View>

                    {/* {providerData.my_reviews.length > 0 ?  <View><Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 20 }}>Reviews (19)</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: Colors.themeBlue, fontSize: 14, marginHorizontal: 16, marginTop: 8 }}>4.6 ★ (19)</Text>
                        <TouchableOpacity onPress={() => {
                            //action
                        }} >
                            <Image style={{ width: 70, height: 25, resizeMode: "contain", marginEnd: 8 }} source={require("../assets/sortBtn.png")} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        horizontal={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={providerData.my_reviews}
                        renderItem={ReviewItem}
                        keyExtractor={item => item.id}
                    /> </View>: null} */}
                   

                    {/* <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 20 }}>Trophy Case</Text> */}

                    {/* <View style={{
                    width: "90%", height: 150, elevation: 3, marginVertical: 15, backgroundColor: "white", alignSelf: "center", borderRadius: 16, shadowColor: "grey", shadowOpacity: 0.4,
                    shadowOffset: { width: 0, height: 1 }
                }}> */}

                    {/* <Image style={{ width: "100%", height: 180, resizeMode: "contain" }} source={require("../assets/tropy.png")}></Image> */}

                    {/* </View> */}


                </SafeAreaView>
            </ScrollView>

            {isClicked ? <Image source={require("../assets/rectGrad.png")} style={{ height: height * 0.4, width, position: "absolute", bottom: 0 }} /> : null}
            {auth ?<ActionButton position="right" degrees= {0} buttonColor="#F0B752" btnOutRange="#F0B752" icon={<Image style={{ width: 60, height: 60, resizeMode: "contain" }} source={require("../assets/updoIcon.png")} />
            } onPress={() => { setIsClicked(!isClicked) }}>
                <ActionButton.Item
                    title="msg"
                    onPress={() => {setIsClicked(!isClicked);
                         }}
                >
                    <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={require("../assets/fabMsg.png")} />
                </ActionButton.Item>
                <ActionButton.Item
                    title="save"
                    onPress={() => { 
                        setIsClicked(!isClicked)
                        saveProvider(providerData._id, token).then(response => {
                            if (response.ok) {
                              if (response.data?.status === true) {
                                Toast.show(response.data.message)
                              }
                              else {
                                Toast.show(response.data.message)
                              }
                            } else {
                              Toast.show(response.problem)
                            }
                          })
                    }}
                >
                    <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={require("../assets/fabSave.png")} />

                </ActionButton.Item>
                <ActionButton.Item
                    title="Cal"
                    onPress={() => {setIsClicked(!isClicked) 
                        props.navigation.navigate('SchduleScreen',{providerID:providerData._id,providerName:providerData.name,providerImg:Constants.IMG_BASE_URL + providerData.profile_pic})}}
                >
                    <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={require("../assets/cal.png")} />
                </ActionButton.Item>
            </ActionButton> : null}
            {/* <TouchableOpacity style={{ position: "absolute", bottom: -40, end: 0 }} onPress={() => {
                setIsClicked(!isClicked)
            }} >
                <Image style={{ width: 120, height: 120, resizeMode: "contain" }} source={require("../assets/updoIcon.png")} />
            </TouchableOpacity> */}
        </View>
    )
}

export default UpdoerProfile




const styles = StyleSheet.create({

    socialImgStyle: {
        alignSelf: "center",
        resizeMode: "contain",
        width: "25%",
        height: 90
    },
    item: {
        backgroundColor: Colors.themeBlue,
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 8,
        minWidth: 120,
        height: 74,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginEnd: 16,
        color: "white",
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
    btnViewStyle: {
        height: 50,
        width: "93%",
        borderRadius: 12,
        justifyContent: "center", elevation: 3,
        shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
        shadowOffset: { width: 0, height: 1 }
    },
    btnTitleStyle: {
        marginHorizontal: 16,
        color: "white",
        fontSize: 14,
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
    pickerStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        margin: 18,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between"
    },
    pickerTitleStyle: {
        width: "82%",
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Regular,
        marginLeft: 16
    },


});
