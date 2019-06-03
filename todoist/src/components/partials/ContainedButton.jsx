import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class ContainedButtons extends Component{
    render () {
        return (
            <Button type="submit" variant="contained" color={this.props.color} >{this.props.text}</Button>
        );
    }
}