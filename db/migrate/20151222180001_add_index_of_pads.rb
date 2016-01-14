class AddIndexOfPads < ActiveRecord::Migration
  def change
    add_reference :sections, :chapter, index: true
    add_reference :chapters, :note, index: true
  end
end
