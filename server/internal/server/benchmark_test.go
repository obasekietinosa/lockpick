package server

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/obasekietinosa/lockpick-api/internal/config"
	"github.com/obasekietinosa/lockpick-api/internal/socket"
	"github.com/obasekietinosa/lockpick-api/internal/store"
)

// PerfStore adds artificial latency to GetPlayer to simulate DB roundtrip
type PerfStore struct {
	*MockStore
	GetPlayerLatency time.Duration
}

func (m *PerfStore) GetPlayer(ctx context.Context, playerID string) (*store.Player, error) {
	if m.GetPlayerLatency > 0 {
		time.Sleep(m.GetPlayerLatency)
	}
	return m.MockStore.GetPlayer(ctx, playerID)
}

func BenchmarkHandleSelectPin(b *testing.B) {
	mockStore := NewMockStore()
	// 1ms latency to make the improvement obvious
	perfStore := &PerfStore{MockStore: mockStore, GetPlayerLatency: 1 * time.Millisecond}
	hub := socket.NewHub(&config.Config{}, perfStore)

	// Start hub to consume broadcasts
	go hub.Run()

	srv := NewServer(&config.Config{}, hub, perfStore)

	roomID := "bench_room"
	// TimerDuration 0 to avoid starting timers logic overhead
	roomConfig := &store.GameConfig{PinLength: 4, TimerDuration: 0}

	reqBody, _ := json.Marshal(SelectPinRequest{
		Pins: []string{"4444", "5555", "6666"},
	})

	// Run the benchmark
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		b.StopTimer()

		// Reset state
		// We are using the internal maps of mockStore.
		// Since we reuse IDs, we just overwrite them.

		// 1. Save Room
		room := &store.Room{
			ID:     roomID,
			Status: "waiting",
			Config: roomConfig,
		}
		mockStore.SaveRoom(context.Background(), room)

		// 2. Save Player 1 (Already Ready)
		p1 := &store.Player{ID: "p1", RoomID: roomID, Pins: []string{"1111", "2222", "3333"}}
		mockStore.SavePlayer(context.Background(), p1)

		// 3. Save Player 2 (Submitting now, no pins yet)
		p2 := &store.Player{ID: "p2", RoomID: roomID}
		mockStore.SavePlayer(context.Background(), p2)

		req := httptest.NewRequest("POST", "/games/"+roomID+"/players/p2/pin", bytes.NewBuffer(reqBody))
		req.SetPathValue("gameID", roomID)
		req.SetPathValue("playerID", "p2")
		w := httptest.NewRecorder()

		b.StartTimer()
		srv.Handler.ServeHTTP(w, req)
	}
}
