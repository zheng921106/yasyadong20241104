-- 创建一级分类表
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- 创建二级分类表
CREATE TABLE IF NOT EXISTS subcategories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 插入一级分类数据
INSERT INTO categories (name) VALUES
('업데이트'),
('배우별'),
('취향별'),
('인기100');

-- 插入二级分类数据
-- 업데이트 一级分类的二级分类
INSERT INTO subcategories (category_id, name) VALUES
((SELECT id FROM categories WHERE name = '업데이트'), '전체'),
((SELECT id FROM categories WHERE name = '업데이트'), '한국'),
((SELECT id FROM categories WHERE name = '업데이트'), '일본'),
((SELECT id FROM categories WHERE name = '업데이트'), '서양'),
((SELECT id FROM categories WHERE name = '업데이트'), '중화권'),
((SELECT id FROM categories WHERE name = '업데이트'), '동남아');

-- 배우별 一级分类的二级分类
INSERT INTO subcategories (category_id, name) VALUES
((SELECT id FROM categories WHERE name = '배우별'), '전체'),
((SELECT id FROM categories WHERE name = '배우별'), '한국'),
((SELECT id FROM categories WHERE name = '배우별'), '일본'),
((SELECT id FROM categories WHERE name = '배우별'), '서양'),
((SELECT id FROM categories WHERE name = '배우별'), '중화권'),
((SELECT id FROM categories WHERE name = '배우별'), '동남아');

-- 취향별 一级分类的二级分类
INSERT INTO subcategories (category_id, name) VALUES
((SELECT id FROM categories WHERE name = '취향별'), '전체'),
((SELECT id FROM categories WHERE name = '취향별'), '한국'),
((SELECT id FROM categories WHERE name = '취향별'), '일본'),
((SELECT id FROM categories WHERE name = '취향별'), '서양'),
((SELECT id FROM categories WHERE name = '취향별'), '중화권'),
((SELECT id FROM categories WHERE name = '취향별'), '동남아');

-- 인기100 一级分类的二级分类
INSERT INTO subcategories (category_id, name) VALUES
((SELECT id FROM categories WHERE name = '인기100'), '주간BEST'),
((SELECT id FROM categories WHERE name = '인기100'), '월간BEST'),
((SELECT id FROM categories WHERE name = '인기100'), '전체BEST'),
((SELECT id FROM categories WHERE name = '인기100'), '찜목록BEST');
