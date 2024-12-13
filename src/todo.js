class Todo {
    constructor(title, description, dueDate, priority, project, completed) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._project = project;
        this._completed = completed;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    get project() {
        return this._project;
    }

    get completed() {
        return this._completed;
    }

    set title(title) {
        this._title = title;
    }

    set description(description) {
        this._description = description;
    }

    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }

    set priority(priority) {
        this._priority = priority;
    }

    set project(project) {
        this._project = project;
    }

    set completed(completed) {
        this._completed = completed;
    }
}

export default Todo;