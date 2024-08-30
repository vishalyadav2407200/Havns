import { useState, useEffect } from "react";

const ImageBox = ({ link, classes, placeholder, feed }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = link;
  }, [link]);

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && (
        <img
          src={placeholder}
          alt="*"
          className={`${classes} absolute inset-0 w-full h-full object-cover`}
        />
      )}
      <img
        src={link}
        alt="Actual"
        className={`${classes} w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${feed ? '' : 'hover:brightness-[0.80]'} transition-opacity duration-500`}
        style={{ transition: 'opacity 0.5s ease-in-out' }}
      />
    </div>
  );
};

export default ImageBox;

