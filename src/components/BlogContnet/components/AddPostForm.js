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

  createPost = (e) => {
    e.preventDefault();

    const post = {
      id: this.props.blogArray.length + 1,
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: false,
    };
    this.props.addNewBlogPost(post);
    this.props.handleAddFormHide();
  };

  handleEnter = (e) => {
    if (e.key == "Enter" && this.props.showAddForm) {
      this.createPost(e);
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleEnter);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEnter);
  }

  render() {
    const handleAddFormHide = this.props.handleAddFormHide;
    return (
      <>
        <form action="" className="addPostForm" onSubmit={this.createPost}>
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
              required
            />
          </div>
          <div>
            <textarea
              className="AddFormInput"
              name="postDescription"
              placeholder="Описание поста..."
              value={this.state.handlePostDescChange}
              onChange={this.handlePostDescChange}
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
  }
}
