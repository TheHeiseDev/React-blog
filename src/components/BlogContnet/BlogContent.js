import "./BlogContent.css";
import { Component } from "react";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArray: [],
    IsPending: false,
  };

  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(`https://6395a48c90ac47c6806fbfa0.mockapi.io/mydb/${blogPost.id}`, temp)
      .then((response) => {
        console.log(response.data);
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
      .post(`https://6395a48c90ac47c6806fbfa0.mockapi.io/mydb`, blogPost)
      .then((response) => {
        console.log(response.data);
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

  handleEscpe = (e) => {
    if (e.key == "Escape" && this.state.showAddForm) {
      this.handleAddFormHide();
    }
  };

  fetchPosts = () => {
    axios
      .get("https://6395a48c90ac47c6806fbfa0.mockapi.io/mydb")
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

  componentDidMount() {
    window.addEventListener("keyup", this.handleEscpe);
    this.fetchPosts();
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscpe);
  }

  render() {
    const blogPosts = this.state.blogArray.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          likePost={() => this.likePost(item)}
          liked={item.liked}
          deletePost={() => this.deletePost(item)}
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
