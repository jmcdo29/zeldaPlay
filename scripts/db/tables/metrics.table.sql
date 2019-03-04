CREATE TABLE IF NOT EXISTS metrics (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00M')
  ,method TEXT NOT NULL
  ,route TEXT NOT NULL
  ,response_status INTEGER NOT NULL
  ,response_time INTENGER NOT NULL
  ,time_of_transaction TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
