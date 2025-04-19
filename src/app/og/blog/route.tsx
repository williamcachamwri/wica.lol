import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "wica's blog";
  const top = searchParams.get("top") ?? "";

  const processedTitle = title.length > 70 ? `${title.substring(0, 67)}...` : title;

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
          fontFamily: "sans-serif",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(to right, rgba(52, 211, 153, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(52, 211, 153, 0.05) 1px, transparent 1px)`,
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
            blog
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
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
          <span
            style={{
              fontSize: 16,
              color: "#e2e8f0",
              fontWeight: "500",
            }}
          >
            @williamcachamwri
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "40px",
            borderRadius: "24px",
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(52, 211, 153, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(52, 211, 153, 0.1)",
            width: "80%",
            maxWidth: "900px",
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
              alignItems: "flex-start",
              gap: "16px",
              width: "100%",
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
                &gt;
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "90%", 
                flexGrow: 1,
              }}
            >
              <h1
                style={{
                  fontSize: title.length > 50 ? 38 : 48,
                  fontWeight: "bold",
                  color: "#f9fafb",
                  margin: 0,
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {processedTitle}
              </h1>

              <div
                style={{
                  height: "3px",
                  width: "100%",
                  background: "linear-gradient(to right, rgba(52, 211, 153, 0), rgba(52, 211, 153, 0.8), rgba(52, 211, 153, 0))",
                  borderRadius: "3px",
                  boxShadow: "0 1px 5px rgba(134, 239, 172, 0.3)",
                }}
              />
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

        {top && (
          <div
            style={{
              position: "absolute",
              bottom: "40px",
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
            <span
              style={{
                fontSize: 16,
                color: "#e2e8f0",
                fontWeight: "500",
              }}
            >
              {top}
            </span>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}