import 'react-phone-number-input/style.css';
import axios from 'axios';
import compose from 'lodash/fp/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Button, Segment, Message, Image, Input } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import logo from '../../../renderer/basic/tc.png';
import * as SettingsActions from '../../actions/settings';
import * as WalletActions from '../../actions/wallet';
import { withRouter } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import PhoneInput from 'react-phone-number-input'
import { parseNumber, formatNumber, isValidNumber } from 'libphonenumber-js'
import Noty from 'noty';
var NotificationSystem = require('react-notification-system');

class ConfirmPhoneNumber extends Component<Props> {
  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      smsCode: undefined,
      isSMSsent: false,
      isTouched: false
    }
  }

  notificationSystem: null


  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  onChange = (event, { name, value }) => {
    name === 'phoneNumber' ? this.setState({ isSMSsent: false, isTouched: true }) : '';
    this.setState({
      [name]: value
    });
  }

  sendSMS = async () => {
    this.setState({ isSMSsent: true });
    const { phoneNumber } = this.state;
    try {
      await axios.post('https:///f.travelchain.io/api/pass-code/', {
        number: phoneNumber
      });
    } catch (e) {
      this.notificationSystem.addNotification({
        message: Object.values(e.response.data)[0][0],
        level: 'error'
      });
     
    }
  }

  signUp = async () => {
    const { smsCode, phoneNumber } = this.state;
    const { account, actions, history } = this.props;
    const {
      setSetting,
      setTemporaryKey
    } = actions;
    try {
      await axios.post('https://f.travelchain.io/api/account/', {
        account,
        owner_pub: localStorage.getItem('publicKey'),
        active_pub: localStorage.getItem('publicKey'),
        number: phoneNumber,
        passcode: smsCode
      });

      setSetting('walletTemp', true);
      // setTemporaryKey(localStorage.getItem('publicKey'));
      history.push('/voter');
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { t, backHandler } = this.props;
    const { phoneNumber, smsCode, isSMSsent, isTouched } = this.state;

    const Logo = (
      <Image style={{ textAlign: 'center', margin: '20px auto' }} src={logo} width="120" alt="Greymass" />
    );

    return (
      <Segment
        className="registration-page"
        size="huge"
        stacked
      >
        <NotificationSystem ref="notificationSystem" />
        Register
        {Logo}
        <p style={{ fontSize: '16px' }}>
          Stage #3: Confirm your phone <br />
        </p>
        {/* <Cleave
          name="phoneNumber"
          placeholder="Enter your phone number"
          options={{ phone: true, phoneRegionCode: 'RU' }}
          onChange={this.onChange}
        /> */}
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={value => this.onChange(null, { name: 'phoneNumber', value })}
        />
        {phoneNumber && !isValidNumber(phoneNumber) ? <p className="phoneNumber-error">Invalid phone number</p> : <br />}
        {/* <Input placeholder="Enter your phone number" name="phoneNumber" value={phoneNumber} onChange={this.onChange} fluid /> */}
        {/* { phoneNumber && isValidNumber(phoneNumber) ? <br /> : null } */}
        <Input placeholder="SMS Code" name="smsCode" value={smsCode} onChange={this.onChange} fluid />

        <Message
          color="green"
          compact
          size="mini"
          className="registration-page__info-message warning"
          content={(
            <p style={{ fontSize: '15px', textAlign: 'center' }}>
              {t('welcome:welcome_every_account_get')}
            </p>
          )}
          info
        />

        <div className="login-page__controls-wrapper">
          <Button
            content={t('back')}
            icon="arrow left"
            onClick={backHandler}
            size="small"
            style={{ marginTop: '1em' }}
          />

          {isSMSsent ? (
            <div>
            <Button
              content={t('send sms')}
              disabled={!isValidNumber(phoneNumber || '')}
              onClick={this.sendSMS}
              size="small"
              style={{ marginTop: '1em' }}></Button>

            <Button
              content={t('verify')}
              disabled={!this.state.smsCode}
              onClick={this.signUp}
              size="small"
              style={{ marginTop: '1em' }}
            />
            </div>
          ) : (
            <Button
              content={t('send sms')}
              disabled={!isValidNumber(phoneNumber || '')}
              onClick={this.sendSMS}
              size="small"
              style={{ marginTop: '1em' }}
            />
          )}
        </div>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    keys: state.keys,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
      ...WalletActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(ConfirmPhoneNumber);
