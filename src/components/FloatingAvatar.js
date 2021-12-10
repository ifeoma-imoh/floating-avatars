import { useEffect, useRef } from "react";
import anime from "animejs";
import { cloudName, uploadPreset } from "../cloudinaryConfig";
import { Image, Transformation } from "cloudinary-react";

const FloatingAvatars = ({ avatars }) => {
  const refs = useRef([]);

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const animation = () => {
    anime({
      targets: refs.current,
      translateY: () => anime.random(0, windowHeight / 2),
      translateX: () => anime.random(0, windowWidth / 2),
      easing: "easeInOutSine",
      duration: 5000,
      loop: true,
      direction: "alternate",
      complete: animation,
    });
  };

  useEffect(() => {
    animation();
  });

  const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

  const randomTop = () => getRandomNumber(0, windowHeight / 2);
  const randomLeft = () => getRandomNumber(0, windowWidth / 2);

  return avatars.map((avatar, index) => (
    <div
      key={index}
      ref={(el) => (refs.current[index] = el)}
      style={{
        position: "absolute",
        top: `${randomTop()}px`,
        left: `${randomLeft()}px`,
      }}
    >
      <Image
        publicId={`${avatar.public_id}.png`}
        cloudName={cloudName}
        upload_preset={uploadPreset}
        secure={true}
      >
        <Transformation width={70} height={70} gravity="face" crop="thumb" />
        <Transformation radius="max" />
        <Transformation effect="trim" />
      </Image>
    </div>
  ));
};

export default FloatingAvatars;
