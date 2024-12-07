import "./css/avatar_image.css";

const AvatarImage = ({
  image,
  style,
}: {
  image: string;
  style?: React.CSSProperties;
}): JSX.Element => {
  return (
    <div className="avatar-image" style={style}>
      <img src={image} />
    </div>
  );
};

export default AvatarImage;
