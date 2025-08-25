import { NextResponse } from 'next/server';
import dnssd from 'dnssd';
import { ManageHub } from '@/models/settings';
import { startAIPublisher } from '@/lib/publish-hub';

startAIPublisher()
export async function GET() {
    const hubs: ManageHub[] = [];

    const hubsData = await new Promise<ManageHub[]>((resolve, reject) => {
        const browser = new dnssd.Browser(dnssd.tcp('workstation'));

        browser.on('serviceUp', service => {
            const ip = service.addresses?.[0] ?? 'unknown';
            const hub = {
                name: service.name.split(" ")[0],
                physical_address: extractMAC(service.name),
                ip: ip,
                port: service.port,
                txt: service.txt,
            };
            hubs.push(hub);
        });

        browser.on('error', err => {
            console.error("❌ mDNS error:", err);
            browser.stop();
            reject(err);
        });

        browser.start();

        setTimeout(() => {
            browser.stop();
            resolve(hubs);
        }, 15000);
    });

    return NextResponse.json({ hubs: hubsData });

}

function extractMAC(name: string): string | null {
    const match = name.match(/[0-9A-Fa-f]{2}([-:]?)(?:[0-9A-Fa-f]{2}\1){4}[0-9A-Fa-f]{2}/);
    return match?.[0] ?? null;
}
