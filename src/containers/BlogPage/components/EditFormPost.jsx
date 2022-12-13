import "./EditFormPost.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { Component } from "react";

export class EditFormPost extends Component {
  state = {
    postTitle: this.props.selectedPost.title,
    postDesc: this.props.selectedPost.description,
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

  savePost = (e) => {
    e.preventDefault();

    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: this.props.selectedPost.liked,
    };
    this.props.editBlogPost(post);
    this.props.handleEditFormHide();
  };

  handleEscpe = (e) => {
    if (e.key == "Escape" && this.props.showEditForm) {
      this.props.handleEditFormHide();
      console.log("escape");
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleEscpe);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscpe);
  }

  //   handleEnter = (e) => {
  //     if (e.key == "Enter" && this.props.showAddForm) {
  //       this.createPost(e);
  //     }
  //   };

  //   componentDidMount() {
  //     window.addEventListener("keyup", this.handleEnter);
  //   }
  //   componentWillUnmount() {
  //     window.removeEventListener("keyup", this.handleEnter);
  //   }

  render() {
    const handleEditFormHide = this.props.handleEditFormHide;
    return (
      <>
        <form action="" className="EditPostForm" onSubmit={this.savePost}>
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
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              rows={10}
              className="EditFormInput"
              name="postDescription"
              placeholder="Описание поста..."
              value={this.state.postDesc}
              onChange={this.handlePostDescChange}
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
  }
}
