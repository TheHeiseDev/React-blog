import "./BlogPage.css";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { EditFormPost } from "./components/EditFormPost";
import { postUrl } from "../../components/shared/projectData";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

let controller;
export const BlogPage = ({ isAdmin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArray, setBlogArray] = useState([]);
  const [IsPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const fetchPosts = () => {
    controller = new AbortController();
    axios
      .get(postUrl, {
        signal: controller.signal,
      })
      .then((response) => {
        setBlogArray(response.data);
        setIsPending(false);
      })
      .catch((error) => {
        console.error("Ошибка запроса на сервер: " + error);
      });
  };

  const likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(`${postUrl}/${blogPost.id}`, temp)
      .then((response) => {
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewBlogPost = (blogPost) => {
    setIsPending(true);
    axios
      .post(postUrl, blogPost)
      .then((response) => {
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editBlogPost = (updatedBlogPost) => {
    setIsPending(true);

    axios
      .put(`${postUrl}/${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (blogPost) => {
    setIsPending(true);
    if (window.confirm(`Удалить: ${blogPost.title}?`)) {
      axios
        .delete(
          `https://6395a48c90ac47c6806fbfa0.mockapi.io/mydb/${blogPost.id}`
        )
        .then((response) => {
          fetchPosts();
        });
    } else {
      setIsPending(false);
    }
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

  const handleEscpe = (e) => {
    if (e.key == "Escape" && showAddForm) {
      handleAddFormHide();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleEscpe);
    fetchPosts();

    return () => {
      window.removeEventListener("keyup", handleEscpe);
    };
  }, []);

  const blogPosts = blogArray.map((item) => {
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

  if (blogArray.length === 0) return <h1>Загружаю данные...</h1>;
  return (
    <div className="blogPage">
      {showAddForm && (
        <AddPostForm
          handleAddFormHide={handleAddFormHide}
          addNewBlogPost={addNewBlogPost}
          blogArray={blogArray}
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

        <div className="posts" style={{ opacity: IsPending && 0.5 }}>
          {blogPosts}
        </div>
        {IsPending && <CircularProgress className="preloader" />}
      </>
    </div>
  );
};
