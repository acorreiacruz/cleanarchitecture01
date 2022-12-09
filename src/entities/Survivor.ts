import Inventory from "./Inventory";
import Local from "./Local";

export default class Survivor {
    private complaints: number;
    private infected: boolean;
    constructor(
        public name: string,
        public age: number,
        public sex: string,
        public local: Local,
        private _inventory: Inventory,
    ) {
        if (!this.validAge(age)) throw Error("Invalid age value !");
        if (!this.validSex(sex)) throw Error("Invalid sex value !");
        this.complaints = 0;
        this.infected = false;
    }

    validSex(value: string) {
        return value === "M" || value === "F";
    }

    validAge(value: number) {
        return value > 0;
    }

    get inventory() {
        return this._inventory;
    }

    isAlive() {
        return !this.infected;
    }

    getComplaints(): number {
        return this.complaints;
    }

    setComplaints(value: number): void {
        this.complaints = value;
    }

    setInfected(value: boolean) {
        this.infected = value;
    }
}
