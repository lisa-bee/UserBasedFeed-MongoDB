import React from "react";
import axios from "axios";
import Context from "./context";

class NewPost extends React.Component {
  static contextType = Context;


  state = {
    title: "",
    textContent: "",
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState({
      title: "",
      textContent: "",
    });
  };

  submit = (event) => {
    event.preventDefault();

    const action = {
      title: this.state.title,
      textContent: this.state.textContent,
    };

    axios({
      url: "http://localhost:3001/posts/add",
      method: "POST",
      withCredentials: "true",
      data: action,
    })
      .then(() => {
        this.reset();
        this.context.getAllPosts();
        this.context.getMyPosts();
      })
      .catch(() => {
      });
  };


  render() {
    return (
          <div
            style={{
              marginTop: "3rem",
              backgroundColor: "#61082b",
              borderRadius: "1rem",
              height: "15rem",
              width: "25rem",
              color: "white",
            }}
          >
            <h3>New post</h3>
            <form onSubmit={this.submit}>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Title"
                required
              />
              <textarea
                style={{
                  margin: "1rem 0 1rem 0",
                  border: "none",
                  fontFamily: "Arial",
                  resize: "none",
                  borderRadius: "1rem",
                  padding: "0.4rem",
                }}
                placeholder="Write your post here..."
                name="textContent"
                value={this.state.textContent}
                onChange={this.handleChange}
                id="newpost"
                rows="4"
                cols="50"
                required
              ></textarea>
              <button className="myButton" type="submit">
                Send post
              </button>
            </form>
          </div>
    );
  }
}

export default NewPost;
