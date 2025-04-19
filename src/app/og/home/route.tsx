import { ImageResponse } from "next/og";

export const runtime = "edge";

async function loadGoogleFont(font: string, text: string) {
  const url = `https:
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource && resource[1]) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const text = title ? `wica | ${title}` : "wica | home";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #0f172a, #111827, #0f172a)",
          fontFamily: "Geist Mono",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(52, 211, 153, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(52, 211, 153, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.3,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.6,
            filter: "blur(60px)",
          }}
        />

        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              borderRadius: "50%",
              backgroundColor: `rgba(${52 + Math.random() * 30}, ${211 + Math.random() * 30}, ${153 + Math.random() * 30}, ${0.4 + Math.random() * 0.6})`,
              boxShadow: `0 0 ${Math.random() * 5 + 2}px rgba(52, 211, 153, 0.8)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "2px",
            background: "linear-gradient(to right, transparent, rgba(52, 211, 153, 0.5), transparent)",
            top: "30%",
            opacity: 0.4,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(52, 211, 153, 0.3), transparent)",
            left: "25%",
            opacity: 0.3,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            borderRadius: "24px",
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(52, 211, 153, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(52, 211, 153, 0.1)",
            maxWidth: "80%",
            position: "relative",
            overflow: "hidden",
          }}
        >

          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              transform: "skewX(-15deg)",
              opacity: 0.7,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              maxWidth: "100%",
              position: "relative",
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.1))",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: "#86efac",
                  fontSize: 36,
                  fontWeight: "bold",
                  textShadow: "0 0 10px rgba(134, 239, 172, 0.5)",
                }}
              >

              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h1
                style={{
                  fontSize: 52,
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #f9fafb, #e5e7eb)",
                  backgroundClip: "text",
                  color: "transparent",
                  margin: 0,
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxWidth: "100%",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                {text}
              </h1>

              <div
                style={{
                  height: "2px",
                  width: "100%",
                  background: "linear-gradient(to right, rgba(52, 211, 153, 0), rgba(52, 211, 153, 0.8), rgba(52, 211, 153, 0))",
                  borderRadius: "2px",
                }}
              />

              <p
                style={{
                  fontSize: 18,
                  color: "#94a3b8",
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                Creative developer & digital craftsman
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
          }}
        >

          <div
            style={{
              position: "absolute",
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "2px solid rgba(52, 211, 153, 0.8)",
              opacity: 0.7,
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              boxShadow: "0 0 20px rgba(52, 211, 153, 0.5)",
              opacity: 0.7,
            }}
          />

          <img
            src="https://wica.lol/cc.jpg"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              border: "2px solid rgba(52, 211, 153, 0.6)",
              objectFit: "cover",
              zIndex: 10,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "20px",
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(52, 211, 153, 0.2)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#86efac",
              boxShadow: "0 0 10px rgba(134, 239, 172, 0.7)",
            }}
          />
          <span
            style={{
              fontSize: 16,
              color: "#e2e8f0",
              fontWeight: "500",
            }}
          >
            online
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist Mono",
          data: await loadGoogleFont("Geist Mono", text),
          style: "normal",
        },
      ],
    }
  );
}