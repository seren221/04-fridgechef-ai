import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My AI Wrapper';

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: 'linear-gradient(to bottom right, #111827, #000000)',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <svg
              width="75"
              height="75"
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: '0 20px' }}
            >
              <path
                d="M37.5 0L75 37.5L37.5 75L0 37.5L37.5 0Z"
                fill="url(#paint0_linear_1_2)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_2"
                  x1="37.5"
                  y1="0"
                  x2="37.5"
                  y2="75"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontStyle: 'normal',
              color: 'white',
              marginTop: 30,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
            <b>{title}</b>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontStyle: 'normal',
              color: '#9CA3AF',
              marginTop: 10,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
            Think. Create. Evolve.
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.log(`${message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
