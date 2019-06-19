import React, {Component} from 'react'
import api from "../../services/api";
import {ApiRouteList} from '../../routes'
import PubSub from 'pubsub-js'

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

        api.post(ApiRouteList.changeStatus, {
            id: this.props.id,
            status: this.props.status
        }).then(function (response) {

            if (response.data.error) {
                throw Error(response.data);
            }

            PubSub.publish('task-list-incomplete', response.data.incompleteTask);
            PubSub.publish('task-list-complete', response.data.completeTask);

        })
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