CREATE TABLE data_video (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER,
  upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  category_id INTEGER,
  uploader_id INTEGER
  -- FOREIGN KEY (category_id) REFERENCES categories(id),
  -- FOREIGN KEY (uploader_id) REFERENCES users(id)
);
CREATE TABLE data_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE data_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT UNIQUE,
  avatar_url TEXT,
  join_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE data_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  video_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  parent_comment_id INTEGER
  -- FOREIGN KEY (video_id) REFERENCES videos(id),
  -- FOREIGN KEY (user_id) REFERENCES users(id),
  -- FOREIGN KEY (parent_comment_id) REFERENCES comments(id)
);
CREATE TABLE data_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);
CREATE TABLE data_video_tags (
  video_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (video_id, tag_id)
  -- FOREIGN KEY (video_id) REFERENCES videos(id),
  -- FOREIGN KEY (tag_id) REFERENCES tags(id)
);
CREATE TABLE data_video_likes_dislikes (
  user_id INTEGER NOT NULL,
  video_id INTEGER NOT NULL,
  like_dislike INTEGER NOT NULL,
  PRIMARY KEY (user_id, video_id)
  -- FOREIGN KEY (user_id) REFERENCES users(id),
  -- FOREIGN KEY (video_id) REFERENCES videos(id)
);
CREATE TABLE data_favorites (
  user_id INTEGER NOT NULL,
  video_id INTEGER NOT NULL,
  favorite_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, video_id)
  -- FOREIGN KEY (user_id) REFERENCES users(id),
  -- FOREIGN KEY (video_id) REFERENCES videos(id)
);
CREATE TABLE data_view_history (
  user_id INTEGER NOT NULL,
  video_id INTEGER NOT NULL,
  view_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, video_id, view_date)
  -- FOREIGN KEY (user_id) REFERENCES users(id),
  -- FOREIGN KEY (video_id) REFERENCES videos(id)
);
