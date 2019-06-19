import React, {Component} from 'react'
import TaskItem from './Task-item'
import api from "../../services/api";
import {ApiRouteList} from '../../routes'
import PubSub from 'pubsub-js'
import {notify, ToastContainerCustom} from "../Notification/Notify"
import Timer from '../Timer/Countdown'

class Tasks extends Component {

    constructor() {
        super()

        this.state = {
            tasks: [],
            completedTasks: [],
            task: ''
        }

        this.handleNameTask = this.handleNameTask.bind(this);
        this.saveTask = this.saveTask.bind(this);

    }

    loadTasks() {
        api.get(ApiRouteList.tasks)
            .then(function (response) {
                if (response.data.error) {
                    throw Error(response.data);
                }

                this.setState({
                    tasks: response.data.content
                })

                notify({
                    msg: 'Tenham um dia muito produtivo :)',
                    time: 3000
                })

            }.bind(this))
            .catch(function (error) {
                console.log('CATCH');
                console.log(error);

                notify({
                    status: 'error',
                    msg: 'Ocorreu um erro ao carregar suas tarefas',
                    time: 3000
                })

            });

        api.get(ApiRouteList.completedTasks)
            .then(function (response) {
                if (response.data.error) {
                    throw Error(response.data);
                }
                this.setState({
                    completedTasks: response.data.content
                })
            }.bind(this))
            .catch(function (error) {
                console.log('CATCH');
                console.log(error);

                notify({
                    status: 'error',
                    msg: 'Ocorreu um erro ao carregar suas tarefas',
                    time: 3000
                })
            });
    }

    saveTask(e) {
        e.preventDefault();

        api.post(ApiRouteList.saveTask, {
            task: this.state.task
        })
            .then(function (response) {

                if (response.data.error) {
                    throw response;
                }

                this.setState({
                    tasks: response.data.tasks,
                    task: ''
                })

            }.bind(this))
            .catch(function (error) {
                console.log('CATCH');
                console.log(error.data.content);

                notify({
                    status: 'error',
                    msg: 'Ocorreu um erro ao carregar suas tarefas',
                    time: 3000
                })

            });

    }

    handleNameTask(e) {
        this.setState({
            task: e.target.value
        })
    }

    componentDidMount() {
        this.loadTasks();

        PubSub.subscribe('task-list-incomplete', function (index, data) {
            this.setState({
                tasks: data
            })
        }.bind(this));

        PubSub.subscribe('task-list-complete', function (index, data) {
            this.setState({
                completedTasks: data
            })
        }.bind(this));

    }

    render() {
        return (
            <div>

                <Timer/>

                <form className="form-add-task" onSubmit={this.saveTask}>
                    <input type="text" name='task' value={this.state.task} onChange={this.handleNameTask}/>
                    <button type='submit'> +</button>
                </form>

                <ul className="tasks">

                    {
                        this.state.tasks.map(function (task) {
                            return (
                                <TaskItem key={task.id} id={task.id} status={task.status}
                                          description={task.description}/>
                            )
                        })
                    }

                </ul>
                <hr/>
                <h2>Completas</h2>
                <ul className="tasks completed">

                    {
                        this.state.completedTasks.map(function (task) {
                            return (
                                <TaskItem key={task.id} id={task.id} status={task.status}
                                          description={task.description}/>
                            )
                        })
                    }

                </ul>

                <ToastContainerCustom/>

            </div>
        )
    }

}

export default Tasks