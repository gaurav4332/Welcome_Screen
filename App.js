import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

const Data = [
  {
    id: 1,
    image: require("./assets/slide1.png"),
    heading: "Enjoy Protection your Family",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    image: require("./assets/slide2.png"),
    heading: "Register your Dependant",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 3,
    image: require("./assets/slide3.png"),
    heading: "Choose Insurance Package",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 300,
          // justifyContent: 'center',
          // alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 15, color: "#444343", textAlign: "right" }}>
          Skip
        </Text>
        <Image source={item.image} style={styles.imageStyle} />
        <Text style={styles.headingStyle}>{item.heading}</Text>
        <Text style={styles.desStyle}>{item.des}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          onScroll={(e) => {
            setCurrentIndex(
              (
                e.nativeEvent.contentOffset.x / Dimensions.get("window").width
              ).toFixed(0)
            );
          }}
          horizontal
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={Data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <View style={styles.dotContainer}>
          {Data.map((item, index) => (
            <View
              key={String(index)}
              style={{
                height: 10,
                width: 10,
                backgroundColor: currentIndex == index ? "green" : "grey",
                marginLeft: 10,
                borderRadius: 8,
              }}
            ></View>
          ))}
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentIndex == 0 && (
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(currentIndex + 1),
                  ref.current?.scrollToIndex({
                    animated: true,
                    index: parseInt(currentIndex) + 1,
                  });
              }}
              style={{
                backgroundColor: "#03A09D",
                width: "90%",
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Let's Start</Text>
            </TouchableOpacity>
          )}
          {currentIndex > 0 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndex(currentIndex - 1),
                    ref.current?.scrollToIndex({
                      animated: true,
                      index: parseInt(currentIndex) - 1,
                    });
                }}
                style={{
                  backgroundColor: "#03A09D",
                  width: "30%",
                  height: 50,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Perivious</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (Data.length - 1 > currentIndex) {
                    setCurrentIndex(currentIndex + 1),
                      ref.current?.scrollToIndex({
                        animated: true,
                        index: parseInt(currentIndex) + 1,
                      });
                  }
                }}
                style={{
                  backgroundColor: "#03A09D",
                  width: "30%",
                  height: 50,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    height: 250,
    width: "90%",
    alignSelf: "center",
    marginTop: 70,
    resizeMode: "contain",
  },
  headingStyle: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "500",
    fontSize: 22,
    marginTop: 75,
  },
  desStyle: {
    textAlign: "center",
    color: "#444343",
    fontWeight: "500",
    fontSize: 16,
    marginTop: 15,
    lineHeight: 23,
  },
  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
