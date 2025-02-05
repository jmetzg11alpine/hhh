package backend

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/hello", HelloHandler)
	}
}

func HelloHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Hello from backend! you donkey"})
}
