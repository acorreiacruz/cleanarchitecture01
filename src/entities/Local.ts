export default class Local {
    constructor(private latitude: number, private longitude: number) {
        if (!this.isValidLatitude(latitude)) throw Error("Invalid latitude value !");
        if (!this.isValidLongitude(longitude)) throw Error("Invalid longitude value !");
    }

    isValidLatitude(value: number) {
        return value <= 90 && value >= -90;
    }

    isValidLongitude(value: number) {
        return value <= 180 && value >= -180;
    }

    updateLocal(newLatitude?: number, newLongitude?: number) {
        if (newLatitude && !this.isValidLatitude(newLatitude)) {
            throw Error("Invalid latitude value !");
        }
        if (newLongitude && !this.isValidLongitude(newLongitude)) {
            throw Error("Invalid longitude value !");
        }
        this.latitude = newLatitude || this.latitude;
        this.longitude = newLongitude || this.longitude;
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }
}
