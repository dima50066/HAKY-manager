import sprite from "./sprite.svg";

interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  id: string;
}

const Icon: React.FC<IconProps> = ({ className, width, height, id }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
