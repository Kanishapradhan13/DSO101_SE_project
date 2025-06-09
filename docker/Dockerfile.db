# File: docker/Dockerfile.db
# Custom PostgreSQL with BMI Calculator schema

FROM postgres:12-alpine

# Set environment variables
ENV POSTGRES_DB=bmi_calculator
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=psswd

# Copy initialization scripts
COPY init-scripts/ /docker-entrypoint-initdb.d/

# Copy BMI table creation script
RUN mkdir -p /docker-entrypoint-initdb.d
COPY <<EOF /docker-entrypoint-initdb.d/01-create-bmi-table.sql
-- Create BMI records table
CREATE TABLE IF NOT EXISTS bmi_records (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  height DECIMAL(5,2) NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  age INTEGER NOT NULL,
  bmi DECIMAL(5,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bmi_records_user_id ON bmi_records(user_id);
CREATE INDEX IF NOT EXISTS idx_bmi_records_created_at ON bmi_records(created_at);
EOF

EXPOSE 5432