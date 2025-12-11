# AWS Cloud Architecture Blueprint for a Next-Generation 3D E-Commerce Platform
**Brite Sendedza • Chriswell Maluleke • Lindokuhle Dlamini • Nayana Mathadeen • Onalenna Jack Matlaila**  
**05 December 2025**

---

## The AWS Architecture
(Architecture diagram referenced from project PDF)

---

# Why We Chose Each AWS Service

---

## Frontend

### Route 53  
Used for DNS management and routing traffic to the application. Works like an internet phonebook, translating domain names into IP addresses.

### CloudFront  
A global Content Delivery Network (CDN) that caches static content at edge locations to reduce latency and improve load times.

### Amplify Hosting  
A managed hosting service for frontend applications. Provides CI/CD, automated builds, SSL/TLS, and seamless deployments.

---

## Backend

### App Runner  
Runs and scales containerized backend services without requiring server management. Simple, fast deployment for container workloads.

### AWS Lambda  
Serverless compute for event-driven tasks such as background jobs or lightweight API processing. Low-cost and scalable.

---

## Storage

### Amazon S3  
Stores static files and 3D assets with durability, high availability, and scalability.

---

## Databases

### DynamoDB (Catalog)  
A NoSQL database used for high-performance product catalog storage. Optimized for low-latency read/write operations.

### RDS PostgreSQL (Orders & Users)  
A relational database suitable for user accounts, orders, and transactional data. Supports ACID compliance and Multi-AZ deployment.

---

## Performance

### ElastiCache Redis  
An in-memory cache for frequently accessed data. Improves performance and reduces load on databases.

### SQS + Lambda Workers  
Handles asynchronous background task processing (e.g., sending confirmation emails, updating inventory). Decouples system components for scalability.

---

## Security

### AWS WAF  
A firewall that protects the application from web exploits like SQL injection and cross-site scripting.

### AWS Shield  
Provides protection against DDoS attacks.

### KMS  
Manages encryption keys for secure data protection.

### Secrets Manager  
Secure storage for credentials, API keys, and database passwords.

---

## Monitoring & Cost Control

### CloudWatch  
Provides logs, metrics, and alarms to monitor system health and application performance.

### Cost Explorer  
Tracks AWS spending and helps analyze and optimize costs.

---

# How Our Architecture Meets the Five Requirements

## 1. High Availability
- S3 Multi-AZ storage  
- RDS Multi-AZ failover  
- CloudFront global caching  
- Scalable services like Lambda and App Runner  
- ElastiCache replication  

## 2. Scalability
- S3 provides unlimited storage  
- Lambda auto-scales automatically  
- App Runner scales containers based on traffic  
- CloudFront supports millions of global users  

## 3. Performance
- CloudFront reduces latency  
- ElastiCache speeds up hot data retrieval  
- Load balancing distributes traffic efficiently  
- CloudWatch helps detect performance bottlenecks  

## 4. Security
- WAF blocks malicious traffic  
- Shield protects against DDoS  
- KMS encrypts sensitive data  
- Secrets Manager secures application credentials  

## 5. Cost Optimization
- Cost Explorer monitors and analyzes costs  
- Serverless compute minimizes cost  
- Caching reduces database usage  
- Scalable architecture prevents overprovisioning  

---

# Design Trade-Offs and Challenges

### 1. App Runner vs ECS/Lambda  
App Runner is easier to use but provides less control and may cost more for long-running workloads.

### 2. DynamoDB + RDS Combo  
Great for performance, but increases complexity and requires two data models.

### 3. CloudFront + Amplify  
Cache invalidation must be carefully managed to avoid serving outdated content.

### 4. High Availability vs Cost  
Multi-AZ deployments, CDN usage, and autoscaling increase reliability but cost more.

### 5. Redis (ElastiCache)  
Very fast, but volatile. Requires failover strategies and adds operational complexity.

### 6. SQS + Lambda Workers  
Adds moving components like queues, retry logic, and DLQs.

### 7. Security Layers  
WAF, IAM policies, Shield, and KMS require experience and continuous tuning.

### 8. Overall Complexity  
Highly scalable architecture but difficult to manage without solid monitoring and documentation.

---

# Contributors
- Brite Sendedza  
- Chriswell Maluleke  
- Lindokuhle Dlamini  
- Nayana Mathadeen  
- Onalenna Jack Matlaila

---

# End of Document
