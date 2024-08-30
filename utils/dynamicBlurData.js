const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://havns.vercel.app";

export function dynamicBlurDataUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/_next/image?url=${url}&w=32&q=70`)
      .then(async (res) => {

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const arrayBuffer = await res.arrayBuffer();

        const base64str = Buffer.from(arrayBuffer).toString("base64");

        const blur = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5">
              <filter id="b" color-interpolation-filters='sRGB'>
                  <feGaussianBlur in='SourceGraphic' stdDeviation={21}/>
              </filter>
              <image preserveAspectRatio="none" filter="url(#b)" x='1' y='0' height='100%' width='100%'
               href='data:image/webp;base64,${base64str}' />
          </svg>`;

        const blurDataUrl = `data:image/svg+xml;base64,${Buffer.from(blur).toString('base64')}`;

        resolve(blurDataUrl);
      })
      .catch((error) => {
        console.error('Error generating blur data URL:', error);
        reject(error);
      });
  });
}

