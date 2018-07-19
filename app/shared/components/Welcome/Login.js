import React, { Component } from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class LoginPage extends Component<Props> {
  onLogin = () => {
    const { onStageSelect } = this.props;
    const ACCOUNT_PAGE = 2;
    if (onStageSelect) {
      onStageSelect(ACCOUNT_PAGE);
    }
  }

  onRegister = () => {
    const { onStageSelect } = this.props;
    const REGISTRATION_PAGE = 1;
    if (onStageSelect) {
      onStageSelect(REGISTRATION_PAGE);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Segment
        className="login-page"
        size="huge"
        stacked
      >
        <Container className="login-page__controls-wrapper">
          <Button
            content={t('login')}
            onClick={this.onLogin}
            primary
            size="small"
            style={{ marginTop: '1em' }}
          />
          <Button
            content={t('register')}
            onClick={this.onRegister}
            primary
            size="small"
            style={{ marginTop: '1em' }}
          />
        </Container>
      </Segment>
    );
  }
}

export default translate('login')(LoginPage);
