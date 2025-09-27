import React from 'react';
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native';
import { styles } from '../styles/styles';
import imageReq from '../constants/imageReq';
import fonts from '../constants/fonts';

const { width, height } = Dimensions.get('window');
const Dashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageReq.bgImg2}
        imageStyle={{ opacity: 0.5 }}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={imageReq.food}
              style={{
                width: width,
                height: width,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
            <View>
              <Text style={{ color: '#ff6600' }}>
                UNLINITED PREMIUM RECIPES
              </Text>
            </View>
            <View>
              <Text style={{ fontFamily: fonts.M_Medium, fontSize: 50 }}>
                Start{'\n'}Cooking...
              </Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <View style={styles.buttonView}>
                <Text
                  style={{ textAlign: 'center', fontFamily: fonts.M_Medium }}
                >
                  Start Cooking
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Dashboard;
