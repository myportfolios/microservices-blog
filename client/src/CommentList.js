import axios from "axios";
import React, { useState, useEffect } from "react";

export default function CommentList({ comments }) {
  const renderedComments =
    comments &&
    comments.map((comment) => {
      let content;
      switch (comment.status) {
        case "approved":
          content = comment.content;
          break;
        case "pending":
          content = "This comment is awaiting moderation";
          break;
        case "rejected":
          content = "This comment has been rejected";
      }
      return <li key={comment.id}>{content}</li>;
    });
  return <ul>{renderedComments}</ul>;
}
