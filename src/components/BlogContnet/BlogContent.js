import "./BlogContent.css";
import { Component } from "react";
import { posts } from "../shared/projectData";
import { BlogCard } from "./components/BlogCard";

export class BlogContent extends Component {
  state = {
    showBlog: true,
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

  toogleBlog = () => {
    this.setState(({ showBlog }) => {
      return {
        showBlog: !showBlog,
      };
    });
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
        <button onClick={() => this.toogleBlog()}>{this.state.showBlog ? "Блок показан" : "Блок скрыт"}</button>
        {this.state.showBlog ? (
          <>
            <h1>Simple Blog</h1>
            <div className="posts">{blogPosts}</div>
          </>
        ) : null}
      </>
    );
  }
}
