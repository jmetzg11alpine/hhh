package main

import (
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"hhh/backend"
)

func main() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

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

	r.Run(":8080")
}
