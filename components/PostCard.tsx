
import React from 'react';
import { Post } from '../types';
import AISummary from './AISummary';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="group mb-16 last:mb-0">
      <header className="mb-4">
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
          <time dateTime={post.date}>{post.date}</time>
          <span className="text-[8px]">🐾</span>
          <span>{post.category}</span>
          <span className="text-[8px]">🐾</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold serif leading-tight group-hover:underline underline-offset-4 decoration-1">
          <a href={`#/post/${post.id}`}>{post.title}</a>
        </h2>
      </header>
      
      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 font-light italic">
        {post.excerpt}
      </p>

      <AISummary content={post.content} />

      <footer className="flex flex-wrap gap-2 mt-4">
        {post.tags.map(tag => (
          <span 
            key={tag} 
            className="text-[10px] font-semibold tracking-wider bg-gray-100 px-2 py-0.5 text-gray-500 uppercase flex items-center"
          >
            <span className="mr-1 opacity-40">#</span>{tag}
          </span>
        ))}
      </footer>
    </article>
  );
};

export default PostCard;
