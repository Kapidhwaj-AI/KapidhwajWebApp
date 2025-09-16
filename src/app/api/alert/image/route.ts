export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const filename = searchParams.get("filename") || "download.jpg";

    if (!url) {
        return new Response(JSON.stringify({ error: "Missing image URL" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    try {
        const res = await fetch(url);
        const contentType = res.headers.get("Content-Type") || "image/jpeg";
        const buffer = await res.arrayBuffer();

        return new Response(Buffer.from(buffer), {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}