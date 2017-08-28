require 'rails_helper'

RSpec.describe Comment, :type => :model do

  describe 'comment validations' do
    context 'check restaurants' do

      let!(:restaurant) {FactoryGirl.create(:restaurant)}

      it "is a valid review" do
        comment = Comment.new(name: "Comment", rating: 2, restaurant: restaurant)
        expect(comment).to be_valid
      end

      it "is not a valid restarant without restaurant" do
        comment = Comment.new(name: "Comment", rating: 2)
        expect(comment).to_not be_valid
      end

      it "is not a valid restarant without rating" do
        comment = Comment.new(name: "Comment")
        expect(comment).to_not be_valid
      end

      it "is not a valid restarant without numerical rating" do
        comment = Comment.new(name: "Comment", rating: "a")
        expect(comment).to_not be_valid
      end

      it "is not a valid restarant without valid numerical rating" do
        comment = Comment.new(name: "Comment", rating: 8)
        expect(comment).to_not be_valid
      end

    end
  end
end