import "./SingleBlogPost.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditFormPost } from "../../components/EditFormPost/EditFormPost";
import { CircularProgress } from "@mui/material";
import {
  useDeletePost,
  useEditPost,
  useGetOnePosts,
  useLikePost,
} from "../../components/shared/queries";

export const SingleBlogPost = ({ isAdmin }) => {
  const { postId } = useParams();

  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const {
    data: post,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetOnePosts(postId);

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();

  // Закрытие формы редактирования при нажатии на Escape
  useEffect(() => {
    const handleEscpe = (e) => {
      if (e.key == "Escape" && showEditForm) {
        handleEditFormHide();
        console.log("escape");
      }
    };
    window.addEventListener("keyup", handleEscpe);

    return () => window.removeEventListener("keyup", handleEscpe);
  }, [showEditForm]);

  if (isLoading) return <h1>Загружаю данные...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  const likePost = (blogPost) => {
    const updatedPost = { ...blogPost };
    updatedPost.liked = !updatedPost.liked;
    likeMutation.mutate(updatedPost);
  };

  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      deleteMutation.mutate(blogPost);
    }
  };

  const editBlogPost = (updatedBlogPost) => {
    editMutation.mutate(updatedBlogPost);
  };

  const handleEditFormHide = (post) => {
    setShowEditForm(false);
  };

  const handleEditFormShow = () => {
    setShowEditForm(true);
    setSelectedPost(post);
  };

  const heartFill = post.liked ? "crimson" : "black";
  if (!post.title) return <h1>Загружаю данные...</h1>;

  return (
    <>
      <div className="post" style={{ opacity: isFetching && 0.5 }}>
        {showEditForm && (
          <EditFormPost
            handleEditFormHide={handleEditFormHide}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
          />
        )}
        <div className="postContnet">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div>
            <button onClick={() => likePost(post)}>
              <FavoriteIcon style={{ fill: heartFill }} />
            </button>
          </div>
        </div>
        {isAdmin && (
          <div className="postControl">
            <button
              onClick={() => handleEditFormShow(post)}
              className="postEdit"
            >
              <EditIcon />
            </button>
            <button onClick={() => deletePost(post)} className="postDelete">
              <DeleteForeverIcon />
            </button>
          </div>
        )}
      </div>
      {isFetching && <CircularProgress className="preloader" />}
    </>
  );
};
