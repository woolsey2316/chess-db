import Image from 'next/image';

interface Props {
  number: number;
  image: string | undefined;
}

export default function Tile({ number, image }: Props) {
  if (number % 2 === 0) {
    return (
      <div className='w-[100px] h-[100px] bg-green-700 flex items-center justify-center'>
        {image && <Image alt='pawn' width='70' height='70' src={image}></Image>}
      </div>
    );
  } else {
    return (
      <div className='w-[100px] h-[100px] bg-white flex items-center justify-center'>
        {image && <Image alt='pawn' width='70' height='70' src={image}></Image>}
      </div>
    );
  }
}
