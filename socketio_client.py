import websocket

def on_message(ws, message):
    print(f"📩 Dữ liệu từ server: {message}")

def on_error(ws, error):
    print(f"❌ Lỗi WebSocket: {error}")

def on_close(ws, code, msg):
    print(f"🔴 Kết nối WebSocket đã đóng! Mã: {code}, Thông báo: {msg}")

def on_open(ws):
    print("✅ Kết nối WebSocket thành công!")

ws = websocket.WebSocketApp(
    "wss://api.vemaybay.one/noti/socket.io/?userId=1006684&isSupport=false&EIO=4&transport=websocket",
    on_message=on_message,
    on_error=on_error,
    on_close=on_close,
    on_open=on_open
)

ws.run_forever()