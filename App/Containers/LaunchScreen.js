import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CardList from './CardList';

// Styles
import styles from './Styles/LaunchScreenStyles';
import {connect} from 'react-redux';
import GameActions from '../Redux/GameRedux';

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {level} = this.props;
    const score = level * 10;

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Text style={styles.sectionText}>Memory Game</Text>
          </View>
          <View style={styles.centered}>
            <View>
              <Text style={styles.sectionText}>Level</Text>
              <Text style={styles.sectionText}>{level}</Text>
            </View>
            <View>
              <Text style={styles.sectionText}>Score</Text>
              <Text style={styles.sectionText}>{score}</Text>
            </View>
          </View>
          <View>
            <CardList />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({
  game: {
    gameConfig: {level},
  },
}) => ({
  level,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  {},
)(LaunchScreen);
