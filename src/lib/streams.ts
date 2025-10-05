import type { Stream } from "../types/LiveStream";

export function getStreamConfigs(): Stream[] {
    const streams: Stream[] = [];
    let i = 1;
    while (true) {
        const url = import.meta.env[`VITE_YT_LIVESTREAM_URL_${i}`];
        if (!url) break;
        streams.push({
            id: url.split('/').pop()?.split('?')[0] ?? `${i}`,
            title: `Stream ${i}`,
            url,
        });
        i++;
    }
    return streams;
}