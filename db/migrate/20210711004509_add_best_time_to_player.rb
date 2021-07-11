class AddBestTimeToPlayer < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :best_time, :string
    add_column :players, :best_mistakes, :string
  end
end
