import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import { Button, Container, Segment, Message, Image, Input, Form } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import logo from '../../../renderer/basic/tc.png';
import axios from 'axios';
import ecc from 'tcjs-ecc'
import GenerateKeysStep from './GenerateKeysStap';
import ConfirmPhoneNumber from './ConfirmPhoneNumber';

class RegistrationPage extends Component<Props> {
  constructor() {
    super();
    this.state = {
      account: '',
      isValid: false,
      step: 1,
      isInputDirty: false,
      isLoading: false
    };
  }


  submit = () => {
    const GENERATE_KEYS_STEP = 2;
    this.setState({ step: GENERATE_KEYS_STEP });
    // const { isValid }
  }

  handleInput = async ({ target: { value } }) => {
    this.setState({ isInputDirty: true, account: value });
    try {
      this.setState({ isLoading: true });
      await axios.post('https://eost.travelchain.io/v1/chain/get_account', {
        account_name: value
      });
      this.setState({ isValid: false });
    } catch (e) {
      this.setState({ isValid: true });
    } finally {
      this.setState({
        isLoading: false
      });
    }
  }

  handleBackAction = () => {
    const { onStageSelect } = this.props;
    if (this.state.step === 1) {
      onStageSelect(0);
    } else if (this.state.step === 2) {
      this.setState({ step: 1 });
    } else if (this.state.step === 3) {
      this.setState({ step: 2 });
    }
  }

  accountInputMask = (value = '') => {
    const MAX_SIZE = 9;
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
    const { account, isInputDirty, isLoading } = this.state;

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

    if (this.state.step === 2) {
      return (
        <GenerateKeysStep
          backHandler={this.handleBackAction}
          onSuccess={() => this.setState({ step: 3 })}
        />
      );
    } else if (this.state.step === 3) {
      return (
        <ConfirmPhoneNumber
          account={this.state.account}
          backHandler={this.handleBackAction}
        />
      );
    }
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

        {!isValid && isInputDirty
          ?
            <p className="input-error">Account name is busy or not valid.</p>
          :
            null
        }
        <div className={'ui tiny fluid icon input ' + (isLoading ? 'loading' : '')}>
          {maskedInput}
          <i aria-hidden="true" className="user icon" />
        </div>
        {message}
        <div className="login-page__controls-wrapper">
          <Button
            content={t('back')}
            icon="arrow left"
            onClick={this.handleBackAction}
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
