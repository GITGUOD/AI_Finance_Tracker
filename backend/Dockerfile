FROM node:18-bookworm

# Install Python and venv
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

WORKDIR /app

# Copy all files
COPY . /app

# Set up Python virtual environment and install dependencies
RUN python3 -m venv /opt/venv \
  && /opt/venv/bin/pip install --upgrade pip \
  && /opt/venv/bin/pip install -r requirements.txt

# Make venv default
ENV PATH="/opt/venv/bin:$PATH"

# Install Node dependencies
RUN npm install

# Expose ports
EXPOSE 5000 5001

# Start both backend processes (Python Flask + Node)
CMD bash -c "python3 main.py & npx ts-node src/index.ts"
