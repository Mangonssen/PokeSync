FROM mcr.microsoft.com/playwright:v1.63.0-noble

ENV DEBIAN_FRONTEND=noninteractive
ENV DISPLAY=:99
ENV NODE_ENV=production

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        x11vnc \
        xvfb \
        x11-utils \
        fluxbox \
        novnc \
        websockify \
        ca-certificates \
        curl \
        && \
    rm -rf /var/lib/apt/lists/*

# Install Google Chrome.
RUN npx playwright install chrome

WORKDIR /app

# Install the exact same Playwright version as the image.
RUN npm init -y && \
    npm install playwright@1.63.0

COPY run-browsers.js /app/run-browsers.js
COPY start.sh /start.sh

RUN chmod +x /start.sh

CMD ["/start.sh"]
