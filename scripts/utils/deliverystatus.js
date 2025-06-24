import { formatDate } from "./dateparser.js";

export function getDeliveryStatus(deliveryDateString) {
    const deliveryDate = new Date(deliveryDateString);
    const currentDate = new Date();

    // Remove the time part from both dates to compare only the date portion
    deliveryDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const formattedDate = formatDate(deliveryDateString);

    return currentDate >= deliveryDate 
        ? `Arrived on: ${formattedDate}` 
        : `Arriving on: ${formattedDate}`;
}