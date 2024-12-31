import { Comment } from "@ant-design/compatible";
import { DownOutlined, UpOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, List, Input, Button } from "antd";
import React, { useState } from "react";
import "./CommentSection.css";

const { TextArea } = Input;

const CommentSection = () => {
  const [comments, setComments] = React.useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [placeholder, setPlaceholder] = useState("Write a comment...");
  const [exposedComment, setExposedComment] = useState(false);

  // Recursive function to add a reply to the appropriate comment/reply
  const addReply = (commentsList, commentId, newReply) => {
    return commentsList.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReply(comment.replies, commentId, newReply),
        };
      }
      return comment;
    });
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const newCommentData = {
      id: Date.now(),
      content: newComment,
      author: "Anonymous",
      avatar: <Avatar icon={<UserOutlined />} />,
      datetime: new Date().toLocaleString(),
      replies: [],
    };
    if (replyingTo) {
      setComments(
        (prevComments) => addReply(prevComments, replyingTo, newCommentData)
        //     prevComments.map((comment) =>
        //       comment.id === replyingTo
        //         ? { ...comment, replies: [...comment.replies, newCommentData] }
        //         : comment
        //     )
      );
    } else {
      setComments([...comments, newCommentData]);
    }
    setNewComment("");
    setReplyingTo(null);
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const renderComments = (commentsList) => {
    return commentsList.map((comment) => (
      <Comment
        key={comment.id}
        actions={[
          <span key="reply" onClick={() => handleReply(comment.id)}>
            {" "}
            Reply
          </span>,
        ]}
        className="comment-start"
        author={comment.author}
        avatar={comment.avatar}
        content={comment.content}
        datetime={comment.datetime}
      >
        {comment.replies &&
          comment.replies.length > 0 &&
          renderComments(comment.replies)}
      </Comment>
    ));
  };

  return (
    <div className="comment-section-wrapper">
      <div className="comment-section">
        <div
          className="comment-section-header"
          onClick={() => setExposedComment(!exposedComment)}
        >
          <span className="comment-section-header-text">
            {exposedComment ? "Comments" : "Show Comments"}
          </span>
          <span className="comment-section-icon">
            {exposedComment ? <DownOutlined /> : <UpOutlined />}
          </span>
        </div>
        {/* {comments.length > 0 && (
          <List
            dataSource={comments}
            renderItem={(comment) => (
              <Comment
                actions={[
                  <span key="reply" onClick={() => handleReply(comment.id)}>
                    {" "}
                    Reply
                  </span>,
                ]}
                className="comment-start"
                author={comment.author}
                avatar={comment.avatar}
                content={comment.content}
                datetime={comment.datetime}
              >
                {comment.replies.length > 0 && (
                  <List
                    dataSource={comment.replies}
                    renderItem={(reply) => (
                      <Comment
                        className="reply-comment"
                        author={reply.author}
                        avatar={reply.avatar}
                        content={reply.content}
                        datetime={reply.datetime}
                      />
                    )}
                  />
                )}
              </Comment>
            )}
          />
        )} */}

        {exposedComment && renderComments(comments)}

        {exposedComment && (
          <div className="comment-text-area">
            <TextArea
              rows={4}
              // placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
              placeholder={placeholder}
              value={newComment}
              onFocus={() => setPlaceholder("")}
              onBlur={() => setPlaceholder("Write a comment...")}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-text-section"
            />
            <Button
              type="primary"
              onClick={addComment}
              className="comment-submit-button"
            >
              {replyingTo ? "Reply" : "Comment"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
