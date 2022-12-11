import "./BlogContent.css";
import { Component } from "react";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArray: [],
    IsPending: false,
  };

  likePost = (pos) => {
    this.setState((state) => {
      const temp = JSON.parse(JSON.stringify(state.blogArray));
      temp[pos].liked = !temp[pos].liked;
      localStorage.setItem("BlogPosts", JSON.stringify(temp));

      return {
        blogArray: temp,
      };
    });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить: ${blogPost.title}?`)) {
      axios.delete(`https://6395a48c90ac47c6806fbfa0.mockapi.io/mydb/${blogPost.id}`).then((response) => {
        this.fetchPosts();
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

  addNewBlogPost = (blogPost) => {
    this.setState((state) => {
      const posts = [...state.blogArray];
      posts.push(blogPost);
      localStorage.setItem("BlogPosts", JSON.stringify(posts));
      return {
        blogArray: posts,
      };
    });
  };

  fetchPosts = () => {
    this.setState({
      IsPending: true,
    });

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
          likePost={() => this.likePost(pos)}
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
{
  this.state.IsPending && <h2>Подождите... </h2>
}
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
}
