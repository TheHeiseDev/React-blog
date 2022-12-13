import "./BlogPage.css";
import { Component } from "react";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { EditFormPost } from "./components/EditFormPost";
import { postUrl } from "../../components/shared/projectData";

let controller;
export class BlogPage extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    blogArray: [],
    IsPending: false,
    selectedPost: {},
  };

  fetchPosts = () => {
    controller = new AbortController();
    axios
      .get(postUrl, {
        signal: controller.signal,
      })
      .then((response) => {
        this.setState({
          blogArray: response.data,
          IsPending: false,
        });
      })
      .catch((error) => {
        console.error("Ошибка запроса на сервер: " + error);
      });
  };

  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(`${postUrl}/${blogPost.id}`, temp)
      .then((response) => {
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addNewBlogPost = (blogPost) => {
    this.setState({
      IsPending: true,
    });
    axios
      .post(postUrl, blogPost)
      .then((response) => {
        console.log(response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editBlogPost = (updatedBlogPost) => {
    this.setState({
      IsPending: true,
    });

    axios
      .put(`${postUrl}/${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePost = (blogPost) => {
    this.setState({
      IsPending: true,
    });
    if (window.confirm(`Удалить: ${blogPost.title}?`)) {
      axios.delete(`https://6395a48c90ac47c6806fbfa0.mockapi.io/mydb/${blogPost.id}`).then((response) => {
        this.fetchPosts();
      });
    } else {
      this.setState({
        IsPending: false,
      });
    }
  };
  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };

  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  handleEditFormShow = () => {
    this.setState({
      showEditForm: true,
    });
  };

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost,
    });
  };

  handleEscpe = (e) => {
    if (e.key == "Escape" && this.state.showAddForm) {
      this.handleAddFormHide();
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleEscpe);
    this.fetchPosts();
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscpe);

    if (controller) {
      controller.abort();
    }
  }

  render() {
    const blogPosts = this.state.blogArray.map((item) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          likePost={() => this.likePost(item)}
          liked={item.liked}
          deletePost={() => this.deletePost(item)}
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={() => this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArray.length === 0) return <h1>Загружаю данные...</h1>;
    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            handleAddFormHide={this.handleAddFormHide}
            addNewBlogPost={this.addNewBlogPost}
            blogArray={this.state.blogArray}
            showAddForm={this.state.showAddForm}
          />
        )}

        {this.state.showEditForm && (
          <EditFormPost
            selectedPost={this.state.selectedPost}
            showEditForm={this.state.showEditForm}
            handleEditFormHide={this.handleEditFormHide}
            editBlogPost={this.editBlogPost}
          />
        )}

        <>
          <h1>Блог</h1>
          <div className="addNewBlog">
            <button onClick={this.handleAddFormShow} className="blackBtn">
              Создать новый пост
            </button>
          </div>

          <div className="posts" style={{ opacity: this.state.IsPending && 0.5 }}>
            {blogPosts}
          </div>
          {this.state.IsPending && <CircularProgress className="preloader" />}
        </>
      </div>
    );
  }
}
