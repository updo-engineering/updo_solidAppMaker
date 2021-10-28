import React from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity,View} from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";


const EarningScreen = ({navigation}) => {

    return (
        <SafeAreaView>
        <TopHeaderView title = "Earnings"/>

        <View style = {{height:60,padding:16}}>
          <View style = {{flexDirection:"row"}}>
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15,width:"50%"}}>Paid in</Text>
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18}}>$0</Text>
        </View>
        <View style = {{height:1,backgroundColor:Colors.greyColor,marginVertical:15}}></View>
    </View>


    <View style = {{height:60,padding:16}}>
          <View style = {{flexDirection:"row"}}>
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15,width:"50%"}}>Paid out</Text>
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18}}>$5,000</Text>
        </View>
        <View style = {{height:1,backgroundColor:Colors.greyColor,marginVertical:15}}></View>
    </View>

        </SafeAreaView>
    );
  }
  
  export default EarningScreen


  
  const styles = StyleSheet.create({
    btnViewStyle: {
        width:"90%",
        flexDirection:"row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical:40,
        borderRadius: 25,
        justifyContent: "center"
      }
  });
  