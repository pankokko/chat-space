

## chatspace

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :groups, through: :groups_user
- has_many :comments
  has_many :groups_user 

## groups_userテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false,foreign_key: true|
### Association
- belongs_to :user
- belongs_to : group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|text||null: false|
### Association
- has_many :users through: groups_user
  has_many :groups_user
　has_many :comments

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
 belongs_to :group