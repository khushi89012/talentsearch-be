paylod 
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "headers": {
    "Authorization": "Bearer <token>"
  },
  "queryParams": null,
  "successResponse": [
    {
      "userId": 1,
      "id": "khushshhi",
      "title": "Sample title",
      "body": "Sample body content"
    }
  ],
  "errorResponse": {
    "error": "Unauthorized",
    "message": "Invalid token"
  }
}
