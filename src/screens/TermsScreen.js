import React,{useEffect,useState} from "react";
import { Text, SafeAreaView,View, ScrollView} from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { getTerms } from "../apiSauce/HttpInteractor";

const TermsScreen = ({navigation}) => {

  const [termsData, setTermsData] = useState("");

  useEffect(() => {
    getTerms().then(response => {
      if (response.ok) {
        if (response.data?.status === true) {
          setTermsData(response.data?.data.term_content)
        }
        else {
          Toast.show(response.data.message)
        }
      } else {
        Toast.show(response.problem)
      }
    });


  }, []);
    return (
        <SafeAreaView>
        <TopHeaderView title = "Terms and conditions"/>

        <ScrollView style={{ width: "100%", height: "100%" }}
      horizontal={false}
      scrollEventThrottle={16}
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

            <Text style = {{fontFamily:Custom_Fonts.Montserrat_Medium,marginHorizontal:20}}>{termsData}</Text>
        </ScrollView>
       
        </SafeAreaView>
    );
  }
  
  export default TermsScreen