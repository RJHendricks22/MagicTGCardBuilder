DROP TABLE IF EXISTS colors CASCADE;
DROP TABLE IF EXISTS rarity CASCADE;
DROP TABLE IF EXISTS built CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  color VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  image text
);


CREATE TABLE rarity (
  id SERIAL PRIMARY KEY,
  name text,
  rare_image text
);
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text,
  password text
);

CREATE TABLE built (
  built_id SERIAL PRIMARY KEY,
  id_color INTEGER, FOREIGN KEY(id_color) REFERENCES colors(id),
  id_rarity INTEGER, FOREIGN KEY(id_rarity) REFERENCES rarity(id),
  titleText text,
  flavorText text,
  backgroundImg text NOT NULL,
  id_attack text,
  id_defend text,
  id_username INTEGER, FOREIGN KEY(id_username) REFERENCES users(id)
);
INSERT INTO colors (color, type, image)
VALUES
('white','sorcery','http://i.imgur.com/bwQxDFm.png'),
('white','instant','http://i.imgur.com/YXMz142.png'),
('white','creature','http://i.imgur.com/dZp9u4w.png'),
('white','enchantment','http://i.imgur.com/u3RPBKZ.png'),
('white','land','http://i.imgur.com/nO1Alsb.png'),
('white','creature','http://i.imgur.com/qCJBe2f.png'),
('green','creature','http://i.imgur.com/aGPddBV.png'),
('red','creature','http://i.imgur.com/qT5GHAv.png'),
('blue','instant','http://i.imgur.com/Qy5DTap.png'),
('blue','creature','http://i.imgur.com/RH0qTcF.png'),
('blue','creature','http://i.imgur.com/T3QJATp.png'),
('black','instant','http://i.imgur.com/1zcXbyo.png'),
('black','creature','http://i.imgur.com/3tC2reW.png');

INSERT INTO rarity (name, rare_image)
VALUES
('common','http://i.imgur.com/GUaQEvq.png'),
('uncommon','http://i.imgur.com/2eI0RhQ.png'),
('rare','http://i.imgur.com/S6Flg4G.png'),
('mythic','http://i.imgur.com/sZyZQIT.png');

