import "./BlogPage.css";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import CircularProgress from "@mui/material/CircularProgress";
import { EditFormPost } from "./components/EditFormPost";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useAddPost,
  useDeletePost,
  useEditPost,
  useGetPosts,
  useLikePost,
} from "../../components/shared/queries";

let controller;
export const BlogPage = ({ isAdmin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // const [IsPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetPosts();
  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();
  const addMutation = useAddPost();

  useEffect(() => {
    const handleEscpe = (e) => {
      if (e.key == "Escape" && showAddForm) {
        handleAddFormHide();
      }
    };
    window.addEventListener("keyup", handleEscpe);
    // fetchPosts();

    return () => {
      window.removeEventListener("keyup", handleEscpe);
    };
  }, [showAddForm]);

  if (isLoading) return <h1>Загружаю данные...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  const likePost = (blogPost) => {
    const updatedPost = { ...blogPost };
    updatedPost.liked = !updatedPost.liked;
    likeMutation.mutate(updatedPost);
  };
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить: ${blogPost.title}?`)) {
      deleteMutation.mutate(blogPost);
    }
  };

  const editBlogPost = (updatedBlogPost) => {
    editMutation.mutate(updatedBlogPost);
  };

  const addNewBlogPost = (newBlogPost) => {
    addMutation.mutate(newBlogPost);
  };

  const handleAddFormShow = () => {
    setShowAddForm(true);
  };

  const handleAddFormHide = () => {
    setShowAddForm(false);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  const blogPosts = posts.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <BlogCard
          title={item.title}
          description={item.description}
          likePost={() => likePost(item)}
          liked={item.liked}
          deletePost={() => deletePost(item)}
          handleEditFormShow={handleEditFormShow}
          handleSelectPost={() => handleSelectPost(item)}
          isAdmin={isAdmin}
        />

        <Link to={`/blog/${item.id}`}>Подробнее</Link>
      </React.Fragment>
    );
  });

  return (
    <div className="blogPage">
      {showAddForm && (
        <AddPostForm
          handleAddFormHide={handleAddFormHide}
          addNewBlogPost={addNewBlogPost}
          showAddForm={showAddForm}
        />
      )}

      {showEditForm && (
        <EditFormPost
          selectedPost={selectedPost}
          showEditForm={showEditForm}
          handleEditFormHide={handleEditFormHide}
          editBlogPost={editBlogPost}
        />
      )}

      <>
        <h1>Блог</h1>

        {isAdmin && (
          <div className="addNewBlog">
            <button onClick={handleAddFormShow} className="blackBtn">
              Создать новый пост
            </button>
          </div>
        )}

        <div className="posts" style={{ opacity: isFetching && 0.5 }}>
          {blogPosts}
        </div>
        {isFetching && <CircularProgress className="preloader" />}
      </>
    </div>
  );
};
