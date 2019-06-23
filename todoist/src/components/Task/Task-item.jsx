import React, {Component} from 'react'
import api from "../../services/api";
import {ApiRouteList} from '../../routes'
import PubSub from 'pubsub-js'
import {Close} from '@material-ui/icons'
import {notify} from "../../components/Notification/Notify";

class TasksItem extends Component {

    constructor() {
        super()
        this.clickTaskItem = this.clickTaskItem.bind(this)
        this.checkTaskComplete = this.checkTaskComplete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this)

        this.state = {
            inputDisabled: true,
            newDescription: ''
        }
    }

    componentDidMount() {
        this.setState({
            newDescription: this.props.description
        })
    }

    loadTasksIncomplete() {
        api.get(ApiRouteList.tasks)
            .then(function (response) {
                if (response.data.error) {
                    throw response;
                }

                PubSub.publish('task-list-incomplete', response.data.content);

            })
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

    loadTaskComplete(){
        api.get(ApiRouteList.completedTasks)
            .then(function (response) {
                if (response.data.error) {
                    throw response;
                }
                PubSub.publish('task-list-complete', response.data.content);
            })
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

    checkTaskComplete() {
        return this.props.status === 'C'
    }

    clickTaskItem() {

        api.post(ApiRouteList.changeStatus, {
            id: this.props.id,
            status: this.props.status
        }).then(function (response) {

            if (response.data.error) {
                throw response;
            }

            PubSub.publish('task-list-incomplete', response.data.incompleteTask);
            PubSub.publish('task-list-complete', response.data.completeTask);

        })
            .catch(function (error) {
                console.log('CATCH');
                console.log(error);
            });

    }

    handleSubmit(e) {
        e.preventDefault()

        api.delete(ApiRouteList.taskDestroy + '?id=' + e.target.id.value)
            .then((response) => {

                if (response.data.error) {
                    throw response;
                }

                this.loadTasksIncomplete()
                this.loadTaskComplete()

                notify({
                    status: 'success',
                    msg: response.data.content,
                    time: 3000
                })

            })
            .catch((error) => {
                console.log('CATCH');
                console.log(error);

                notify({
                    status: 'error',
                    msg: error.data.content,
                    time: 3000
                })

            });

    }

    handleDoubleClick(event){
        if(this.state.inputDisabled){
            this.setState({
                inputDisabled: false
            })
        } else {
            this.setState({
                inputDisabled: true
            })
        }
    }

    handleSubmitEdit(event){
        event.preventDefault()

        api.put(ApiRouteList.taskUpdate + this.props.id, {
            description: `${event.target.newDescription.value}`
        })
            .then(function (response) {

                if (response.data.error) {
                    throw response;
                }

                this.setState({
                    inputDisabled: true
                })

                notify({
                    msg: 'Dados salvos com sucesso',
                    time: 3000
                })

            }.bind(this))
            .catch(function (error) {

                notify({
                    status: 'error',
                    msg: error.data.content,
                    time: 3000
                })

            });
    }

    render() {

        return (
            <li className="task-item">
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

                <form className="edit-task"
                      onSubmit={this.handleSubmitEdit}
                      onDoubleClick={(event) => this.handleDoubleClick(event)}>
                    {
                        this.state.inputDisabled ?
                            <input
                                disabled={true}
                                className="description"
                                name="newDescription"
                                value={this.state.newDescription} />
                            :
                            <input
                                disabled={false}
                                className="description"
                                name="newDescription"
                                onChange={e => this.setState({newDescription: e.target.value})}
                                value={this.state.newDescription} />
                    }
                </form>

                <div className="actions">
                    <span>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <input type="hidden" value={this.props.id} name="id"/>
                            <button><Close/></button>
                        </form>
                    </span>
                </div>
            </li>
        )
    }
}

export default TasksItem