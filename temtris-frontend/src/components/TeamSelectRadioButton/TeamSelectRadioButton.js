import React, { Component } from 'react';
import styles from './TeamSelectRadioButton.scss';
import classNames from 'classnames/bind';
import { GoFlame } from 'react-icons/go';
import { TiLeaf } from 'react-icons/ti';
import { MdInvertColors, MdFilterVintage } from 'react-icons/md';

const cx = classNames.bind(styles);

class TeamSelectRadioButton extends Component {
    render() {
        return (
            <div className={cx('team-select-radio-button')}>
                <div className={cx('team-select-item', 'individual')}><MdFilterVintage/></div>
                <div className={cx('team-select-item', 'red')}><GoFlame/></div>
                <div className={cx('team-select-item', 'green')}><TiLeaf/></div>
                <div className={cx('team-select-item', 'blue')}><MdInvertColors/></div>
            </div>
        )
    }
};

export default TeamSelectRadioButton;