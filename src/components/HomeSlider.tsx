import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface SlideImage {
  url: string;
}

const divStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
  filter: "grayscale(1)",
  transition: "ease-in"
};

const slideImages: SlideImage[] = [
  {
    url: "https://www.ziprararchiver.com/blog/images/guidelines-for-the-most-effective-methods-of-choosing-digital-document-formats.jpg",
  },
  {
    url: "https://elements-resized.envatousercontent.com/elements-video-cover-images/files/e6797b57-08af-49aa-b4d7-a4a2dccc6545/inline_image_preview.jpg?w=500&cf_fit=cover&q=85&format=auto&s=e90a4a08a3d62713044edb431bd8c04e1731fc2dbd4fa60f69b60198c8bc524b",
  },
  {
    url: "https://media.gettyimages.com/id/1324171825/es/v%C3%ADdeo/hombre-que-rellena-el-formulario-de-impuestos.jpg?s=640x640&k=20&c=8kzAMxqEYPHZWDgC0RR8BEbLqDOBFrgD7VKLfY-ADAU=",
  },
];

const HomeSlider: React.FC = () => {
  return (
    <div className="slide-container">
      <Slide
        duration={3000}
        autoplay={true}
        transitionDuration={400}
        infinite={true}
        arrows={false}
      >
        {slideImages.map((slideImage: SlideImage, index: number) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default HomeSlider;
