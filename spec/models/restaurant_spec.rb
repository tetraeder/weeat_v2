require 'rails_helper'

RSpec.describe Restaurant, :type => :model do

  describe 'restaurant validations' do
    context 'check restaurants' do
      it "is not a valid restarant without genre" do
        restaurant = Restaurant.new(name: "Japanika")
        expect(restaurant).to_not be_valid
      end

      it "is a valid restaurant with a genre" do
        genre = Genre.new(name: "Asian", image_url: "a")
        restaurant = Restaurant.new(name: "Japanika", genre: genre)
        expect(restaurant).to be_valid
        expect(genre).to be_valid
      end
    end

    context 'check restaurant logic' do
      # let!(:restaurant) {FactoryGirl.create(:restaurant)}
      let!(:restaurant) {FactoryGirl.create(:restaurant)}
      let!(:c_1) {FactoryGirl.create(:comment, :comment_1, restaurant: restaurant)}
      let!(:c_2) {FactoryGirl.create(:comment, :comment_3, restaurant: restaurant)}

      it "is supposed to add reviews to restaurants" do

        expect(restaurant).to be_valid

        expect(restaurant.comments.length).to eql(2)

      end

      it "is supposed to calculate review ratings" do

        expect(restaurant).to be_valid

        expect(restaurant.rating).to eql(2)

      end
    end
  end
end