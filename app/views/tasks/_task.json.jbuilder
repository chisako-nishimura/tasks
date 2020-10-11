# json.extract! task, :id, :title, :content, :user_id, :status, :created_at, :updated_at
# json.url task_url(task, format: :json)


json.id task.id
json.title task.title
json.content task.content
json.status task.status
json.user_id task.user_id
json.user task.user.username
json.created_by task.created_by
json.creator task.creator.username

