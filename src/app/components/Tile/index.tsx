interface Props {
  number: number;
  image: string | undefined;
}

export default function Tile({ number, image }: Props) {
  if (number % 2 === 0) {
    return (
      <div className='w-[100px] h-[100px] bg-green-700  flex items-center justify-center'>
        <div
          className={`w-[100px] h-[100px] bg-center bg-no-repeat ${
            image && 'chess-piece'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    );
  } else {
    return (
      <div className='w-[100px] h-[100px] bg-white  flex items-center justify-center'>
        <div
          className={`w-[100px] h-[100px] bg-center bg-no-repeat ${
            image && 'chess-piece'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    );
  }
}
