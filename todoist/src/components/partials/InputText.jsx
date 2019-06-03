import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField/index';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'blue',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'blue',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'blue',
            },
        },
    },
})(TextField);

export default class InputText extends Component{
    render () {
        return(
            <CssTextField label={this.props.label} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
        )
    }
}