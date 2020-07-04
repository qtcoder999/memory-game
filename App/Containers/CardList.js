import React, {Component} from 'react';
import {ScrollView, Text, Image, View} from 'react-native';
import {connect} from 'react-redux';
import Card from './Cards';
import GameActions from '../Redux/GameRedux';
// Styles
import styles from './Styles/LaunchScreenStyles';

class CardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('props in Carlist component', this.props);
  }
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Card />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({game: {cards, currentCard, gameConfig}}) => {
  return {
    cards,
    currentCard,
  };
};

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(GameActions.startGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
