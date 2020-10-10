class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :content
      t.integer :created_by, null: false
      t.references :user, null: false
      t.integer :status

      t.timestamps
    end
  end
end
