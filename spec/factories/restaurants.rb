FactoryGirl.define do

  factory :restaurant do
    association :genre
    name 'name'
  end
end
