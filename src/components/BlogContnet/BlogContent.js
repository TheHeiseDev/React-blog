import "./BlogContent.css";
import { Component } from "react";
import { posts } from "../shared/projectData";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArray: JSON.parse(localStorage.getItem("BlogPosts")) || posts,
  };

  likePost = (pos) => {
    const temp = JSON.parse(JSON.stringify(this.state.blogArray));
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArray: temp,
    });

    localStorage.setItem("BlogPosts", JSON.stringify(temp));
  };

  deletePost = (pos) => {
    if (window.confirm("Удалить: " + this.state.blogArray[pos].title + " ?")) {
      const temp = [...this.state.blogArray];
      temp.splice(pos, 1);
      console.log(`Эталонный массив:`, this.state.blogArray);
      console.log(`Измененнный массив:`, temp);

      this.setState({
        blogArray: temp,
      });
      localStorage.setItem("BlogPosts", JSON.stringify(temp));
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

  render() {
    const blogPosts = this.state.blogArray.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          likePost={() => this.likePost(pos)}
          liked={item.liked}
          deletePost={() => this.deletePost(pos)}
        />
      );
    });

    return (
      <>
        {this.state.showAddForm ? <AddPostForm handleAddFormHide={this.handleAddFormHide} /> : null}

        <>
          <h1>Simple Blog</h1>
          <button onClick={this.handleAddFormShow} className="blackBtn">
            Создать новый пост
          </button>

          <div className="posts">{blogPosts}</div>
        </>
      </>
    );
  }
}
