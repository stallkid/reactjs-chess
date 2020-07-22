import React, { Component } from 'react';
import "./Board.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook, faChessQueen, faChessKing,
  faChessKnight, faChessBishop, faChessPawn } from "@fortawesome/free-solid-svg-icons";

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            positions: [
                'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
                'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
                'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
                'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
                'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
                'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
                'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
            ],
            silverPieces: [
                { position: "a2", type: "pawn", style: "chess-piece-silver", icon: faChessPawn},
                { position: "b2", type: "pawn", style: "chess-piece-silver", icon: faChessPawn},
                { position: "c2", type: "pawn", style: "chess-piece-silver", icon: faChessPawn},
                { position: "d2", type: "pawn", style: "chess-piece-silver", icon: faChessPawn},
                { position: "e2", type: "pawn", style: "chess-piece-silver", icon: faChessPawn},
                { position: "f2", type: "pawn", style: "chess-piece-silver", icon: faChessPawn},
                { position: "g2", type: "pawn", style: "chess-piece-silver", icon: faChessPawn},
                { position: "h2", type: "pawn", style: "chess-piece-silver", icon: faChessPawn},
                { position: "a1", type: "rook", style: "chess-piece-silver", icon: faChessRook},
                { position: "h1", type: "rook", style: "chess-piece-silver", icon: faChessRook},
                { position: "b1", type: "knight", style: "chess-piece-silver", icon: faChessKnight},
                { position: "g1", type: "knight", style: "chess-piece-silver", icon: faChessKnight},
                { position: "c1", type: "bishop", style: "chess-piece-silver", icon: faChessBishop},
                { position: "f1", type: "bishop", style: "chess-piece-silver", icon: faChessBishop},
                { position: "d1", type: "king", style: "chess-piece-silver", icon: faChessKing},
                { position: "e1", type: "queen", style: "chess-piece-silver", icon: faChessQueen}
            ],
            goldenPieces: [
                { position: "a7", type: "pawn", style: "chess-piece-gold", icon: faChessPawn},
                { position: "b7", type: "pawn", style: "chess-piece-gold", icon: faChessPawn},
                { position: "c7", type: "pawn", style: "chess-piece-gold", icon: faChessPawn},
                { position: "d7", type: "pawn", style: "chess-piece-gold", icon: faChessPawn},
                { position: "e7", type: "pawn", style: "chess-piece-gold", icon: faChessPawn},
                { position: "f7", type: "pawn", style: "chess-piece-gold", icon: faChessPawn},
                { position: "g7", type: "pawn", style: "chess-piece-gold", icon: faChessPawn},
                { position: "h7", type: "pawn", style: "chess-piece-gold", icon: faChessPawn},
                { position: "a8", type: "rook", style: "chess-piece-gold", icon: faChessRook},
                { position: "h8", type: "rook", style: "chess-piece-gold", icon: faChessRook},
                { position: "b8", type: "knight", style: "chess-piece-gold", icon: faChessKnight},
                { position: "g8", type: "knight", style: "chess-piece-gold", icon: faChessKnight},
                { position: "c8", type: "bishop", style: "chess-piece-gold", icon: faChessBishop},
                { position: "f8", type: "bishop", style: "chess-piece-gold", icon: faChessBishop},
                { position: "d8", type: "king", style: "chess-piece-gold", icon: faChessKing},
                { position: "e8", type: "queen", style: "chess-piece-gold", icon: faChessQueen}
            ],
            reset: true
        };
    }

    paintTheField(value, index) {
        const fieldLetter = value.split("")[0];
        if( fieldLetter === "a" || fieldLetter === "c"
            || fieldLetter === "e" || fieldLetter === "g") {
                return (index % 2 === 0) ? 'white' : 'black';
        } else {
            return (index % 2 === 0) ? 'black' : 'white';
        }
    }

    getPieceType = (type) => {
        switch (type) {
            case "fa-chess-rook":
                return faChessRook;
            case "fa-chess-queen":
                return faChessQueen;
            case "fa-chess-king":
                return faChessKing;
            case "fa-chess-knight":
                return faChessKnight;
            case "fa-chess-bishop":
                return faChessBishop;
            case "fa-chess-pawn":
                return faChessPawn;
            default:
                break;
        }
    }

    onDragStart = (event, id, team) => {
        event.dataTransfer.setData("id", id);
    }

    onDrop(event, position) {
        event.preventDefault();
        let id = event.dataTransfer.getData("id");
        const piece = document.getElementById(`${id}-piece`);
        let newState = null;
        if (piece.classList[3] === "chess-piece-gold") {
            newState = this.state.goldenPieces.map( piece => {
                if (piece.position === id) {
                    piece.position = event.target.id;
                }
                return piece;
            });
            this.setState({goldenPieces: newState});
        } else if (piece.classList[3] === "chess-piece-silver") {
            newState = this.state.silverPieces.map( piece => {
                if (piece.position === id) {
                    piece.position = event.target.id;
                }
                return piece;
            });
            this.setState({silverPieces: newState});
        }
    }

    onDragOver(event, cat) {
        event.preventDefault();
    }

    startTheGame = (boardPosition) => {
        console.log(this.state);
        const goldenPiece = this.state.goldenPieces.find( piece => piece.position === boardPosition);
        const silverPiece = this.state.silverPieces.find( piece => piece.position === boardPosition);
        let element = null;
        if (goldenPiece) {
            element = (
                <div id={`${boardPosition}-placeholder`} draggable onDragStart={(e) => this.onDragStart(e, boardPosition)}>
                    <FontAwesomeIcon id={`${boardPosition}-piece`} className={goldenPiece.style} icon={goldenPiece.icon} />
                </div>
            );
        } else if (silverPiece) {
            element = (
                <div id={`${boardPosition}-placeholder`} draggable onDragStart={(e) => this.onDragStart(e, boardPosition)}>
                    <FontAwesomeIcon id={`${boardPosition}-piece`} className={silverPiece.style} icon={silverPiece.icon} />
                </div>
            );
        }
        return element;
    }

    render() {
        let board = null;
        board = (
            this.state.positions.map( (value, index) => {
                const piece = this.startTheGame(value);
                return <div id={value}key={value} className={'chess-field '+ this.paintTheField(value, index)}
                    onDrop={(e) => this.onDrop(e, value)} onDragOver={(e) => this.onDragOver(e)}>
                        {piece}
                    </div>
            })
        );
        
        return(
            <div className="container">
                <div className="chess-board">
                    {board}
                </div>
            </div>
        )
    }
}

export default Board;