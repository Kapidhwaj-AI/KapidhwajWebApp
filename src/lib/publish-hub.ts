import dnssd from 'dnssd';

let isPublished = false;

export function startAIPublisher() {
    if (isPublished) return;
    isPublished = true;

    console.log("📡 Publishing Simulated AI Hub...");

    const ad = new dnssd.Advertisement(dnssd.ServiceType.tcp('http'), 4000, {
        name: 'Simulated AI Hub',
        txt: {
            model: 'v1.0',
            location: 'Lab'
        }
    });

    ad.on('error', (err) => {
        console.error("❌ Publish error:", err);
    });

    ad.start();
}