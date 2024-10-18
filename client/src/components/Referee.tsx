import Image from 'next/image';
import { useRef, useState } from 'react';

import Chessboard from '@/components/Chessboard';

import { Piece, Position } from '@/models';
import { Board } from '@/models/Board';
import { Pawn } from '@/models/Pawn';
import { PieceType, TeamType } from '@/Types';

import { initialBoard } from '../constant';

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);
  const checkmateModalRef = useRef<HTMLDivElement>(null);

  function playMove(playedPiece: Piece, destination: Position): boolean {
    // If the playing piece doesn't have any moves return
    if (playedPiece.possibleMoves === undefined) return false;

    // Prevent the inactive team from playing
    if (playedPiece.team === TeamType.OUR && board.totalTurns % 2 !== 1)
      return false;
    if (playedPiece.team === TeamType.OPPONENT && board.totalTurns % 2 !== 0)
      return false;

    let playedMoveIsValid = false;

    const validMove = playedPiece.possibleMoves?.some((m) =>
      m.samePosition(destination)
    );

    if (!validMove) return false;

    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    // playMove modifies the board thus we
    // need to call setBoard
    setBoard(() => {
      const clonedBoard = board.clone();
      clonedBoard.totalTurns += 1;
      // Playing the move
      playedMoveIsValid = clonedBoard.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination
      );

      if (clonedBoard.winningTeam !== undefined) {
        checkmateModalRef.current?.classList.remove('hidden');
      }

      return clonedBoard;
    });

    // This is for promoting a pawn
    const promotionRow = playedPiece.team === TeamType.OUR ? 7 : 0;

    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove('hidden');
      setPromotionPawn((_previousPromotionPawn) => {
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });
    }

    return playedMoveIsValid;
  }

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    setBoard((_previousBoard) => {
      const clonedBoard = board.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(
            new Piece(piece.position.clone(), pieceType, piece.team, true)
          );
        } else {
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);

      clonedBoard.calculateAllMoves();

      return clonedBoard;
    });

    modalRef.current?.classList.add('hidden');
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR ? 'w' : 'b';
  }

  function restartGame() {
    checkmateModalRef.current?.classList.add('hidden');
    setBoard(initialBoard.clone());
  }

  return (
    <>
      <div className='modal hidden' ref={modalRef}>
        <div className='modal-body'>
          <Image
            width='80'
            height='80'
            alt='rook'
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/images/rook_${promotionTeamType()}.png`}
          />
          <Image
            width='80'
            height='80'
            alt='bishop'
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/images/bishop_${promotionTeamType()}.png`}
          />
          <Image
            width='80'
            height='80'
            alt='knight'
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/images/knight_${promotionTeamType()}.png`}
          />
          <Image
            width='80'
            height='80'
            alt='queen'
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/images/queen_${promotionTeamType()}.png`}
          />
        </div>
      </div>
      <div className='modal hidden' ref={checkmateModalRef}>
        <div className='modal-body'>
          <div className='checkmate-body'>
            <span>
              The winning team is{' '}
              {board.winningTeam === TeamType.OUR ? 'white' : 'black'}!
            </span>
            <button onClick={restartGame}>Play again</button>
          </div>
        </div>
      </div>
      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  );
}
