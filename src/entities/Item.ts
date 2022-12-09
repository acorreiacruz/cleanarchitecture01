export default class Item {
    constructor(private _name: string, private _value: number, private _amount: number) {
        if (!Item.isValidName(_name)) throw Error("Invalid name !");
        if (_value <= 0) throw Error("Value should be a positive number !");
        if (_amount < 0) throw Error("Amount can't be a negative number !");
    }

    static isValidName(value: string) {
        const validNames = ["water", "food", "medication", "ammunition"];
        return validNames.find((data) => {
            if (value == data) return true;
        });
    }

    totalPoints() {
        return this._amount * this._value;
    }

    increaseAmount(value: number) {
        if (value < 0) throw Error("Increase value can't be a negative number !");
        this._amount += value;
    }

    decreaseAmount(value: number) {
        if (value < 0) throw Error("Decrease value can't be a negative number !");
        if (this._amount - value > 0) this._amount -= value;
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }

    get amount() {
        return this._amount;
    }
}
