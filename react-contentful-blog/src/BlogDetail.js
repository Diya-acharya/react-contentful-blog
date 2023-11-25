import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FacebookShareButton, LinkedinShareButton } from 'react-share';
import * as contentful from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Import Tailwind CSS
import './index.css';

const client = contentful.createClient({
    space: '7v7uj721jzu9',
    accessToken: '-XXLrVmtPMSEsBHki5MLnO-P0eYlPTpcaCXe74uLPVc',
  });

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await client.getEntry(id);
        setPost(response);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const renderOptions = {
    renderNode: {
      'embedded-asset-block': (node) => {
        const { title, description, file } = node.data.target.fields;
        const imageUrl = file.url;
        return (
          <img
            src={imageUrl}
            alt={description || title || 'Image'}
            className="my-4 max-w-full"
          />
        );
      },
    },
  };

  return (
    <div className="container mt-5 blog-detail">
      {/* Display blog details */}
      <div>
        <h1>{post.fields.title}</h1>

        {post.fields.image && (
          <img
            src={post.fields.image.fields.file.url}
            alt={post.fields.image.fields.description || 'Image'}
            className="my-4 max-w-full"
          />
        )}
        
        {/* Render rich text content including images */}
        {post.fields.content && documentToReactComponents(post.fields.content, renderOptions)}

        

      </div>
      {/* Social media sharing options */}
      <div className="mt-4">
        <FacebookShareButton url={`https://yourblog.com/blog/${id}`} quote="Check out this blog post!">
          Share on Facebook
        </FacebookShareButton>
        <LinkedinShareButton url={`https://yourblog.com/blog/${id}`} title="Check out this blog post!">
          Share on LinkedIn
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default BlogDetail;
