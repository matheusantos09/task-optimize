import React, {Component} from 'react'
import MasterLayout from "../../components/layouts/Master";
import {Grid} from "@material-ui/core"
import Table from '@material-ui/core/Table';
import {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import api from "../../services/api";
import {ApiRouteList} from "../../routes";
import {notify} from "../../components/Notification/Notify";
import {Check, Close} from "@material-ui/icons"

class Tasks extends Component {

    componentDidMount() {
        api.get(ApiRouteList.tasksList)
            .then(function (response) {
                if (response.data.error) {
                    throw response;
                }
                this.setState({
                    rows: response.data.content
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

    constructor(props) {
        super(props);


        this.state = {
            filterText: '',
            rows: []
        };

    }

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    }

    handleRowDel(row) {

        api.delete(ApiRouteList.taskDestroy + '?id=' + row.id)
            .then((response) => {

                if (response.data.error) {
                    throw response;
                }

                var index = this.state.rows.indexOf(row);
                this.state.rows.splice(index, 1);
                this.setState(this.state.rows);

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

    };

    // handleAddEvent(evt) {
    //
    //     var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    //
    //     var row = {
    //         id: id,
    //         status: "",
    //         description: "",
    //         created_at: "",
    //         conclusion_date: 0
    //     }
    //
    //     this.state.rows.push(row);
    //     this.setState(this.state.rows);
    //
    // }

    handleRowsTable(evt) {

        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };

        var rows = this.state.rows.slice();

        var newRows = rows.map(function(row) {

            for (var key in row) {
                if (key === item.name && row.id === item.id) {
                    row[key] = item.value;

                }
            }
            return row;
        });

        this.setState({
            rows: newRows
        });
    };

    render() {
        return (
            <MasterLayout>

                <Paper>
                    <Grid container spacing={5}>

                        <Grid item xs={12} md={12} lg={12}>
                            <SearchBar
                                filterText={this.state.filterText}
                                onUserInput={this.handleUserInput.bind(this)}
                            />
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>

                            <div className="table-responsive">
                                <ProductTable
                                    onProductTableUpdate={this.handleRowsTable.bind(this)}
                                    // onRowAdd={this.handleAddEvent.bind(this)}
                                    onRowDel={this.handleRowDel.bind(this)}
                                    rows={this.state.rows}
                                    filterText={this.state.filterText}
                                />
                            </div>

                        </Grid>

                    </Grid>

                </Paper>
            </MasterLayout>
        )
    }

}

class SearchBar extends Component {

    handleChange() {
        this.props.onUserInput(this.refs.filterTextInput.value);
    }

    render() {
        return (
            <div className="search-table">

                <FormGroup>
                    <FormControl>
                        <input
                            className="input-search"
                            type="text"
                            placeholder="Buscar Tarefa..."
                            value={this.props.filterText}
                            ref="filterTextInput"
                            onChange={this.handleChange.bind(this)}
                        />
                    </FormControl>
                    {/*<FormControl>*/}
                    {/*    <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>*/}
                    {/*</FormControl>*/}
                </FormGroup>

            </div>

        );
    }

}

class ProductTable extends Component {

    render() {
        var onProductTableUpdate = this.props.onProductTableUpdate;
        var rowDel = this.props.onRowDel;
        var filterText = this.props.filterText;

        var row = this.props.rows.map(function(row) {

            if (row.description.indexOf(filterText) === -1) {
                return '';
            }

            return (
                <ProductRow
                    onProductTableUpdate={onProductTableUpdate}
                    row={row}
                    onDelEvent={rowDel.bind(this)}
                    key={row.id}
                />
            )
        });

        return (
            <Table size="medium" className="table">
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Criado em</TableCell>
                        <TableCell>Concluído em</TableCell>
                        <TableCell align={"center"}>Remover</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {row}

                </TableBody>

            </Table>
        );

    }

}

class ProductRow extends Component {

    onDelEvent() {
        this.props.onDelEvent(this.props.row);

    }

    convertDate(date) {

        let dateExplode = date.split(' ')
        let newDateDays = dateExplode[0]
        let newDateHours = dateExplode[1]

        newDateDays = newDateDays.split('-')

        return newDateDays[2]+ '/' + newDateDays[1] + '/' + newDateDays[0] + ' ' + newDateHours
    }

    convertStatus(status) {
        switch (status) {
            case 'C':{
                return <Check color={"primary"}/>
            }

            case 'I': {
                return <Close color={"secondary"}/>
            }

            default: {
                return 'Não especificada'
            }
        }
    }

    render() {

        return (
            <TableRow className="eachRow">
                <EditableCell
                    notInput={true}
                    onProductTableUpdate={this.props.onProductTableUpdate}
                    cellData={{
                        "type": "status",
                        value: this.convertStatus(this.props.row.status),
                        id: this.props.row.id
                    }}
                />
                <EditableCell
                    notInput={true}
                    onProductTableUpdate={this.props.onProductTableUpdate}
                    cellData={{
                        type: "description",
                        value: this.props.row.description,
                        id: this.props.row.id
                    }}
                />
                <EditableCell
                    notInput={true}
                    onProductTableUpdate={this.props.onProductTableUpdate}
                    cellData={{
                        type: "created_at",
                        value: this.props.row.created_at ? this.convertDate(this.props.row.created_at) : '-',
                        id: this.props.row.id
                    }}
                />
                <EditableCell
                    notInput={true}
                    onProductTableUpdate={this.props.onProductTableUpdate}
                    cellData={{
                        type: "conclusion_date",
                        value: this.props.row.conclusion_date ? this.convertDate(this.props.row.conclusion_date) : '-',
                        id: this.props.row.id
                    }}
                />
                <TableCell className="del-cell" align={"center"}>
                    <label>
                        <Close/>
                        <input type="button" onClick={this.onDelEvent.bind(this)} className="del-btn"/>
                    </label>
                </TableCell>
            </TableRow>
        );

    }

}
class EditableCell extends Component {

    render() {
        return (
            <TableCell>
                {this.props.notInput ?

                    <div className="table-cell-tasks">
                        {this.props.cellData.value}
                    </div>

                    :

                    <input
                        type='text'
                        name={this.props.cellData.type}
                        id={this.props.cellData.id}
                        value={this.props.cellData.value}
                        onChange={this.props.onProductTableUpdate}
                    />

                }

            </TableCell>
        );

    }

}

export default Tasks