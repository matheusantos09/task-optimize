import React, {Component} from 'react'
import TaskItem from './Task-item'
import api from "../../services/api";
import {ApiRouteList} from '../../routes'

class Tasks extends Component {

    constructor() {
        super()

        this.state = {
            tasks: []
        }

    }

    loadTasks() {
        api.get(ApiRouteList.tasks.path)
            .then(function (response) {
                if (response.data.error) {
                    throw Error(response.data);
                }
                this.setState({
                    tasks: response.data.content
                })
            }.bind(this))
            .catch(function (error) {
                console.log('CATCH');
                console.log(error);
            });
    }

    componentWillMount() {
        this.loadTasks();
    }

    render() {
        return (
            <ul className="tasks">

                {
                    this.state.tasks.map(function (task) {
                        return (
                            <TaskItem key={task.id} id={task.id} status={task.status} description={task.description}/>
                        )
                    })
                }

            </ul>
        )
    }

}

export default Tasks