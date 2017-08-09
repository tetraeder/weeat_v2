class AddNewTablesToProject < ActiveRecord::Migration[5.1]
  def change

    create_table :restaurants do |t|
      t.references :genre, foreign_key: true
      t.integer :rating
      t.boolean :card
      t.text :address
      t.integer :max_delivery_time
      t.text :name
      t.timestamps
    end

    create_table :comments do |t|
      t.string :name
      t.text :description
      t.integer :rating
      t.belongs_to :restaurant, index: true
      t.timestamps
    end
  end
end


