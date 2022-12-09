import Item from "./Item";

export default class Inventory {
    private _items: Item[];
    constructor() {
        this._items = [];
    }

    private itemAlreadyAdded(item: Item) {
        const alreadyAdded = this._items.find((data) => {
            if (data.name == item.name) return true;
            return false;
        });
        return alreadyAdded;
    }

    addItem(item: Item) {
        if (this.itemAlreadyAdded(item)) {
            throw Error("This item has already been added !");
        }
        this._items.push(item);
    }

    totalPoints() {
        let total = 0;
        for (const item of this._items) {
            total += item.totalPoints();
        }
        return total;
    }

    getItemByName(itemName: string) {
        const item = this._items.find((item) => {
            if (item.name == itemName) return item;
        });
        if (!item) throw "There is no item with this name !";
        return item;
    }

    get items() {
        return this._items;
    }
}
