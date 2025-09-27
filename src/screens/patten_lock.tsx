import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import VectorIcons, { iconsName } from '../components/vetor_icon';
import { styles } from '../styles/styles';
import imageReq from '../constants/imageReq';
import colors from '../constants/colors';
import moment from 'moment';
import Screen_Patten from './patten_';

interface props {
  navigation: any;
}

const PatternLockScreen: React.FC<props> = ({ navigation }) => {
  //

  const [c_time, setC_Time] = useState(moment().format('hh:mm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setC_Time(moment().format('hh:mm'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const day_date = useMemo(() => moment().format('dddd, MMM D'), []);

  const handleNavigate = useCallback(() => {
    navigation.replace('dashboard');
  }, []);

  const handleOpenCemara = () => {};

  const handleFlashLight = () => {};

  return (
    <View style={styles.container}>
      <ImageBackground source={imageReq.bgImg3} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ padding: 20, alignItems: 'center', marginTop: 20 }}>
            <VectorIcons
              name="lock"
              iconType={iconsName.Entypo}
              size={30}
              color={colors.white}
            />
            <Text style={styles.timeTxt}>{c_time}</Text>
            <Text style={[styles.timeTxt, { fontSize: 13 }]}>{day_date}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Screen_Patten handleResponse={handleNavigate} />
          </View>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <BottomIcon
              uri={imageReq.flashlight}
              handlePressed={handleFlashLight}
            />
            <BottomIcon
              uri={imageReq.camera}
              handlePressed={handleOpenCemara}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

interface BottomIconProps {
  uri: any;
  handlePressed?: () => void;
}

const BottomIcon: React.FC<BottomIconProps> = memo(({ uri, handlePressed }) => {
  return (
    <Pressable onPress={handlePressed}>
      <View style={styles.imgIconView}>
        <Image style={styles.imgIcon} source={uri} />
      </View>
    </Pressable>
  );
});

export default PatternLockScreen;
