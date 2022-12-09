import Offer from "./Offer";

export default class Exchange {
    constructor(private offer1: Offer, private offer2: Offer) {}
    public perform(): void {
        this.exchangingItems(this.offer1, this.offer2);
        this.exchangingItems(this.offer2, this.offer1);
    }

    private exchangingItems(origin: Offer, destiny: Offer): void {
        for (const offer of origin.survivorOffers.offers) {
            const itemDestiny = destiny.survivor.inventory.getItemByName(offer.itemName);
            itemDestiny?.increaseAmount(offer.amount);
            const itemOrigin = origin.survivor.inventory.getItemByName(offer.itemName);
            itemOrigin?.decreaseAmount(offer.amount);
        }
        origin.clearOffers();
    }
}
