import React, { Component } from 'react';
import styles from './TeamSelectButtons.scss';
import classNames from 'classnames/bind';
import { GoFlame } from 'react-icons/go';
import { TiLeaf } from 'react-icons/ti';
import { MdInvertColors, MdFilterVintage } from 'react-icons/md';

const cx = classNames.bind(styles);

class TeamSelectButtons extends Component {
    renderItem = ((name, icon) => {
        const { onChangeTeam, isSelected }  = this.props;
        return (
            <div className={cx('team-select-item')}>
                <div className={cx('team-select-icon', name, {selected: isSelected(name)})}
                    onClick={() => onChangeTeam(name)}>
                    {icon}
                </div>
            </div>
        )
    })

    render() {
        const { renderItem } = this;
        return (
            <div className={cx('team-select-radio-button')}>
                {renderItem('individual', <MdFilterVintage/>)}
                {renderItem('red', <GoFlame/>)}
                {renderItem('green', <TiLeaf/>)}
                {renderItem('blue', <MdInvertColors/>)}
            </div>
        )
    }
};

export default TeamSelectButtons;