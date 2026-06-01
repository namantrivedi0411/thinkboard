export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};