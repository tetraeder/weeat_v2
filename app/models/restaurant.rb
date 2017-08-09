class Restaurant < ApplicationRecord
  belongs_to :genre
  has_many :comments, dependent: :destroy

  def rating
    cts = comments.map(&:rating)

    if (cts.present?)
      cts.sum / cts.length
    end
  end


end
