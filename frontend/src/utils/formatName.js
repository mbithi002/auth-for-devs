export const formatName = (authUser) => {
    const { name } = authUser;
    if (!name) return '';

    const nameParts = name.trim().split(/\s+/);
    const initials = nameParts.map(part => part.charAt(0).toUpperCase());
    return initials.slice(0, 2).join('');
}