import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CardList from './CardList/CardList';

// Styles
import styles from './Styles/LaunchScreenStyles';
import {connect} from 'react-redux';

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
  }

  goToTop = () => {
    this.scroll.scrollTo({x: 0, y: 0, animated: true});
  };

  componentDidUpdate(prevProps, prevState) {
    const {level: previousLevel} = prevProps;
    const {level} = this.props;

    if (level !== previousLevel) {
      this.goToTop();
    }
  }

  render() {
    const {level, score} = this.props;

    return (
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.container}
          ref={c => {
            this.scroll = c;
          }}>
          <View style={styles.heading}>
            <Text style={styles.sectionText}>Memory Game</Text>
          </View>
          <View style={styles.centered}>
            <View style={styles.subHeading}>
              <Text style={styles.scoreText}>Level</Text>
              <Text style={styles.scoreValue}>{level}</Text>
            </View>
            <View style={styles.subHeading}>
              <Text style={styles.scoreText}>Score</Text>
              <Text style={styles.scoreValue}>{score}</Text>
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
    gameConfig: {level, score},
  },
}) => ({
  level,
  score,
});

export default connect(
  mapStateToProps,
  {},
)(LaunchScreen);
