/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';

import { 
  Screen, 
  ListView, 
  ImageBackground, 
  Tile, 
  Title, 
  Subtitle, 
  Divider,
  TextInput,
  Examples
} from '@shoutem/ui';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      restaurants: [
        {
          "name": "Gaspar Brasserie",
          "address": "185 Sutter St, San Francisco, CA 94109",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Chalk Point Kitchen",
          "address": "527 Broome St, New York, NY 10013",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Sushi Academy",
          "address": "1900 Warner Ave. Unit A Santa Ana, CA",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Mastergrill",
          "address": "550 Upton Rue, San Francisco, CA 94109",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        }
      ],
    }
  }

  renderRow(restaurant) {
    return (
      <View>
          <Tile>
            <Title styleName="md-gutter-bottom">{restaurant.name}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{restaurant.address}</Subtitle>
          </Tile>
        <Divider styleName="line" />
      </View>
    );
  }

  render() {
    const restaurants = this.state.restaurants;
    return (
      <Screen>
        <TextInput
          placeholder={'Username or email'}
        />
        <ListView
          data={restaurants}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }
}
