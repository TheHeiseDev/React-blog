import "./AddPostForm.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";

export const AddPostForm = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value);
  };

  const createPost = (e) => {
    e.preventDefault();

    const post = {
      title: postTitle,
      description: postDesc,
      liked: false,
    };
    props.addNewBlogPost(post);
    props.handleAddFormHide();
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key == "Enter" && props.showAddForm) {
        createPost(e);
      }

      window.addEventListener("keyup", handleEnter);
    };

    return () => window.removeEventListener("keyup", handleEnter);
  }, [props]);

  // componentDidMount() {
  //   window.addEventListener("keyup", handleEnter);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("keyup", handleEnter);
  // }

  const handleAddFormHide = props.handleAddFormHide;
  return (
    <>
      <form action="" className="addPostForm" onSubmit={createPost}>
        <button className="hideBtn" onClick={handleAddFormHide}>
          <CancelIcon />
        </button>
        <h2>Создание поста</h2>
        <div>
          <input
            className="AddFormInput"
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
            className="AddFormInput"
            name="postDescription"
            placeholder="Описание поста..."
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Добавить пост
          </button>
        </div>
      </form>
      <div onClick={handleAddFormHide} className="overlay"></div>
    </>
  );
};
