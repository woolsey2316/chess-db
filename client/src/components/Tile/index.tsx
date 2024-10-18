interface Props {
  image?: string;
  number: number;
  highlight: boolean;
}

export default function Tile({ number, image, highlight }: Props) {
  const className: string = [
    'w-[100px] h-[100px]',
    number % 2 === 0 && 'bg-green-700',
    number % 2 !== 0 && 'bg-white',
    highlight && 'tile-highlight',
    image && 'chess-piece-tile',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})`, backgroundSize: 80 }}
          className='chess-piece w-[100px] h-[100px] bg-no-repeat bg-center hover:cursor-grab active:cursor-grabbing'
        ></div>
      )}
    </div>
  );
}
