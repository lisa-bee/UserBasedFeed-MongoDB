import React from "react";
import axios from "axios";


const Context = React.createContext()


export class Provider extends React.Component { 
   state = {
        isOpen: false
    }


    closeDiv = () => {
       this.setState({
            isOpen: false
        })
      console.log("hejsan")
    }


    getAllPosts = () => {
      axios
        .get("http://localhost:3001/posts/")
        .then((response) => {
          this.setState({ posts: response.data });
          console.log("In function this.state:", this.state);
        })
        .catch(() => {
          alert("error retrieving data");
        });
        console.log("hej från context")
    };

    render() {
      const { isOpen } = this.state
      const { getAllPosts } = this
        return (
          <Context.Provider value={{
            getAllPosts
          }}>
            {this.props.children}
          </Context.Provider>
        );
      }
}

export default Context;

export const Consumer = Context.Consumer; 