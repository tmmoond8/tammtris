import React from 'react';
import LobbyContainer from 'containers/LobbyContainer';
import LobbyControlContainer from 'containers/LobbyControlContainer';
import styles from './pages.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LobbyPage = () => {

  return (
    <div className={(cx('lobby-page'))}>
      <LobbyControlContainer/>
      <LobbyContainer/>
    </div>
  )
}

export default LobbyPage;