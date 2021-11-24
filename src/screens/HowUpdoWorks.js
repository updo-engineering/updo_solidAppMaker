import React,{useState,useEffect} from "react";
import { Text, ScrollView, Dimensions, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
const { width, height } = Dimensions.get('window');
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { getFAQ } from "../apiSauce/HttpInteractor";
import Loader from "../Components/loader";
import {  useFocusEffect } from '@react-navigation/native';



const HowTipTopWorks = ({navigation}) => {

    const [loading,setLoading] = useState(false)
    const [faq, setFaq] = useState([]);
    const [selectedIndex, setIndex] = useState(100000)


    useFocusEffect(
        React.useCallback(() => {
            getFAQ().then(response => {
                setLoading(true)
                if (response.ok) {
                  if (response.data?.status === true) {
                    setLoading(false)
                    setFaq(response.data.data)
                  }
                  else {
                    setLoading(false)
                    Toast.show(response.data.message)
                  }
                } else {
                  setLoading(false)
                  Toast.show(response.problem)
                }
              });
          return () => {
            //unfocused
          };
        }, [])
      );
  


    const Item = ({ item, index }) => (
        <View style={{ borderRadius: 12, backgroundColor: "white"}}>
            <View style={{ flexDirection: "row", alignSelf: "center", }}>
                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue }]} activeOpacity={0.8} onPress={() => {
                    selectedIndex === index ? setIndex(100000):setIndex(index)
                }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.btnTitleStyle}>{item.question}</Text>
                        <Image style={{ width: 20, height: 20, alignSelf: "flex-end", marginEnd: 16, resizeMode: "contain" }} source={selectedIndex === index ? require("../assets/upArrow.png"):require("../assets/downWhite.png")} />
                    </View>
                </TouchableOpacity>
            </View>
            {selectedIndex === index?
            <View style={{ backgroundColor: 'white',marginBottom:8, paddingHorizontal: 16,paddingVertical:8,marginTop:-20,width: "93%",alignSelf:"center",shadowColor:"grey", shadowOpacity: 0.4, elevation: 3,
                        shadowOffset: { width: 0, height: 1 },borderBottomEndRadius:8,borderBottomLeftRadius:8 }}>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15 }}>{item.answer}</Text>
    
            </View>:<View/>}
        </View>
    );

    return (

        <ScrollView
            style={{ width: "100%", height: "100%",backgroundColor:'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="How TipTop works" />
                <HomeHeader />

                <View style={styles.itemViewStyle}>
                    <Text style={{ fontSize: 22, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 30 }} >Get started with TipTop</Text>
                    <Text style={{ fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 16, marginTop: 16 }} >Find a service provider that fits your needs. </Text>
                    <Image style={{ width: 200, height: 200, alignSelf: "center", marginVertical: 30 }} source={require("../assets/searchGrad.png")}></Image>
                    <Text style={{ fontSize: 16, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 16, marginBottom: 40 }} >From hair and nails, to eyebrows and even pet grooming, our TipTop Community has a diverse set
                        of skills!</Text>
                </View>


                <View style={styles.itemViewStyle}>
                    <Text style={{ fontSize: 22, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 30 }} >Confirm your booking,
                        around your time</Text>
                    <Text style={{ fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 16, marginTop: 16 }} >TipTop is built around your schedule. Book when it’s most convenient for you!</Text>
                    <Image style={{ width: 200, height: 200, alignSelf: "center", marginVertical: 30 }} source={require("../assets/calGrad.png")}></Image>
                </View>


                <View style={styles.itemViewStyle}>
                    <Text style={{ fontSize: 22, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 30 }} >Grooming Services, with Piece of Mind</Text>
                    <Text style={{ fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 16, marginTop: 16 }} >TipTop is a safe community, we keep your information private and allow you to control your environment.</Text>
                    <Image style={{ width: 200, height: 200, alignSelf: "center", marginVertical: 30 }} source={require("../assets/checkGrad.png")}></Image>
                </View>

                <Invite navigation = {navigation}/>
                {/* <Text style={{ fontSize: 22, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 30 }} >FAQ</Text> */}

                {/* <FlatList
                    horizontal={false}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={faq}
                    renderItem={Item}
                    keyExtractor={item => item.id}
                /> */}

                {/* <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <TouchableOpacity style={[styles.btnViewStyle,{backgroundColor: Colors.pinkColor, borderRadius: 25}]} onPress={() => {
                        //action
                    }} >
                        <View style={{ flexDirection: "row", justifyContent:"center" }}>
                            <Text style={styles.btnTitleStyle}>Book with TipTop</Text>
                            <Image style={{ width: 20, height: 20, position:"absolute",end:16, resizeMode: "contain" }} source={require("../assets/downWhite.png")} />
                        </View>
                    </TouchableOpacity>

                </View> */}
      {loading && <Loader/>}

            </SafeAreaView>
        </ScrollView>
    );
}

export default HowTipTopWorks



const HomeHeader = () => {
    return (
        <ImageBackground style={{ width, height: 400, marginTop: -16 }} source={require("../assets/homeTop.png")}>
            {/* <View>
                <Text style={[styles.boldTextStyle, { color: "white" }]} >Welcome to TipTop!</Text>
                <Text style={styles.btnTitleStyle}>Your Schedule, Your Time.</Text>
            </View> */}
        </ImageBackground>
    )
}



const Invite = ({ navigation }) => {
    return (
      <ImageBackground style={{width:width*0.95,height: height * 0.4, marginVertical: 8, justifyContent: "flex-end",alignSelf: "center",borderRadius:16}} source={require("../assets/inviteBg.png")}>
  
        <TouchableOpacity style={{ height: 40, backgroundColor: "white", width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginBottom: 30 }} onPress={() => {
          navigation.navigate('InviteFriends')
        }} >
          <Text style={{
            alignSelf: "center",
            color: Colors.blueText,
            fontSize: 14,
            fontFamily: Custom_Fonts.Montserrat_SemiBold
          }}>Invite a Friend!</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }




const styles = StyleSheet.create({

    pickerStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        marginTop: 20,
        borderColor: "black",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    pickerTitleStyle: {
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Regular,
        marginLeft: 16,
    },
    boldTextStyle: {
        fontSize: 24,
        fontFamily: Custom_Fonts.Montserrat_Bold,
        marginHorizontal: 16,
        marginTop: 50

    },
    btnViewStyle: {
        height: 50,
        width: "93%",
        marginVertical: 12,
        borderRadius: 12,
        justifyContent: "center"
    },
    btnExploreStyle: {
        width: "35%",
        height: 40,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        justifyContent: "center",
        marginBottom: 40
    }
    ,
    btnTitleStyle: {
        marginHorizontal: 16,
        color: "white",
        fontSize: 14,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    ratingViewStyle: {
        width: "35%",
        height: 32,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        marginTop: 16,
        justifyContent: "center"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 8,
        minWidth: 150,
        height: 80,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        marginEnd: 16,
        color: "white",
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
    itemViewStyle: {
        backgroundColor: "white",
        borderRadius: 16,
        marginVertical: 20,
        marginHorizontal: 12,
        shadowColor: "grey",
        shadowOpacity: 0.4,
        elevation: 3,
        shadowOffset: { width: 0, height: 1 }
    },

});
