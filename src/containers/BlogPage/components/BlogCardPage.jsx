import "./BlogCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { postUrl } from "../../../components/shared/projectData";

export const BlogCardPage = ({
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isAdmin,
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  const { postId } = useParams();
  const [post, setPost] = useState({});

  const heartFill = post.liked ? "crimson" : "black";

  useEffect(() => {
    axios
      .get(postUrl + postId)
      .then((response) => {
        // setBlogArray(response.data);
        // setIsPending(false);
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Ошибка запроса на сервер: " + error);
      });
  }, [postId, setPost]);

  return (
    <div className="post">
      <div className="postContnet">
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className="postControl">
          <button onClick={showEditForm} className="postEdit">
            <EditIcon />
          </button>
          <button onClick={deletePost} className="postDelete">
            <DeleteForeverIcon />
          </button>
        </div>
      )}
    </div>
  );
};
