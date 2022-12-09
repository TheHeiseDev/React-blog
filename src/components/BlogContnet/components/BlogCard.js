import "./BlogCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const BlogCard = ({ id, title, description, liked, likePost, deletePost }) => {
  const heartFill = liked ? "red" : "black";

  return (
    <div key={id} className="post">
      <div className="postContnet">
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <button onClick={deletePost} className="postDelete">
        <DeleteForeverIcon />
      </button>
    </div>
  );
};
