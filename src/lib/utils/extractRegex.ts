export default function extractRegex(body: string, regex: RegExp) {
	return body.match(regex)?.[1];
}
