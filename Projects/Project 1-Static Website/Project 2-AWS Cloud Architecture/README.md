## AWS 3D E-Commerce Platform Architecture  

#AWS re/Start Portfolio Project

## Project Overview

This project demonstrates the design of a scalable, secure, and highly available AWS cloud architecture for a next-generation 3D e-commerce platform.

The goal was not to deploy an application, but to design a production-ready cloud architecture that meets real business and technical requirements using AWS best practices.

The platform enables users to interact with high-resolution 3D product models, which introduces challenges around:
- Large file delivery  
- Traffic spikes  
- Performance consistency  
- Cost control  

This architecture was designed to address those challenges using managed AWS services.

---

## AWS re/Start Learning Objectives Demonstrated

This project demonstrates competency in:

- AWS global infrastructure concepts  
- Designing highly available and scalable architectures  
- Selecting appropriate AWS services based on use case and trade-offs  
- Applying security best practices  
- Designing for performance and cost optimisation  
- Understanding real-world cloud architecture decisions  

---

## Architecture Summary

The solution follows a 3-tier AWS architecture deployed within a VPC.

![3D Architecture](assets/3D-Architecture.jpeg)

---

### Presentation Tier

**Services Used**
- Amazon Route 53  
- Amazon CloudFront  
- AWS Amplify Hosting  

**Purpose**
- Route users to the application  
- Deliver static content and 3D assets with low latency  
- Improve global performance through edge caching  

---

### Application Tier

**Services Used**
- AWS App Runner  
- AWS Lambda  
- Amazon SQS  

**Purpose**
- Host backend application logic  
- Process event-driven and asynchronous workloads  
- Automatically scale based on demand  

---

### Data Tier

**Services Used**
- Amazon DynamoDB  
- Amazon RDS (PostgreSQL)  
- Amazon ElastiCache (Redis)  

**Purpose**
- Store structured transactional data securely  
- Handle high-traffic catalog access  
- Improve performance using in-memory caching  

---

## AWS Services Used and Justification

### Amazon Route 53
- DNS routing with high availability  
- Directs users to the correct AWS resources  

---

### Amazon CloudFront
- Content Delivery Network (CDN)  
- Caches large 3D assets closer to users  
- Reduces latency and origin load  

---

### Amazon S3
- Stores static files and 3D assets  
- Highly durable and scalable  
- Cost-effective for large objects  

---

### AWS App Runner
- Hosts containerised backend services  
- Simplifies deployment and scaling  
- Reduces operational overhead  

---

### AWS Lambda
- Executes small event-driven tasks  
- No server management required  
- Automatically scales  

---

### Amazon DynamoDB
- NoSQL database for catalog data  
- Low latency at high traffic volumes  
- Fully managed and scalable  

---

### Amazon RDS (PostgreSQL)
- Relational database for users and orders  
- ACID compliance for transactional integrity  
- Managed backups and failover  

---

### Amazon ElastiCache (Redis)
- In-memory caching  
- Improves session and cart performance  
- Reduces database load  

---

### Security Services
- AWS WAF – protects against web attacks  
- AWS Shield – DDoS protection  
- AWS KMS – encryption key management  
- AWS Secrets Manager – secure credential storage  

---

### Monitoring and Cost Management
- Amazon CloudWatch – logging and monitoring  
- AWS Cost Explorer – cost visibility and optimisation  

---

## How the Architecture Meets AWS Design Requirements

### High Availability
- Multi-AZ capable services  
- CloudFront global edge network  
- Managed database failover  

---

### Scalability
- Serverless and managed compute  
- Auto-scaling built into services  
- No manual capacity planning required  

---

### Performance
- CDN-based asset delivery  
- Redis caching for frequently accessed data  
- Load distribution across services  

---

### Security
- Network isolation using VPC  
- Private backend and database access  
- Encrypted secrets and data protection  

---

### Cost Optimisation
- Pay-for-use services  
- Auto-scaling to avoid idle resources  
- S3 lifecycle policies for storage savings  

---

## Design Trade-Offs Considered

| Decision | Trade-Off |
|--------|----------|
| App Runner vs EC2 | Less control, faster deployment |
| DynamoDB and RDS | Increased complexity, better performance |
| Multi-AZ | Higher cost, improved reliability |
| CloudFront | Data transfer cost, improved user experience |

---

## Key Skills Demonstrated (AWS re/Start)

- Cloud architecture design  
- AWS service selection and justification  
- High availability and fault tolerance  
- Security best practices  
- Performance optimisation  
- Cost-aware cloud design  
- Systems thinking and problem solving  

---

## Reflection and Learning Outcomes

This project reinforced that cloud architecture is about decision-making, not just service usage.

Key takeaways:
- CDN usage is essential for media-heavy applications  
- Different data workloads require different databases  
- Managed services reduce operational risk  
- Designing for failure is a best practice, not an edge case  
- Cost optimisation must be considered from the start  

---

## Conclusion

This AWS architecture demonstrates a production-ready, scalable, and secure design suitable for a global 3D e-commerce platform.
The project aligns closely with AWS re/Start learning objectives and reflects practical cloud design skills applicable to real-world environments.
