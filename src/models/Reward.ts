export class Reward {
    id: string
    name: string

    constructor(id: string = "", name: string = "") {
        this.id = id;
        this.name = name;
    }

    public static fromData(id: string, name: string) {
        return new Reward(id, name)
    }
}