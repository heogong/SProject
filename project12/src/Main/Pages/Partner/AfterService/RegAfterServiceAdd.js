import React, { Component } from 'react';
import { Item, Input, Label, Tab, Tabs, Text, Textarea } from 'native-base';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

export default class RegAfterServiceAdd extends Component {

  render() {
    return (
      <CustomBlockWrapper
            title=""
      >
        <Tabs>
          <Tab heading="공임">

            <Item stackedLabel>
              <Label>추가 A/S 내역</Label>
              <Input
                // onChangeText={ this._handleChange }
                // value={ this.state.text }
              />
            </Item>

            <Item stackedLabel>
              <Label>추가 A/S 비용</Label>
              <Input
                // onChangeText={ this._handleChange }
                // value={ this.state.text }
              />
            </Item>

            <Label>추가 A/S 내역</Label>
            <Textarea rowSpan={5} bordered placeholder="Textarea" />

          </Tab>
          <Tab heading="부품교체">
            <Text>bbbbbbbbbbbbbbb</Text>
          </Tab>
        </Tabs>

        <CustomButton onPress={ () => alert("등록완료") }>
            <Text>등록완료</Text>
        </CustomButton>
      </CustomBlockWrapper>
    );
  }
}