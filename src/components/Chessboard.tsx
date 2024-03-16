const rank = [1, 2, 3, 4, 5, 6, 7, 8];
const file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export default function ChessBoard() {
  const board = [];
  for (let j = rank.length - 1; j >= 0; j--) {
    for (let i = 0; i < file.length; i++) {
      const number = j + i + 2;

      if (number % 2 === 0) {
        board.push(
          <div className='w-[100px] h-[100px] bg-green-700'>
            [{file[i]}
            {rank[j]}]
          </div>
        );
      } else {
        board.push(
          <div className='w-[100px] h-[100px] bg-white'>
            [{file[i]}
            {rank[j]}]
          </div>
        );
      }
    }
  }
  return (
    <div id='chessboard' className='flex flex-wrap w-[800px]'>
      {board}
    </div>
  );
}
