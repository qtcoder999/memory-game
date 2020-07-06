import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CardList from './CardList/CardList';
import GameActions from '../Redux/GameRedux';

// Styles
import styles from './Styles/LaunchScreenStyles';
import {connect} from 'react-redux';

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {updateTimer} = this.props;
    this.interval = setInterval(updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  goToTop = () => {
    this.scroll.scrollTo({x: 0, y: 0, animated: true});
  };

  componentDidUpdate(prevProps, prevState) {
    const {level: previousLevel} = prevProps;
    const {level, timeLeft, resetGame, startGame} = this.props;

    if (level !== previousLevel) {
      this.goToTop();
    }
    if (timeLeft === 0) {
      resetGame();
      startGame();
    }
  }

  render() {
    const {level, score, timeLeft} = this.props;
    let minutes = Math.floor(timeLeft / 60000);
    let seconds = ((timeLeft % 60000) / 1000).toFixed(0);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }
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
            <Text style={styles.timeLeftText}>Time Left</Text>
            <Text style={styles.timeLeftValue}>
              {minutes}:{seconds}
            </Text>
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
    gameConfig: {level, score, timeLeft},
  },
}) => ({
  level,
  score,
  timeLeft,
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(GameActions.startGame()),
  resetGame: () => dispatch(GameActions.resetGame()),
  updateTimer: () => dispatch(GameActions.updateTimer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaunchScreen);
