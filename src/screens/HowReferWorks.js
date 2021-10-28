import React from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity,FlatList,View} from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Refer friends',
        index: 1
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Follow along',
        index: 2
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
        title: 'Get paid',
        index: 3
    }
];

const HowReferWorks = ({navigation}) => {

    return (
        <SafeAreaView>
        <TopHeaderView title = "How referrals work"/>

       <FlatList
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={Item}
                keyExtractor={item => item.id}
            />
       
        </SafeAreaView>
    );
  }
  
  export default HowReferWorks

  const Item = ({ item }) => (
    <View style = {styles.itemViewStyle}>
       <View style = {{height:50,backgroundColor:Colors.themeBlue,width:"100%",justifyContent:"center", borderTopLeftRadius:16,borderTopRightRadius:16}}>
           <Text style = {styles.btnTitleStyle}>{item.index+" . "+item.title}</Text>
       </View>
       <View style = {{justifyContent:"center",alignItems:"center",height:130}}>
       <Text style = {{fontFamily:Custom_Fonts.Montserrat_Regular,fontSize:15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
       </View>
    </View>
);
  
  
  const styles = StyleSheet.create({
    btnViewStyle: {
        width:"90%",
        flexDirection:"row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical:40,
        borderRadius: 25,
        justifyContent: "center",
       
      },
      btnTitleStyle: {
        color: "white",
        fontSize: 17,
        marginLeft:16,
        fontFamily:Custom_Fonts.Montserrat_SemiBold,
      },
    itemViewStyle: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 16,
        height: 180,
        marginVertical: 12,
        marginHorizontal: 16,
        shadowColor: "grey",
        shadowOpacity: 0.4,
        elevation: 3,
        
        shadowOffset: { width: 0, height: 1 }
    },
  });
  