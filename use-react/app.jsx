import React, { Component } from 'react'
import { render } from 'react-dom'

// tutorial1.js
class CommentBox extends Component {
  render() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    )
  }
}

render(
  <CommentBox />,
  document.getElementById('content')
)
