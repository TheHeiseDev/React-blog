import "./EditFormPost.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { useEffect } from "react";

export const EditFormPost = (props) => {
  const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  const [postDesc, setPostDesc] = useState(props.selectedPost.description);

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value);
  };

  const savePost = (e) => {
    e.preventDefault();

    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDesc,
      liked: props.selectedPost.liked,
    };
    props.editBlogPost(post);
    props.handleEditFormHide();
  };

  useEffect(() => {
    const handleEscpe = (e) => {
      if (e.key == "Escape" && props.showEditForm) {
        props.handleEditFormHide();
        console.log("escape");
      }
    };
    window.addEventListener("keyup", handleEscpe);

    return () => window.removeEventListener("keyup", handleEscpe);
  }, [props]);

  const handleEditFormHide = props.handleEditFormHide;
  return (
    <>
      <form action="" className="EditPostForm" onSubmit={savePost}>
        <button className="hideBtn" onClick={handleEditFormHide}>
          <CancelIcon />
        </button>
        <h2>Редактирование поста</h2>
        <div>
          <input
            className="EditFormInput"
            type="text"
            name="postTitle"
            placeholder="Заголовок поста"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            rows={10}
            className="EditFormInput"
            name="postDescription"
            placeholder="Описание поста..."
            value={postDesc}
            onChange={handlePostDescChange}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Сохранить
          </button>
        </div>
      </form>
      <div onClick={handleEditFormHide} className="overlay"></div>
    </>
  );
};
