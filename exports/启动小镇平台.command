#!/bin/zsh
cd "$(dirname "$0")"

PORT=5588
LOG_FILE="/tmp/town-platform-5588.log"

python3 - "$PORT" "$PWD" > "$LOG_FILE" 2>&1 <<'PY' &
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

port = int(sys.argv[1])
root = sys.argv[2]
os.chdir(root)

class FallbackHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path in ("", "/"):
            self.path = "/index.html"
        elif not os.path.exists(path.lstrip("/")) and not os.path.splitext(path)[1]:
            self.path = "/index.html"
        return super().do_GET()

server = ThreadingHTTPServer(("127.0.0.1", port), FallbackHandler)
server.serve_forever()
PY

sleep 1
open "http://127.0.0.1:${PORT}/"

echo "小镇平台已启动："
echo "http://127.0.0.1:${PORT}/"
echo ""
echo "这个窗口可以最小化；关闭窗口后如需停止服务，可在终端执行："
echo "pkill -f town-platform-5588"
echo ""
echo "按任意键关闭这个提示窗口，网页会继续打开。"
read -k 1
