import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import { Button, Container, Segment, Message, Image, Input, Form } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import logo from '../../../renderer/basic/tc.png';

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

  handleInput = ({ target: { value } }) => {
    console.log(value);
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
    const AccountInput = (
      <Input
        error={isValid}
        size="tiny"
        loading
        fluid
        icon="user"
        placeholder="Account"
        onChange={this.handleInput}
      />
    );

    const maskedInput = (
      <MaskedInput
        mask={[/([a-z0-5])/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, /([a-z0-5])?/, '.tc']}
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
            disabled={isValid}
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
