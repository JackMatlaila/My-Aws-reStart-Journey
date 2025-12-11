# AWS Databases & Analytics — Study Notes

## 🟦 What Is a Database?
- A database is an **organized storage system** for information (text, numbers, images, documents).
- Managed using a **DBMS** (Database Management System).
- Helps save, search, update, and organize data efficiently.

### Why Databases Are Important
- Run day-to-day operations (customers, suppliers, internal systems)
- Ensure:
  - Efficient scaling  
  - Data integrity  
  - Data security  
  - Data analytics for insights

---

# 🟦 Types of Databases

### 1️⃣ Relational Databases (SQL)
- Store data in **tables** with rows/columns  
- Use SQL  
- Great for structured data  
- Examples: **RDS, Aurora, MySQL, PostgreSQL**

### 2️⃣ NoSQL Databases
- Store unstructured or semi-structured data  
- Key-value, document store  
- Examples: **DynamoDB, DocumentDB**

### 3️⃣ Graph Databases
- Store **nodes + relationships**  
- Great for social networks, fraud detection  
- Example: **Amazon Neptune**

### 4️⃣ In-Memory Databases
- Data stored in RAM → extremely fast  
- Examples: **ElastiCache (Redis/Memcached), MemoryDB**

### 5️⃣ Time Series Databases
- Data tracked over time (logs, sensors)  
- Example: **Amazon Timestream**

### 6️⃣ Data Warehouses
- Analytics over massive datasets  
- Example: **Amazon Redshift**

### 7️⃣ Ledger Databases
- Immutable, cryptographically verifiable logs  
- Example: **Amazon QLDB**

---

# 🟦 AWS Database Services Overview
- Amazon RDS  
- Amazon Aurora  
- Amazon DynamoDB  
- Amazon ElastiCache  
- Amazon Neptune  
- AWS DMS (Database Migration Service)

---

# 🟦 Amazon RDS (Relational Database Service)
Fully managed relational database service.

### Features
- Automated backups & patching  
- Multi-engine support  
- Multi-AZ for high availability  
- Read replicas for scaling  
- Monitoring (CloudWatch)  
- Managed security & encryption  
- Easy scaling of compute + storage  

### RDS Deployment Patterns
**Multi-AZ** → High availability  
**Read Replicas** → Performance scaling  

### Shared Responsibility
AWS handles:
- Hardware, infra, backups, OS patching  
You handle:
- Query tuning  
- Schema optimization  
- Performance monitoring  

### RDS Pricing
Charged for:
- Compute instance hours  
- Storage  
- IOPS (if provisioned)  
- Backups  
- Data transfer  
Typical small workload: **$15–$30/month**

---

# 🟦 Amazon Aurora
High-performance, cloud-native relational database.

### Key Features
- **5× faster than MySQL**, **3× faster than PostgreSQL**  
- Highly available (multi-AZ replication)  
- Auto-scaling up to **128 TB**  
- Self-healing storage  
- Fully managed  
- Costs ~20% more than RDS but more efficient  

### Aurora & RDS
- Aurora is an **engine option inside RDS**  
- Uses same tools: Console, CLI, SDK  
- Cluster-based architecture  

### Migrations
- Snapshot restore  
- Replication from MySQL/PostgreSQL  

### Aurora Pricing
You pay for:
- Compute (ACUs for serverless)  
- Storage + I/O  
- Backups  
- Global DB features  

---

# 🟦 Amazon ElastiCache
Fully managed **in-memory** key-value database.

### Use Cases
- Web session store  
- Database caching  
- Leaderboards  
- Real-time analytics dashboards  

### Key Facts
- Not publicly accessible  
- Supports **Redis** & **Memcached**  
- Used for ultra-fast reads (microseconds latency)

### Pricing
- Free tier: 750hrs/month (t2.micro/t3.micro)  
- On-demand nodes  
- Reserved nodes (up to 60% savings)  

---

# 🟦 Amazon DynamoDB (NoSQL)
Fully managed, serverless NoSQL key-value database.

### Why DynamoDB?
- Single-digit millisecond performance  
- Scales to **millions of requests/sec**  
- Serverless + fully managed  
- Automatic multi-region replication  
- Backup and restore built-in  

### Benefits
- High availability (99.999%)  
- Global Tables for low-latency worldwide access  
- Seamless AWS integration  
- Nearly unlimited storage + throughput  

### DynamoDB Accelerator (DAX)
- In-memory caching layer  
- **Up to 10× faster read performance**  
- Reduces read latency to microseconds  

---

# 🟦 Amazon Redshift (Data Warehouse)
Petabyte-scale analytics service.

### Key Features
- Columnar storage  
- Massively parallel processing  
- Scales from GB → PB  
- SQL-based  
- Integrates with S3, Glue, QuickSight  

### What You Can Do
- Analyze millions of records  
- Build BI dashboards  
- Combine data from multiple sources  
- Train ML models  

### Benefits
- High performance  
- Cost-effective  
- SQL friendly  
- Fully managed  

---

# 🟦 Amazon EMR (Elastic MapReduce)
Managed big data processing service.

### Purpose
Run large-scale frameworks:
- Hadoop  
- Spark  
- Hive  
- HBase  
- Presto  

### Use Cases
- Data lakes  
- ETL pipelines  
- ML processing  
- Log and clickstream analysis  

### Features
- Managed cluster platform  
- Scalable  
- Cost-effective  
- Deep AWS integration  

---

# 🟦 Amazon Athena
Serverless SQL query service for data in S3.

### Key Features
- No infrastructure to manage  
- Uses ANSI SQL  
- Supports formats: CSV, JSON, Parquet, ORC  
- Fast ad-hoc querying  
- Integrated with Glue Data Catalog  

### Use Cases
- Ad-hoc analytics  
- Log analysis  
- Data lake queries  
- ETL prep  
- BI dashboards  

---

# 🟦 Amazon Neptune (Graph Database)
Purpose-built graph database for highly connected data.

### Features
- Supports Gremlin, SPARQL, openCypher  
- Query billions of relationships  
- Built-in security & backups  
- Cross-AZ availability  
- Neptune Analytics for graph insights  

### Use Cases
- Social networks  
- Recommendation engines  
- Fraud detection  
- Knowledge graphs  
- Drug discovery  

---

# 🟦 Amazon QuickSight (Business Intelligence)
Serverless BI & data visualization platform.

### Features
- Dashboards, reports, charts  
- Powered by **SPICE** in-memory engine  
- ML-based insights (anomaly detection, forecasting)  
- Connects to S3, Athena, Redshift, RDS, Aurora  

### Benefits
- Very low cost  
- No servers to manage  
- Fast & interactive dashboards  
- Can embed analytics into apps  

---

# 🟦 AWS Glue (ETL Service)
Fully managed ETL platform.

### What Glue Does
- Discover datasets (Glue Data Catalog)  
- Clean & transform data (PySpark / visual tools)  
- Build ETL pipelines  
- Prepare data for analytics & ML  

### Use Cases
- Data lakes  
- Data cleaning  
- Schema discovery  
- Batch or streaming ETL  

---

# 🟦 AWS DMS (Database Migration Service)
Fully managed database migration service.

### What It Does
- Migrates databases to AWS  
- Supports Oracle, MySQL, SQL Server, PostgreSQL, MongoDB  
- Minimal downtime (live replication)  
- Used for migrations, upgrades, and syncing  

---

# 🟦 Other AWS Database Services

### Amazon DocumentDB
- MongoDB-compatible document database  
- Used for content management, catalogs, user profiles  

### Amazon Timestream
- Purpose-built time series database  
- Ideal for IoT, DevOps metrics, monitoring  

### Amazon QLDB
- Immutable, cryptographically verifiable ledger  
- Great for audit trails, financial records  

### Amazon Managed Blockchain
- Managed Ethereum / Hyperledger Fabric service  
- Used for supply chain, transaction logging, smart contracts  

---

# ✅ Quick Comparison Summary

| Service | Type | Best Use |
|--------|------|----------|
| RDS | Relational | Traditional SQL apps |
| Aurora | High-performance relational | Enterprise workloads |
| DynamoDB | NoSQL | Massive scale, low-latency apps |
| ElastiCache | In-memory | Caching & real-time performance |
| Neptune | Graph | Relationship-heavy apps |
| Redshift | Data warehouse | Analytics & BI |
| EMR | Big data processing | Hadoop/Spark workloads |
| Athena | Serverless SQL | Query S3 data |
| QuickSight | BI | Dashboards & visualizations |
| Glue | ETL | Data transformation |
| DMS | Migration | Move DBs to AWS |

