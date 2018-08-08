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


class ConfirmPhoneNumber extends Component<Props> {
  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      smsCode: '',
      isSMSsent: false
    };
  }

  onChange = (event, { name, value }) => {
    name === 'phoneNumber' ? this.setState({ isSMSsent: false }) : '';
    this.setState({
      [name]: value
    });
  }

  sendSMS = () => {
    this.setState({ isSMSsent: true });
    const { phoneNumber } = this.state;
    axios.post('http://localhost:8000/api/pass-code/', {
      number: phoneNumber
    });
  }

  signUp = async () => {
    const { smsCode, phoneNumber } = this.state;
    const { account, actions } = this.props;
    const {
      setSetting,
      setTemporaryKey
    } = actions;

    try {
      await axios.post('http://localhost:8000/api/account/', {
        account,
        owner_pub: localStorage.getItem('publicKey'),
        active_pub: localStorage.getItem('publicKey'),
        number: phoneNumber,
        passcode: smsCode
      });

      setSetting('walletTemp', true);
      setTemporaryKey(localStorage.getItem('publicKey'));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { t, backHandler } = this.props;
    const { phoneNumber, smsCode, isSMSsent } = this.state;

    const Logo = (
      <Image style={{ textAlign: 'center', margin: '20px auto' }} src={logo} width="120" alt="Greymass" />
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
          Stage #3: Confirm your phone <br />
        </p>
        {/* <Cleave
          name="phoneNumber"
          placeholder="Enter your phone number"
          options={{ phone: true, phoneRegionCode: 'RU' }}
          onChange={this.onChange}
        /> */}

        <Input placeholder="Enter your phone number" name="phoneNumber" value={phoneNumber} onChange={this.onChange} fluid />
        <br />
        <Input placeholder="SMS Code" name="smsCode" value={smsCode} onChange={this.onChange} fluid />

        <Message
          color="green"
          compact
          size="mini"
          className="registration-page__info-message warning"
          content={(
            <p style={{ fontSize: '15px', textAlign: 'center' }}>
              Каждый новый аккаунт в сети TravelChain
              <br />
              получает 8 кб оперативной памяти для совершения
              <br />
              операций.
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
            <Button
              content={t('verify')}
              disabled={false}
              onClick={this.signUp}
              size="small"
              style={{ marginTop: '1em' }}
            />
          ) : (
            <Button
              content={t('send sms')}
              disabled={false}
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
  translate('ConfirmPhoneNumber'),
  connect(mapStateToProps, mapDispatchToProps)
)(ConfirmPhoneNumber);
