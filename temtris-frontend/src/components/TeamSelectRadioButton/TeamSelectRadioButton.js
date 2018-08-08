import React, { Component } from 'react';
import styles from './TeamSelectRadioButton.scss';
import classNames from 'classnames/bind';
import { GoFlame } from 'react-icons/go';
import { TiLeaf } from 'react-icons/ti';
import { MdInvertColors, MdFilterVintage } from 'react-icons/md';

const cx = classNames.bind(styles);

class TeamSelectRadioButton extends Component {

    state = {
        select: 'individual'
    }

    isSelected = (item) => this.state.select === item;
    selectItem = (item) => this.setState({ select: item })
    renderItem = ((name, icon) => {
        const { selectItem, isSelected }  = this;
        return (
            <div className={cx('team-select-item')}>
                <div className={cx('team-select-icon', name, {selected: isSelected(name)})}
                    onClick={() => selectItem(name)}>
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

export default TeamSelectRadioButton;