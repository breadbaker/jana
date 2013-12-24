class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :token
      t.string :pwd_hash

      t.timestamps
    end
  end
end
