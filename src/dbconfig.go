package dbconfig

type MockConnectionDB struct {
  connected bool
}
func NewMockConnectionDB() *MockConnectionDB {
  return &MockConnectionDB{connected: false}
}
func (m *MockConnectionDB) Connect() error {
  if m.connected {
    return errors.New("already connected")
  }
  m.connected = true
  fmt.Println("server connection")
  return nil
}
func (m *MockConnectionDB) Disconnect() error {
  if !m.connected {
    return errors.New("not connected")
  }
  m.connected = false
  fmt.Println("server disconnect")
  return nil
}
