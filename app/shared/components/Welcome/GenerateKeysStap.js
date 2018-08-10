import ecc from 'tcjs-ecc';
import React, { Component } from 'react';
import { Button, Segment, Message, Image, Input } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import logo from '../../../renderer/basic/tc.png';

class GenerateKeysStep extends Component<Props> {
  constructor() {
    super();
    this.state = {
      keysEquals: false,
      publicKey: '',
      privateKey: '',
      confirmPrivateKey: ''
    };
  }

  componentDidMount() {
    ecc.randomKey().then(privateKey => {
      const publicKey = ecc.privateToPublic(privateKey);
      console.log('Private Key:\t', privateKey); // wif
      console.log('Public Key:\t', publicKey); //

      this.setPublicKeys(publicKey);

      return this.setState({
        privateKey,
        publicKey
      });
    }).catch(error => console.log(error));
  }

  setPublicKeys = (publicKey) => {
    localStorage.setItem('publicKey', publicKey);
  }
  onChange = ({ target: { value } }) => {
    this.setState({
      confirmPrivateKey: value,
      keysEquals: this.state.privateKey === value
    });
  }

  render() {
    const { t, backHandler, onSuccess: nextStep } = this.props;
    const { keysEquals, privateKey, confirmPrivateKey } = this.state;

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
          Stage #2: Access key <br />
          Save your password, it cannot be restored.
        </p>

        <Input value={privateKey} placeholder="Generating..." readOnly fluid />
        <br />
        <Input value={confirmPrivateKey} onChange={this.onChange} placeholder="Confirm key" fluid />

        <Message
          color="red"
          compact
          size="mini"
          className="registration-page__info-message warning"
          content={(
            <p style={{ fontSize: '15px', textAlign: 'center' }}>
              ВНИМАНИЕ! Ключ доступа НЕ может быть
              <br />
              восстановлен в случае утери. Убедитесь, что вы
              <br />
              сохранили Ключ Доступа.
              <br />
              Не передавайте Ключ Доступа никому, это может
              <br />
              повлечь безвозвратную потерю всех средств
              <br />
              аккаунта.
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
          <Button
            content={t('continue')}
            disabled={!keysEquals}
            onClick={nextStep}
            size="small"
            style={{ marginTop: '1em' }}
          />
        </div>
      </Segment>
    );
  }
}
export default translate('GenerateKeysStep')(GenerateKeysStep);
