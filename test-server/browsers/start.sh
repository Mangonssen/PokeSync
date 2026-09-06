#!/usr/bin/env bash
set -euo pipefail

export DISPLAY="${DISPLAY:-:99}"
export PAGE_URL="${PAGE_URL:-http://pokesync/}"

SCREEN_WIDTH="${SCREEN_WIDTH:-1920}"
SCREEN_HEIGHT="${SCREEN_HEIGHT:-1080}"
SCREEN_COLOR_DEPTH="${SCREEN_COLOR_DEPTH:-24}"

echo "======================================"
echo " Starting browser environment"
echo "======================================"
echo "DISPLAY:      ${DISPLAY}"
echo "Screen:       ${SCREEN_WIDTH}x${SCREEN_HEIGHT}x${SCREEN_COLOR_DEPTH}"
echo "Page:         ${PAGE_URL}"
echo "======================================"

# Clean up a stale X lock/socket if a previous container process
# left one behind.
rm -f "/tmp/.X${DISPLAY#:}-lock"
rm -f "/tmp/.X11-unix/X${DISPLAY#:}"

echo "Starting Xvfb..."

Xvfb "$DISPLAY" \
    -screen 0 "${SCREEN_WIDTH}x${SCREEN_HEIGHT}x${SCREEN_COLOR_DEPTH}" \
    -ac \
    +extension GLX \
    +render \
    -noreset \
    >/tmp/xvfb.log 2>&1 &

XVFB_PID=$!

# Make sure Xvfb doesn't immediately crash.
sleep 0.5

if ! kill -0 "$XVFB_PID" 2>/dev/null; then
    echo "ERROR: Xvfb failed to start."
    cat /tmp/xvfb.log
    exit 1
fi

echo "Waiting for X display ${DISPLAY}..."

# Wait until the X server is actually accepting connections.
for i in {1..30}; do
    if xdpyinfo -display "$DISPLAY" >/dev/null 2>&1; then
        echo "X display ${DISPLAY} is ready."
        break
    fi

    if [ "$i" -eq 30 ]; then
        echo "ERROR: X display ${DISPLAY} never became ready."
        cat /tmp/xvfb.log
        exit 1
    fi

    sleep 0.2
done

echo "Starting Fluxbox..."
fluxbox \
    >/tmp/fluxbox.log 2>&1 &

echo "Starting VNC server..."
x11vnc \
    -display "$DISPLAY" \
    -forever \
    -shared \
    -rfbport 5900 \
    -nopw \
    >/tmp/x11vnc.log 2>&1 &

echo "Starting noVNC..."
websockify \
    --web=/usr/share/novnc/ \
    6080 \
    localhost:5900 \
    >/tmp/novnc.log 2>&1 &

echo "Waiting for ${PAGE_URL}..."

until curl -fsS "$PAGE_URL" >/dev/null; do
    sleep 1
done

echo "Website is available."

echo "Opening ${PAGE_URL} in all browsers..."

exec node /app/run-browsers.js
