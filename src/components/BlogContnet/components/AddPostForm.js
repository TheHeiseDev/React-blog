import "./AddPostForm.css";
import CancelIcon from "@mui/icons-material/Cancel";

export const AddPostForm = ({ handleAddFormHide }) => {
  return (
    <>
      <form action="" className="addPostForm">
        <button type="button" className="hideBtn" onClick={handleAddFormHide}>
          <CancelIcon />
        </button>
        <h2>Создание поста</h2>
        <div>
          <input className="AddFormInput" type="text" name="postTitle" placeholder="Заголовок поста" />
        </div>
        <div>
          <textarea className="AddFormInput" name="postDescription" placeholder="Описание поста..." />
        </div>
        <div>
          <button onClick={handleAddFormHide} className="blackBtn" type="button">
            Добавить пост
          </button>
        </div>
      </form>
      <div onClick={handleAddFormHide} className="overlay"></div>
    </>
  );
};
