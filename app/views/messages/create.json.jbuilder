json.(@message, :content, :image)
json.user_name @message.user.name
json.id @message.id
json.created_at @message.created_at.strftime(“%Y/%m/%d %H:%M”)