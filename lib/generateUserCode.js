export function generateUserCode(prefix, fullName) {
    // Extract initials from the fullName
    const initials = fullName
        .split(' ') // Split the full name into names
        .map(name => name[0]) // Take the first letter of each name
        .join('') // Join the initials together
        .toUpperCase(); // Ensure the initials are uppercase

    // Get the current timestamp in seconds since midnight
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    // Combine the components into the unique code
    const uniqueCode = `${prefix}-${initials}-${hours}${minutes}${seconds}${milliseconds}`;

    return uniqueCode;
}
