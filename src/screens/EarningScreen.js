import React, { useState } from "react";
import { Text, SafeAreaView, View, Dimensions,TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useSelector } from "react-redux"
import { getTransactionList } from "../apiSauce/HttpInteractor";
import Loader from '../Components/loader';
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');


const EarningScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [trans, setTrans] = useState([])
  const token = useSelector(state => state.userReducer.token)
  const [tips, setTips] = useState()
  const [total, setTotal] = useState()
  const [amount, setAmount] = useState()

  const getTrans = () => {
    setLoading(true);
    getTransactionList(token).then(response => {
      if (response.ok) {
        if (response.data?.status === true) {
          setLoading(false);
          setTrans(response.data.data)
          let tip = 0
          let total = 0
          for (let index = 0; index < response.data.data.length; index++) {
            const element = response.data.data[index];
             tip = tip+element.tip
             total = total+element.proposal_id.total
          }
          setTips(tip)
          setTotal(total)
          setAmount(total*5/100)
        }
        else {
          setLoading(false);
          setTrans([])
          Toast.show(response.data.message)
        }
      } else {
        setLoading(false);
        setTrans([])
        Toast.show(response.problem)
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      getTrans()
      return () => {
        //unfocused
      };
    }, [])
  );
  return (
    <View style={{ backgroundColor: "white", height }}>

      <SafeAreaView>
        <TopHeaderView title="Earnings" />

        <View style={{
          height: 170, padding: 16, marginHorizontal: 20, backgroundColor: 'white', elevation: 8, shadowColor: "black", marginHorizontal: 16, marginVertical: 8, borderRadius: 12,
          shadowOpacity: 0.6,
          shadowOffset: { width: 0, height: 4 }, shadowColor: "grey"
        }}>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, color: 'black', marginHorizontal: 25, marginTop: 8, alignSelf: "center" }}>TipTop Earnings</Text>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24, color: 'black', marginHorizontal: 25, marginTop: 12, alignSelf: "center" }}>$ {total-amount}</Text>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 13, color: 'black', marginHorizontal: 25, marginTop: 30, alignSelf: "center" }}>{trans.length} TipTop services </Text>
        </View>

        <View style={{ flexDirection: 'row',justifyContent: 'space-between'}}>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginLeft: 25, marginTop: 30, alignSelf: "center", width: '60%' }}>TipTop payments</Text>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginRight: 25, marginTop: 30, alignSelf: "center" }}>$ {total}</Text>
        </View>

        <View style={{ flexDirection: 'row',justifyContent: 'space-between'}}>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginLeft: 25, marginTop: 30, alignSelf: "center", width: '60%' }}>Tips</Text>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginRight: 25, marginTop: 30, alignSelf: "center" }}>$ {tips}</Text>
        </View>

        <View style={{ flexDirection: 'row',justifyContent: 'space-between'}}>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginLeft: 25, marginTop: 30, alignSelf: "center", width: '60%' }}>TipTop fees</Text>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginRight: 25, marginTop: 30, alignSelf: "center" }}>$ {amount}</Text>
        </View>
        <View style={{ height:0.5 ,backgroundColor:'#8E8E8E',marginTop:30,marginHorizontal:20}}/>
        <View style={{ flexDirection: 'row',alignSelf: "center" }}>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, color: 'black', marginTop: 20,marginRight:30, alignSelf: "center"}}>Total Earnings</Text>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24, color: 'black', marginTop: 20,marginLeft:30, alignSelf: "center" }}>$ {total-amount}</Text>
        </View>
        <View style={{ height:0.5 ,backgroundColor:'#8E8E8E',marginTop:20,marginHorizontal:20}}/>
        <TouchableOpacity onPress={() => {
                            navigation.navigate('TransactionList')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, margin: 16 }}>Transaction History</Text>
                        </TouchableOpacity>

      </SafeAreaView>
      {loading && <Loader />}

    </View>
  );
}

export default EarningScreen


