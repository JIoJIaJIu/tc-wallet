import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import { Button, Container, Segment, Message, Image, Input, Form } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import logo from '../../../renderer/basic/tc.png';
import axios from 'axios';

class RegistrationPage extends Component<Props> {
  constructor() {
    super();
    this.state = {
      account: '',
      isValid: false
    };
  }


  submit = (e) => {
    // const { isValid }
  }

  handleInput = async ({ target: { value } }) => {
    try {
      const response = await axios.get('http://eost.travelchain.io/v1/chain/get_account', {
        params: {
          account_name: 'eosio'
        }
      });
      console.log(response, 'response');
    } catch (e) {
      console.log(e);
    }
    // const isValid = /^[a-z0-5]{0,12}$/.test(value);
    // console.log(isValid);
    // isValid && this.setState({ 
    //   account: value,
    //   isValid: true
    // }) 
    // || this.setState({ isValid: false });
  }

  accountInputMask = (value = '') => {
    const MAX_SIZE = 12;
    const rawValue = value.replace(/\s/, '').replace('.tc', '');
    const length = rawValue.length > MAX_SIZE ? MAX_SIZE : rawValue.length;
    const mask = Array.apply(null, new Array(length)).map((() => /[a-z0-5]/));
    return mask;
  }

  appendWithSuffix = (conformedValue) => {
    const indexedOfPipedChars = [];
    const suffix = '.tc';
    const appendedValue = `${conformedValue}${suffix}`;
    suffix.split('').forEach((item, index) => {
      indexedOfPipedChars.push(appendedValue.indexOf(suffix) + index);
    });
    return {
      value: `${conformedValue}${suffix}`,
      indexedOfPipedChars
    };
  }

  render() {
    const { t, onStageSelect } = this.props;
    const { isValid } = this.state;
    const { account } = this.state;
    const isLoading = false;

    const message = (
      <Message
        color="blue"
        compact
        size="mini"
        className="registration-page__info-message"
        content={(
          <p style={{ fontSize: '15px', textAlign: 'center' }}>
            К регистрации допускаются имена аккаунтов, содержащие только следующие символы:
            <br />
            <strong>12345.abcdefghijklmnopqrstuvwxyz</strong>
            <br />
            <br />
            Имя аккаунта не должно превышать 12 символов.
          </p>
        )}
        info
      />
    );
    const Logo = (
      <Image style={{ textAlign: 'center', margin: '20px auto' }} src={logo} width="120" alt="Greymass" />
    );

    const maskedInput = (
      <MaskedInput
        guide={false}
        mask={this.accountInputMask}
        pipe={this.appendWithSuffix}
        onChange={this.handleInput}
        placeholder="Enter an account name"
      />
    );

    return (
      <Segment
        className="registration-page"
        size="huge"
        stacked
      >
        Register
        {Logo}
        <p style={{ fontSize: '16px' }}>
          Stage #1: Account <br />
          Enter the desired username
        </p>
        <div className={'ui tiny fluid icon input ' + (isLoading ? 'loading' : '')}>
          {maskedInput}
          <i aria-hidden="true" className="user icon" />
        </div>
        {message}
        <div className="login-page__controls-wrapper">
          <Button
            content={t('back')}
            icon="arrow left"
            onClick={() => onStageSelect(0)}
            size="small"
            style={{ marginTop: '1em' }}
          />
          <Button
            content={t('continue')}
            disabled={!isValid}
            onClick={this.submit}
            size="small"
            style={{ marginTop: '1em' }}
          />
        </div>
      </Segment>
    );
  }
}

export default translate('registration')(RegistrationPage);
