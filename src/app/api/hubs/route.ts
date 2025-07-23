import { NextResponse } from 'next/server';
import dnssd from 'dnssd';
import { ManageHub } from '@/models/settings';
import { startAIPublisher } from '@/lib/publish-hub';

startAIPublisher()
export async function GET() {
    const hubs: ManageHub[] = [];

    return new Promise((resolve, reject) => {
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
            console.log(hub)
            hubs.push(hub);
        });

        browser.on('error', err => {
            console.error("❌ mDNS error:", err);
            reject(NextResponse.json({ error: 'mDNS error' }, { status: 500 }));
        });

        browser.start();

        setTimeout(() => {
            browser.stop();
            resolve(NextResponse.json({ hubs }));
        }, 2000);
    });
}

function extractMAC(name: string): string | null {
    const match = name.match(/[0-9A-Fa-f]{2}([-:]?)(?:[0-9A-Fa-f]{2}\1){4}[0-9A-Fa-f]{2}/);
    return match?.[0] ?? null;
}
