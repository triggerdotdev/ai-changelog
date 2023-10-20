import { ImageResponse } from "next/server";
import { TriggerWordmark } from "../../../../components/logos/Trigger";
import { stripMarkdown } from "@/lib/utils";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Generate a changelog using AI";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: {
    owner: string;
    repo: string;
    changelogId: number;
  };
};

// Image generation
export default async function OG({
  params: { owner, repo, changelogId },
}: Props) {
  // Fonts
  const poppinsSemiBold = fetch(
    new URL("/public/Poppins-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const poppinsRegular = fetch(
    new URL("/public/Poppins-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  // Fetch changelog
  const supabaseRestEndpoint = `https://${process.env.SUPABASE_ID}.supabase.co/rest/v1/changelogs`;
  const supabaseParams = `?select=id,start_date,end_date,markdown,repo:repos(id,repo_url)&id=eq.${changelogId}`;

  const changelogRecord = await fetch(supabaseRestEndpoint + supabaseParams, {
    headers: {
      apikey: process.env.SUPABASE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
    } as HeadersInit,
  });

  const records = await changelogRecord?.json();
  const markdown = records?.[0]?.markdown;
  const samples = markdown
    ? stripMarkdown(markdown)?.split("\n").slice(1, 4)
    : null;

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "#040712",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "block",
            position: "absolute",
            left: "0",
            top: "25%",
            width: "75%",
            height: "50%",
            background: "#4F46E511",
            filter: "blur(100px)",
            transform: "rotate(-30deg)",
          }}
        />
        <div
          style={{
            color: "#fff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            width: "50%",
            padding: "72px",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              letterSpacing: "-2px",
              paddingTop: "48px",
              fontWeight: 600,
              gap: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 40,
                lineHeight: "28px",
                color: "#64748B",
              }}
            >
              {owner}/
            </div>
            <div
              style={{
                display: "flex",
                fontSize: repo.length > 16 ? 36 : 64,
              }}
            >
              {repo}
            </div>
          </div>
          {samples && samples.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {samples?.map((sample, i) => (
                <div key={i} style={{ display: "flex" }}>
                  • {sample}
                </div>
              ))}
              • ...
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#94A3B8",
            }}
          >
            <div
              style={{
                display: "block",
                letterSpacing: "-2px",
                fontSize: 36,
                // Color gradient text:
                background: "linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)",
                color: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
              }}
            >
              AutoChangelog
            </div>
            <span>by</span>
            <TriggerWordmark
              style={{ width: "150.2px", height: "26px", marginBottom: "4px" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingLeft: "20px",
            height: "100%",
            width: "50%",
          }}
        >
          {/* Browser screenshot */}
          <div
            style={{
              display: "flex",
              background: "#151929",
              width: "100%",
              borderRadius: "6px 0 0 0",
              border: "1px solid #1E293B",
              borderRight: "none",
              padding: "7px",
              paddingLeft: "10px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    background: "#334155",
                    marginRight: "5px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "9px",
                  }}
                />
              ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github.com/tedspare/autochangelog/assets/36117635/d01e91fe-539b-479f-a613-133d6188e314"
            width="100%"
            style={{
              opacity: "0.7",
              boxShadow: "10px 10px 30px #00000099",
            }}
            alt="Screenshot of AutoChangelog UI"
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "poppins",
          data: await poppinsRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "poppins",
          data: await poppinsSemiBold,
          weight: 600,
        },
      ],
    }
  );
}
