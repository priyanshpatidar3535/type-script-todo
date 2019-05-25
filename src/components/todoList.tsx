import React, { Component } from 'react';
import '../App.css';
import { Button, Modal } from 'react-bootstrap';

class TodoList extends Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            show: false,
            taskStatus: false,
            title: "",
            description: "",
            tasks: []
        };
    }
    public handlesubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.setState({
            show: false,
            taskStatus: false,
            title: "",
            description: "",
            tasks: [
                ...this.state.tasks,
                {
                    id: this._timeInMilliseconds(),
                    titleValue: this.state.title,
                    descriptionValue: this.state.description,
                    completed: false
                }
            ]
        })
    }

    public toggleDone(id: number): void {

        let mTask: Array<ITask> = this.state.tasks;
        this.state.tasks.map((task: ITask, index: number) => {
            if (task.id === id) {
                mTask[index].id = task.id;
                mTask[index].titleValue = task.titleValue;
                mTask[index].completed = !task.completed;
            }
        });

        const tasks: ITask[] = mTask;
        this.setState({ tasks })

    }
    public addTask(): void {
        this.setState({ taskStatus: true })
    }

    public deleteTask(id: number): void {
        const filteredTaks: Array<ITask> = this.state.tasks.filter(
            (task: ITask) => task.id !== id
        );
        this.setState({ tasks: filteredTaks });
    }


    public renderTasks(): JSX.Element[] {

        return this.state.tasks.map((task: ITask, index: number) => {
            return (

                <thead key={task.id}>
                    <tr>
                        <th>{task.titleValue}</th>
                        <th>{task.descriptionValue}</th>
                        <th> <Button variant="danger" className="button-margin operation-button" onClick={() => this.deleteTask(task.id)}>Delete</Button>
                            <Button className="button-margin operation-button" onClick={() => this.toggleDone(task.id)}>{task.completed ? "undo" : "complete"}</Button>
                        </th>
                    </tr>
                </thead>

            )
        });
    }

    public handleClose(): void {
        this.setState({ show: false });
    }

    public handleShow(): void {
        this.setState({ show: true });
    }
    public render(): JSX.Element {
        return (
            <div className="container" >
                <h1 className="">React type script todo list</h1>
                <Button variant="primary" onClick={() => this.handleShow()}>
                    Add Task
               </Button>

                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => this.handlesubmit(e)}>
                            <input className="add-task form-control" type="text" placeholder="Title"
                                value={this.state.title}
                                onChange={e => this.setState({ title: e.target.value })}></input> <br />

                            <input className="add-task  form-control" type="text" placeholder="Description"
                                value={this.state.description}
                                onChange={e => this.setState({ description: e.target.value })}></input> <br />
                            <Button variant="primary" type="submit"> Add Task</Button>
                            <Button variant="secondary" onClick={() => this.handleClose()}>Close </Button>
                        </form>
                    </Modal.Body>
                </Modal>

                {this.state.taskStatus ? "" :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th style={{ float: "right", marginRight: "80px" }}>Action</th>
                            </tr>
                        </thead>
                        {this.renderTasks()}
                    </table>
                }
            </div>
        );
    }

    private _timeInMilliseconds(): number {
        const date: Date = new Date();
        return date.getTime();
    }
}

interface IState {
    show: boolean,
    taskStatus: boolean,
    title: string;
    description: string;
    tasks: Array<ITask>;
}

interface ITask {
    id: number,
    titleValue: string,
    descriptionValue: string,
    completed: boolean
}

export default TodoList;
