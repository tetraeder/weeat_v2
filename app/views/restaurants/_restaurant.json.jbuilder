json.extract! restaurant, :id, :genre_id, :rating, :card, :address, :max_delivery_time, :created_at, :updated_at, :name, :image_url
json.url restaurant_url(restaurant, format: :json)
