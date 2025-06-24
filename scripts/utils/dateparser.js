export function formatDate(dateString) {
    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);

    // Convert "March 3, 2025" to "March 3rd 2025"
    formattedDate = formattedDate.replace(/(\d+)(?=(st|nd|rd|th)?\,)/, (match, num) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = num % 100;
        const suffix = (v > 3 && v < 21) ? "th" : suffixes[v % 10] || "th";
        return num + suffix;
    }).replace(',', ''); // Remove the comma between day and year

    return formattedDate;
}