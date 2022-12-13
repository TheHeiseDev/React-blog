import "./BlogCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export const BlogCard = ({
  id,
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

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
      <div className="postControl">
        <button onClick={showEditForm} className="postEdit">
          <EditIcon />
        </button>
        <button onClick={deletePost} className="postDelete">
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
};
