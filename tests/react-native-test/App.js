import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import icons from './icons.json';
import IconComponent from './components/Icon';

export default function App() {
  let iconsData = [];

  const iconKeys = Object.keys(icons);

  iconKeys.forEach((key, index) => {
    iconsData.push( icons[key] );
    iconsData[index].slug = key;
  })

  return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading1}>React Native Icons Test</Text>
        <Text style={styles.heading2}>Filled Icons</Text>

        <View style={styles.list}>
            { iconsData.map( (value, index) => (
              <View key={index} style={styles.listItem}>
                <IconComponent tag={value.id + 'Icon'} version={'filled'} color={'#ff9500'} size={100} />
                <Text>{value.name}</Text>
                <Text style={styles.code}>{value.id + 'Icon'}</Text>
              </View>
            ))}
        </View>

        <Text style={styles.heading2}>Outline Icons</Text>
        <View style={styles.list}>
          { iconsData.map( (value, index) => (
              <View key={index} style={styles.listItem}>
                <IconComponent tag={value.id + 'Icon'} version={'outline'} color={'#ff9500'} size={100} />
                <Text>{value.name}</Text>
                <Text style={styles.code}>{value.id + 'Icon'}</Text>
              </View>
          ))}
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingBottom: 60,
    paddingLeft: 20,
    paddingRight: 20
  },
  heading1: {
    fontSize: 36,
    textAlign: 'left'
  },
  heading2: {
    fontSize: 24,
    textAlign: 'left'
  },
  code: {
    fontWeight: 'bold'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  listItem: {
    flexBasis: 180,
    padding: 10,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  }
});
