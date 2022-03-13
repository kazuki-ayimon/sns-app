class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :articles, null: false
      t.text :content, null: false
      t.timestamps
    end
  end
end
