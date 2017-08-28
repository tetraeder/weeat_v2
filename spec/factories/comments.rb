FactoryGirl.define do

  factory :comment do
    association :restaurant
    rating 0
    name 'test'
  end

  trait :comment_1 do
    rating 1
    name 'test'
  end

  trait :comment_2 do
    rating 2
    name 'test'
  end

  trait :comment_3 do
    rating 3
    name 'test'
  end
end

