FROM python:3.12-slim

LABEL maintainer="manufactos-team"

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Non-root user
RUN useradd -m -r manufactos
USER manufactos

# Install Python dependencies
COPY --chown=manufactos:manufactos requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Copy application
COPY --chown=manufactos:manufactos . .

EXPOSE 8087

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8087", "--workers", "2"]
