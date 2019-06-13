import React, {Component} from 'react'
import axios from 'axios'

const urlApi = 'http://127.0.0.1:9999/api';

class TasksItem extends Component {

    constructor() {
        super();
        this.clickTaskItem = this.clickTaskItem.bind(this);
        this.checkTaskComplete = this.checkTaskComplete.bind(this);
    }

    checkTaskComplete() {
        return this.props.status === 'C'
    }

    clickTaskItem() {

        axios.post(urlApi + '/change-task', {
            id: this.props.id,
            status: this.props.status
        }).then(function (response) {
            if (response.data.error) {
                throw Error(response.data);
            }
        }.bind(this))
            .catch(function (error) {
                console.log('CATCH');
                console.log(error);
            });

    }

    render() {
        return (
            <li className="task-item">
                <input type="hidden" value={this.props.status} name="status"/>
                <label htmlFor={this.props.id} className="checkmark-group">
                    <input
                        defaultChecked={this.checkTaskComplete()}
                        type="checkbox"
                        name="task"
                        value={this.props.id}
                        id={this.props.id}
                        onClick={this.clickTaskItem}/>
                    <span className="checkmark"/>
                </label>
                <span className="description">
                    {this.props.description}
                </span>
                <div>
                    <span>EDITAR</span>
                    <span>DELETAR</span>
                </div>
            </li>
        )
    }

}

export default TasksItem