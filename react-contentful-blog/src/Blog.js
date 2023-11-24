import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as contentful from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Import Tailwind CSS
import './index.css'

const client = contentful.createClient({
  space: '7v7uj721jzu9',
  accessToken: '-XXLrVmtPMSEsBHki5MLnO-P0eYlPTpcaCXe74uLPVc',
});


const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.info("here 1")
    const fetchPosts = async () => {
      const response = await client.getEntries({ content_type: 'blogPost' });
      setPosts(response.items);
      console.info(response.items)
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mt-5">
      <h1>My Blog</h1>
      {posts.map((post) => (
        <div key={post.sys.id} className="my-4">
          <h2>{post.fields.title}</h2>
          {/* <p>{post.fields.content.toString()}</p> */}
          {/* Render rich text content */}
          {post.fields.content && documentToReactComponents(post.fields.content)}
          {/* {post.fields.content.map((field) => {
            <div>
            <p>{field.data}</p>
            <p>{field.content}</p>
            </div>
          })} */}
          <Link to={`/blog/${post.sys.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;