export default function capitalize(str: string) {
	return `${str.substring(0, 1).toUpperCase()}${str.substring(1).toLowerCase()}`;
}
