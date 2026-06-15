export function addPhoneNumberPrefix(identifier: string): string {
    const value = identifier?.trim() || ''
    if (value && !value.includes('@') && !value.startsWith('+88')) {
        return `+88${value}`
    }
    return value
}
