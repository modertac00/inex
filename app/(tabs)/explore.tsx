import {  StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
      <View className="flex-1" style={styles.titleContainer}>
        <Text className="text-lg font-bold text-white">Explore</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginTop: 50,
  },
});
