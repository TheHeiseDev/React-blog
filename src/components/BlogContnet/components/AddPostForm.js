import "./AddPostForm.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { Component } from "react";

export class AddPostForm extends Component {
  state = {
    postTitle: "",
    postDesc: "",
  };

  handlePostTitleChange = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };

  handlePostDescChange = (e) => {
    this.setState({
      postDesc: e.target.value,
    });
  };
  render() {
    const handleAddFormHide = this.props.handleAddFormHide;
    return (
      <>
        <form action="" className="addPostForm">
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
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
            />
          </div>
          <div>
            <textarea
              className="AddFormInput"
              name="postDescription"
              placeholder="Описание поста..."
              value={this.state.handlePostDescChange}
              onChange={this.handlePostDescChange}
            />
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
  }
}
