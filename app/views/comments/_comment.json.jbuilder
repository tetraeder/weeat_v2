json.extract! comment, :id, :name, :description, :rating, :created_at, :updated_at, :restaurant_id
json.url comment_url(comment, format: :json)
