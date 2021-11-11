import CreatePost from './CreatePost';
import PostsList from './PostsList';
import './App.scss';

function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <CreatePost />
      <hr />
      <h1>Posts</h1>
      <PostsList />
    </div>
  );
}

export default App;
