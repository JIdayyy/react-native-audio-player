export function secondsToHms(d: number): string {
    d = Number(d) || 0;
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}
