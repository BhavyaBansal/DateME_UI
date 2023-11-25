import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  Pressable,
  Animated,
} from 'react-native';
import {useState, useRef} from 'react';
import Colors from '../constants/colors';
import Users from '../constants/users';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
function HomeScreen() {
  const [active, setActive] = useState(0);
  const [bookmarkk, setBookmark] = useState(false);
  const [like, setLike] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  function setBookmarkValue() {
    setBookmark(!bookmarkk);
  }
  function setLikedValue() {
    setLike(!like);
  }
  function setVisibility() {
    setIsVisible(!isVisible);
    if (isVisible === false) {
      fadeIn();
    } else {
      fadeOut();
    }
  }
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  const scrollViewRef = useRef(null);
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled
        // alwaysBounceHorizontal={true}
        showsHorizontalScrollIndicator={true}
        style={styles.outerContainer}>
        {Users.users.map(user => (
          <View key={user.id} style={styles.imageContainer}>
            <Image
              source={{
                uri: user.image,
              }}
              style={styles.imageStyle}></Image>
            <View style={styles.imageText}>
              <Text
                style={[styles.textStyle, {fontSize: 24, fontWeight: 'bold'}]}>
                {user.name}, {user.age}
              </Text>
              <Text style={styles.textStyle}>{user.location}</Text>
              <View style={styles.iconsContainer}>
                <Pressable onPress={setLikedValue} style={styles.iconContainer}>
                  {like === true ? (
                    <AntDesign
                      name="heart"
                      size={25}
                      color="white"
                      style={styles.bookmark}></AntDesign>
                  ) : (
                    <AntDesign
                      name="hearto"
                      size={25}
                      color="white"
                      style={styles.bookmark}></AntDesign>
                  )}
                </Pressable>
                <Pressable
                  onPress={setBookmarkValue}
                  style={styles.iconContainer}>
                  {bookmarkk === true ? (
                    <FontAwesome
                      name="bookmark"
                      size={25}
                      color="white"
                      style={styles.bookmark}></FontAwesome>
                  ) : (
                    <FontAwesome
                      name="bookmark-o"
                      size={25}
                      color="white"
                      style={styles.bookmark}></FontAwesome>
                  )}
                </Pressable>
              </View>
            </View>
            <View style={styles.superLikeContainer}>
              <Pressable
                onPress={setVisibility}
                android_ripple={{color: '#e5e0e8', borderless: true}}>
                <MaterialIcons
                  name="hexagon"
                  size={45}
                  color="white"></MaterialIcons>
              </Pressable>
            </View>
            <Animated.View
              style={[
                styles.fadingContainer,
                {
                  // Bind opacity to animated value
                  opacity: fadeAnim,
                  position: 'absolute',
                  left: WIDTH * 0.1,
                  top: WIDTH * 0.3,
                },
              ]}>
              <Image
                source={{
                  uri: 'https://www.jtwo.tv/wp-content/uploads/2017/06/Tinder-its-a-match-typography-aiga.png',
                }}
                style={styles.animatedImage}></Image>
            </Animated.View>
            <View style={styles.otherIcons}>
              <AntDesign name="user" size={35} color="white"></AntDesign>
              <Feather name="settings" size={35} color="white"></Feather>
              <AntDesign name="message1" size={35} color="white"></AntDesign>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: Colors.green300,
  },
  outerContainer: {
    // height: WIDTH*1.2,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer: {width: WIDTH * 0.95, height: WIDTH * 1.5, margin: 10},
  imageText: {
    position: 'absolute',
    top: WIDTH * 1.25,
    left: 15,
  },
  textStyle: {
    color: Colors.white,
    letterSpacing: 1,
  },
  iconContainer: {
    marginTop: 10,
    marginRight: 10,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  superLikeContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: Colors.brown200,
    right: 15,
    top: WIDTH * 1.32,
    borderRadius: 100,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    // borderRadius: 10,
  },
  otherIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
export default HomeScreen;
