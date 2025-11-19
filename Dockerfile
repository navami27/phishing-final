# 1. Use Python 3.10 as the base image
FROM python:3.10-slim

WORKDIR /app

# 2. Install Node.js and System Tools
# We install Node 18 (standard LTS) alongside Python
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    gcc \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 3. Install Python Dependencies (Langflow)
RUN pip install langflow==1.0.18 uvicorn

# 4. Install Node.js Dependencies
# (Docker expects a package.json file to exist)
COPY package.json .
RUN npm install

# 5. Copy the rest of the project files
COPY . .

# 6. Expose Ports
# 7860 = Langflow AI
# 3000 = Node.js Server
EXPOSE 7860
EXPOSE 3000

# 7. Create the Startup Script
# This runs Langflow in the background & Node.js in the foreground
RUN echo '#!/bin/bash\n\
export LANGFLOW_SKIP_AUTH_AUTO_LOGIN=true\n\
python start_langflow.py & \n\
sleep 10 \n\
node server.js' > start.sh && chmod +x start.sh

# 8. Run the startup script
CMD ["./start.sh"]