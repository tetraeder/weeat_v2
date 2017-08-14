class Comment < ApplicationRecord
  belongs_to :restaurant
  validates :name, :rating, presence: true
  validates :rating, numericality: { greater_than: 0, less_than_or_equal_to: 3}
end
