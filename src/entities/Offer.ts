import Item from "./Item";
import Survivor from "./Survivor";

type OfferItem = {
    itemName: string;
    amount: number;
};

type SurvivorOffers = {
    survivorName: string;
    offers: OfferItem[];
};

export default class Offer {
    public survivorOffers: SurvivorOffers;

    constructor(public survivor: Survivor) {
        if (!survivor.isAlive()) throw Error("A zombie can't trading items!");
        this.survivorOffers = {
            survivorName: survivor.name,
            offers: [],
        };
    }

    offerItem(itemName: string, amount: number): void {
        if (!Item.isValidName(itemName)) throw Error("Invalid item name !");
        if (!this.thereIsEnoughAmount(itemName, amount)) {
            throw Error("There is not enough amount of this item to exchange !");
        }
        this.survivorOffers.offers.push({
            itemName: itemName,
            amount: amount,
        });
    }

    private thereIsEnoughAmount(itemName: string, amount: number): boolean {
        const item = this.survivor.inventory.getItemByName(itemName);
        return item.amount >= amount;
    }

    clearOffers() {
        this.survivorOffers.offers = [];
    }

    totalPoints() {
        let total = 0;
        for (const offer of this.survivorOffers.offers) {
            const item = this.survivor.inventory.getItemByName(offer.itemName);
            total += item.value * offer.amount;
        }
        return total;
    }
}
