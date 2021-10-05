import React from "react";
import { Text, ScrollView, Dimensions, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
const { width, height } = Dimensions.get('window');
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'hair',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'nails',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'skin',
  },
];



const HomeTabScreen = () => {
  return (

    <ScrollView
      style={{ width: "100%", height: "100%" }}
      horizontal={false}
      scrollEventThrottle={16}
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

       <HomeHeader/>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
      <PopularView />
      <OccasionView />
      <JoinView />
      <Invite />
      <ShopUpdoStore />
      <HowUpdoWorks />
    </ScrollView>
  );
}

export default HomeTabScreen


const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Image style={{ marginEnd: 12 }} source={require("../../assets/updo.png")} />
  </View>
);

const OccasionItem = ({ item }) => (
  <View style={{ height: 200, width: width * 0.5, backgroundColor: Colors.blueText, margin: 16, borderRadius: 12, shadowColor: "grey", shadowOpacity: 0.4, overflow: "hidden", elevation: 3, shadowOffset: { width: 0, height: 1 } }}>

    <Image style={{ resizeMode: "contain", height: 130, width: width * 0.5 }} source={require("../../assets/ring.png")} />
    <View style={{ backgroundColor: "white", height: 70 }}>
      <Text style={{ color: "black", alignSelf: "center", fontSize: 18, fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 20 }}>{item.title}</Text>
    </View>
  </View>
);

const PopularItem = ({ item }) => (
  <View style={{ width: width * 0.8, backgroundColor: "white", borderRadius: 16, height: 360, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
    <ImageBackground style={{ height: 180, width: width * 0.8, resizeMode: "stretch" }} source={require("../../assets/dummy.png")}>
      <View style={styles.ratingViewStyle} onPress={() => {
        //     navigation.navigate('HomeTabScreen')
      }} >
        <Text style={styles.btnTitleStyle}>4.6 * (17+)</Text>
      </View>
    </ImageBackground>
    <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 18 }}>Juliana Baker</Text>
    <View style = {{flexDirection:"row"}}>
    <View style = {{height:30,borderRadius:15,borderColor:"black",borderWidth:1,margin:16,alignItems:"center",justifyContent:"center"}}>
      <Text style= {{marginHorizontal:16}}>HairColor</Text>
    </View>
    <View style = {{height:30,borderRadius:15,borderColor:"black",borderWidth:1,margin:16,alignItems:"center",justifyContent:"center"}}>
    <Text style= {{marginHorizontal:16}}>Hair</Text>
    </View>
    </View>
   <View style = {{flexDirection:"row",alignContent:"center",width:width* 0.8,justifyContent:"space-between"}}>
     <View style = {{flexDirection:"row",alignItems:"center"}}>
   <Image style = {{width:24,height:24,resizeMode:"contain",marginLeft:16,marginRight:8}} source = {require("../../assets/navPin.png")}/>  
   <Text style = {{fontFamily:Custom_Fonts.Montserrat_SemiBold,fontSize:12}}>0.1 miles away</Text>
   </View>
   <Image style = {{width:80,height:80,resizeMode:"contain",alignSelf:"flex-end"}} source = {require("../../assets/Save.png")}/>
   </View>
  </View>
);

const HomeHeader = () => {
  return (
    <ImageBackground style={{ width, height: height * 0.65, resizeMode: "stretch" }} source={require("../../assets/homeTop.png")}>
        <SafeAreaView>
    <View>
      <TouchableOpacity style={styles.pickerStyle} onPress={() => {
        //action
      }} >
        <Image style={{ width: 24, height: 24 }} source={require("../../assets/searchBtn.png")} />
        <Text style={styles.pickerTitleStyle}>How do you Updo?</Text>

      </TouchableOpacity>

      <Text style={styles.boldTextStyle} >Updo{"\n"}Near You </Text>
      <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
        //action
      }} >
        <Text style={styles.btnTitleStyle}>Explore nearby Updoers</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
      </ImageBackground>
  )
}

var PopularView = () => {
  return (
    <View>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 25 }}>Popular Updoers</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={PopularItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

var OccasionView = () => {
  return (
    <View style={{ width, height: height * 0.5, backgroundColor: "#FFBDCC", marginVertical: 20 }}>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24, color: Colors.blueText }}>Style up for{"\n"}special occasion?</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={OccasionItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.btnExploreStyle} onPress={() => {
        //action
      }} >
        <Text style={styles.btnTitleStyle}>Explore all</Text>
      </TouchableOpacity>
    </View>)
}

const JoinView = () => {
  return (
    <ImageBackground style={{ width, height: height * 0.5, marginVertical: 20 }} source={require("../../assets/joinBg.png")}>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 22, color: Colors.blueText, alignSelf: "center" }}>Join the Updo Community!</Text>
      <Text style={{ marginLeft: 16, fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, color: Colors.blueText, alignSelf: "center" }}>Sign up to list your services!</Text>

      <TouchableOpacity style={{ height: 40, backgroundColor: Colors.pinkColor, width: "35%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: 20 }} onPress={() => {
        //action
      }} >
        <Text style={styles.btnTitleStyle}>Join Now</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const Invite = () => {
  return (
    <ImageBackground style={{ width, height: height * 0.5, marginVertical: 20, justifyContent: "flex-end" }} source={require("../../assets/inviteBg.png")}>

      <TouchableOpacity style={{ height: 40, backgroundColor: "white", width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginBottom: 30 }} onPress={() => {
        //action
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

const ShopUpdoStore = () => {
  return (
    <ImageBackground style={{ width, height: height * 0.5, marginVertical: 20 }} source={require("../../assets/shop.png")}>
      <TouchableOpacity style={{ height: 40, backgroundColor: "white", width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: 40 }} onPress={() => {
        //action
      }} >
        <Text style={{
          alignSelf: "center",
          color: Colors.blueText,
          fontSize: 14,
          fontFamily: Custom_Fonts.Montserrat_SemiBold
        }}>Shop the Updo Store</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const HowUpdoWorks = () => {
  return (
    <ImageBackground style={{ width, height: height * 0.5, marginTop: 20, justifyContent: "flex-end", marginBottom: 120 }} source={require("../../assets/howWorks.png")}>

      <TouchableOpacity style={{ height: 40, backgroundColor: Colors.pinkColor, width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginBottom: 120 }} onPress={() => {
        //action
      }} >
        <Text style={styles.btnTitleStyle}>How Updo Works</Text>
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
    color: "white",
    fontSize: 30,
    fontFamily: Custom_Fonts.Montserrat_Black,
    margin: 16

  },
  btnViewStyle: {
    width: "55%",
    height: 32,
    backgroundColor: Colors.themeBlue,
    marginLeft: 12,
    borderRadius: 25,
    justifyContent: "center"
  },
  btnExploreStyle: {
    width: "35%",
    height: 32,
    backgroundColor: Colors.themeBlue,
    marginLeft: 12,
    borderRadius: 25,
    justifyContent: "center",
    marginBottom: 40
  }
  ,
  btnTitleStyle: {
    alignSelf: "center",
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

});
