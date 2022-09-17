export function secondsToHms(d: number): string {
    d = Number(d);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    return m + ":" + s;
}
