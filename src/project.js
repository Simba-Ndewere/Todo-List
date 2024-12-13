class Project {
    constructor(name, id) {
        this._name = name;
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }
}