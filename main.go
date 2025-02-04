package main

import (
	"strings"

	"github.com/gin-gonic/gin"

	"hhh/backend"
)

func main() {
	r := gin.Default()

	r.Static("/_app", "./frontend/build/_app")
	r.Static("/assets", "./frontend/build/assets")
	r.StaticFile("/favicon.png", "./frontend/build/favicon.png")
	r.Use(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api") {
			c.Next()
			return
		}

		c.File("./frontend/build/index.html")
	})

	backend.RegisterRoutes(r)

	// api := r.Group("/api")
	// {
	// 	api.GET("/hello", func(c *gin.Context) {
	// 		c.JSON(http.StatusOK, gin.H{"message": "Hello from backend!"})
	// 	})
	// }

	r.Run(":8080")
}
