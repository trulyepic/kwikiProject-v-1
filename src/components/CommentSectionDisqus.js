import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const CommentSectionDisqus = ({ seriesId }) => {
  const [exposedComment, setExposedComment] = useState(true);

  //function to load the disqus script
  const loadDisqus = () => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = seriesId;
          this.page.url = window.location.href;
        },
      });
    } else {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://star-k-wiki.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    }
  };

  useEffect(() => {
    if (exposedComment) {
      loadDisqus();
    }
  }, [exposedComment]);

  return (
    <div className="comment-section-wrapper">
      <div className="comment-section">
        {/* Header to toggle visiblity */}
        <div
          className="comment-section-header"
          onClick={() => setExposedComment(!exposedComment)}
        >
          <span className="comment-section-header-disqus-text">
            {/* {exposedComment ? "Hide Comments" : "Show Comments"} */}
            Series comments
          </span>

          {/* <span className="comment-section-icon">
            {exposedComment ? <DownOutlined /> : <UpOutlined />}
          </span> */}
        </div>

        {/* Disqus Thread */}
        {exposedComment && <div id="disqus_thread"></div>}
      </div>
    </div>
  );
};

export default CommentSectionDisqus;
