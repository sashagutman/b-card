import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { toggleFavorite } from "../services/cardsService";
import { decodeToken } from "../services/tokenService";
import { Tooltip } from "react-tooltip";
import "../styles/fav-card.css"

interface FavButtonProps {
  cardId: string;
  likes: string[];
  onToggle?: () => void;
}

const FavButton = ({ cardId, likes, onToggle }: FavButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = decodeToken(token)._id;
      setIsFavorite(likes.includes(userId));
    }
  }, [likes]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  
    toggleFavorite(cardId)
      .then(() => {
        setIsFavorite((prev) => !prev);
  
        if (onToggle) {
          onToggle();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <span
      className="contact-like contact-link"
      onClick={handleToggle}
      data-tooltip-id={`fav-tooltip-${cardId}`}
      data-tooltip-content={
        isFavorite ? "Remove?" : "Add?"
      }
    >
      {isFavorite ? <FaHeart color="red" /> : <CiHeart />}
      <Tooltip id={`fav-tooltip-${cardId}`} place="top" className="fav-tooltip" />
    </span>
  );
};

export default FavButton;
