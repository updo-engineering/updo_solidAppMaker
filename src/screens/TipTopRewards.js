import React from "react";
import { Text, SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const { width, height } = Dimensions.get('window');

const TipTopRewards = (props) => {
    const DATA = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];


    const ProgressItem = ({ item, index }) => {
        return (
            <View style={{ borderColor: "grey", marginLeft: 0.5, borderWidth: 0.27, width: (width * 0.75) / 7.91, height: 50, backgroundColor: index < 2 ? '#00A8E0' : null, opacity: item, borderBottomLeftRadius: index == 0 ? 3 : 0, borderTopLeftRadius: index == 0 ? 3 : 0 }} />
        );
    }

    return (
        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>

            <SafeAreaView>
                <View style={{ flexDirection: "row", marginBottom: 12, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack();
                    }} >
                        <Image style={{ width: 16, height: 16, resizeMode: "contain", marginTop: 20, marginHorizontal: 12 }} source={require("../assets/backBtn.png")} />
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 20, alignSelf: "center", width: '80%', textAlign: "center", color: Colors.blueText }}>My TipTop Rewards</Text>
                </View>
                <View style={{ height: 1, backgroundColor: Colors.blueText }} />

                <Text style={{ marginVertical: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 20, alignSelf: "center", textAlign: "center", color: Colors.blueText }}>TipTop Rewards Dashboard</Text>

                <View style={{ height: 50, width: '100%', overflow: 'hidden', flexDirection: 'row', marginBottom: 3 }}>

                    <FlatList
                        style={{ marginLeft: 4 }}
                        horizontal={true}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={DATA}
                        renderItem={ProgressItem}
                        keyExtractor={item => item.id}
                    />
                    <View style={{ width: 80, borderColor: '#03409D', borderWidth: 2, height: 50, justifyContent: "center", alignItems: "center", marginRight: 4, borderBottomRightRadius: 3, borderTopRightRadius: 3 }}>
                        <Image source={require('../assets/logoSmall.png')} style={{ height: 21, width: 24 }} />
                    </View>
                </View>


                <TouchableOpacity style={styles.btnViewStyle} onPress={() => {

                }} >
                    <Text style={styles.btnTitleStyle}>Claim Reward</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignSelf: "center", height: 100, marginTop: 20 }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Total TipTops</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>1</Text>
                    </View>
                    <View style={{ width: 1, backgroundColor: '#C4C4C4', height: 60, alignSelf: "center" }} />
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Reviews Given</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>1</Text>
                    </View>
                </View>

                <View style={{ width: '60%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4' }} />

                <View style={{ flexDirection: "row", alignSelf: "center", height: 100, marginTop: 20 }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Referrals Accepted</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>0</Text>
                    </View>
                    <View style={{ width: 1, backgroundColor: '#C4C4C4', height: 60, alignSelf: "center" }} />
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Invitations Accepted</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>0</Text>
                    </View>
                </View>
                <View style={{ width: '60%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4' }} />
                <View style={{ flexDirection: "row", alignSelf: "center", height: 80, justifyContent: 'space-between', width: '35%' }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Total</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>2</Text>

                </View>
                <View style={{ width: '60%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4' }} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 20, margin: 20, color: Colors.blueText }}>How it works</Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 14, marginHorizontal: 20, color: 'black' }}>The team at TipTop is excited to introduce our TipTop Rewards program!{'\n\n'}
                    You are empowered to earn points by being an active member of TipTop, from enjoying services to referring future TipToppers.{'\n\n'}
                    Rewards include discounts, free services, and other other bonuses to help you maximize your TipTop experience.{'\n\n'}
                    Stack up points and claim your reward now!</Text>
                <View style={{ width: '90%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4', marginTop: 20,marginBottom: 8}} />
                <View  style={{marginHorizontal:20,height:40}}/>
                <View style={{ width: '90%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4', marginTop: 8 }}/>
                <View  style={{marginHorizontal:20,height:40}}/>
                <View style={{ width: '90%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4', marginTop: 8 }}/>
                <View  style={{marginHorizontal:20,height:40}}/>
            </SafeAreaView>

        </ScrollView>

    );
}

export default TipTopRewards

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical: 20,
        borderRadius: 25,
        justifyContent: "center", elevation: 6,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontFamily: Custom_Fonts.Montserrat_Medium
    }
});
