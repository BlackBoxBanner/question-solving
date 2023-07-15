import {ImageResponse} from 'next/server'
import {Cinzel} from "next/font/google";

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

const CinzelFont = Cinzel({
  weight: "400",
  subsets: ["latin", "latin-ext"],

})

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <>
        <div
          style={{
            background: 'black',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
          className={CinzelFont.className}
        >
          CQ
        </div>
      </>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}