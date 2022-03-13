# == Schema Information
#
# Table name: comments
#
#  id          :bigint           not null, primary key
#  content     :text(65535)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  articles_id :bigint           not null
#
# Indexes
#
#  index_comments_on_articles_id  (articles_id)
#
require "test_helper"

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
