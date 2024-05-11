package dbconfig
import (
	"fmt"
)
type Connection struct {
  }
  
func Connect() (*Connection, error) {
}

func (c *Connection) Disconnect() error {
}