# AWS Security Services — Study Notes (Part 1 & Part 2)

---

# 🟦 AWS Identity and Access Management (IAM)
:contentReference[oaicite:2]{index=2}

## What is IAM?
IAM is a security service that **controls access** to AWS resources. It manages:
- Authentication (who can sign in)
- Authorization (what they can access)

IAM lets you create:
- **Users**
- **Groups**
- **Roles**
- **Policies** (permissions)

---

# 🟦 IAM Core Elements

### **Principal**
Entity making a request (user, role, app, federated user).

### **Request**
When the principal interacts via Console, CLI, or API.

### **Authentication**
Verifying identity using:
- Console → username + password
- CLI/API → Access key + Secret key

### **Authorization**
IAM checks policies to determine **allow** or **deny**.

### **Actions**
Operations the user is allowed to perform.

### **Resources**
Objects inside AWS services (EC2 instance, S3 bucket, IAM user).

---

# 🟦 IAM Identities

### **Root User**
- Created when AWS account is created  
- Has full access  
- Should not be used except for account-level tasks

### **IAM User**
- Represents a human or application  
- Has long-term credentials  
- Gets permissions via policies

### **IAM Group**
- Collection of users  
- Policies attached to group → applied to all users inside it

### **IAM Role**
- Has **no credentials**  
- Assumed by users, services, or applications  
- Used by AWS services like EC2, Lambda

---

# 🟦 IAM Policies

### Definition
Policies define **permissions** for users, groups, and roles.

### IAM Policy Inheritance
Users inherit permissions from groups → simplifies permission management.

---

# 🟦 IAM Password Policy
- Minimum length  
- Require special characters  
- Enforce password rotation  
- Prevent password reuse  

---

# 🟦 Multi-Factor Authentication (MFA)
Adds extra protection using:
- Something you know (password)
- Something you have (device)

Used for:
- Root account  
- IAM users  

---

# 🟦 AWS CLI & SDK

### **CLI**
Command-line tool to control AWS services.

### **SDK**
Programming libraries for languages such as:
- Python (boto3)
- JavaScript
- Java
- .NET
- Go

SDK simplifies integration and security.

---

# 🟦 IAM Security Tools

### IAM Credentials Report
Account-level report listing:
- All users  
- Status of their credentials  

### IAM Access Advisor
Shows:
- Services a user can access  
- Last accessed timestamp  

---

# 🟦 IAM Best Practices
- Do NOT use root account  
- One user per physical person  
- Use groups to manage permissions  
- Enforce MFA  
- Use roles instead of sharing credentials  
- Apply least privilege  
- Rotate access keys  
- Audit with credential reports  

---

# 🟦 Shared Responsibility Model for IAM
AWS:
- Manages IAM infrastructure  

Customer:
- Manages users, policies, MFA, and permission configuration  

---

# 🟦 Amazon CloudWatch
Monitoring and observability service.

## CloudWatch Can Do:
- **Metrics**: CPU, memory, network  
- **Logs**: collect logs from applications  
- **Alarms**: send alerts or trigger actions  
- **Dashboards**  
- **Automation** (Events / EventBridge)

### CloudWatch Alarms
Can trigger:
- Auto Scaling  
- EC2 stop/terminate/reboot  
- SNS notifications  

### CloudWatch Logs
Collects from:
- Lambda  
- ECS  
- Beanstalk  
- CloudTrail  
- EC2 via agents  

---

# 🟦 AWS CloudTrail

## What is CloudTrail?
Tracks **all API activity** across your AWS account.

CloudTrail Logs Include:
- Who made the request  
- What action was taken  
- When it happened  
- Source IP  
- Affected resources  

### Why CloudTrail Matters
- Security  
- Compliance  
- Auditing  
- Troubleshooting  

---

# 🟦 AWS Shield
DDoS protection service.

## Types:
### Shield Standard
- Free  
- Automatic protection against infrastructure attacks  
- Best when combined with CloudFront + Route 53  

### Shield Advanced
- Enhanced detection  
- Layer 3, 4, 7 protection  
- Detailed attack diagnostics  

---

# 🟦 Amazon GuardDuty
Threat detection service.

### Key Features
- Continuous monitoring  
- Alerts on suspicious activity  
- Machine-learning-based anomaly detection  
- Integrates with Security Hub  

---

# 🟦 Amazon Inspector
Automated **vulnerability management** service.

Features:
- Scans EC2, ECR, Lambda  
- Detects insecure configurations  
- Produces prioritized security findings  
- Optional agent for deep checks  

---

# 🟦 AWS Trusted Advisor
Cloud optimization tool.

### Trusted Advisor Checks
- **Cost Optimization**  
- **Performance**  
- **Security**  
- **Fault Tolerance**  
- **Service Limits**  

Free: Core checks  
Business/Enterprise: Full checks + API access  

---

# 🟦 AWS Network Firewall
Managed firewall service for VPCs.

### Benefits
- Fine-grained network control  
- Prevents malicious outbound traffic  
- Central policy management  

---

# 🟦 AWS Firewall Manager
Centralized security policy management across accounts.

### Supports:
- AWS WAF  
- Shield Advanced  
- Network Firewall  
- SGs/NACLs  
- Route 53 DNS Firewall  

Automatically applies rules to:
- All accounts  
- All new resources  

---

# 🟦 AWS WAF (Web Application Firewall)
Protects applications from:
- SQL Injection  
- Cross-Site Scripting (XSS)  
- Bot attacks  
- Rate-based attacks  

Used with:
- CloudFront  
- ALB  
- API Gateway  

---

# 🟦 Penetration Testing on AWS

### Allowed Without Approval
- EC2, ELB, NAT  
- RDS  
- CloudFront  
- Aurora  
- API Gateway  
- Lambda  
- Lightsail  
- Elastic Beanstalk  

### Prohibited:
- DoS / DDoS  
- Port flooding  
- Request flooding  

---

# 🟦 AWS Key Management Service (KMS)
:contentReference[oaicite:3]{index=3}

Encryption key management service.

### Key Features
- Centralized key management  
- Integrated with AWS services (S3, EBS, Lambda)  
- Automatic key rotation  
- Auditing via CloudTrail  

### Use Cases
- Data encryption  
- Secure key lifecycle management  
- Digital signing  

---

# 🟦 AWS CloudHSM
Hardware security module managed by AWS.

### Features
- Dedicated single-tenant hardware  
- Full control over keys  
- FIPS 140-2 Level 3 compliance  
- Supports PKCS#11, JCE, CNG  

Used for:
- Compliance-heavy workloads  
- Secure key generation/storage  
- Digital signing  

---

# 🟦 AWS Abuse
Handles reports of:
- Malware hosting  
- Phishing  
- Spam  
- Illegal content  
- Resource misuse  

AWS monitors and responds quickly to violations.

---

# 🟦 Amazon Cognito
Identity management for apps.

### Features
- User Pools (sign-in & sign-up)  
- Identity Pools (temporary AWS creds)  
- MFA, password recovery  
- Social login (Google, Facebook, Apple)  

Use cases:
- Mobile/web app authentication  
- Secure access control  

---

# 🟦 Amazon Macie
Machine learning service for **sensitive data discovery** in S3.

### Features
- Detects PII & sensitive data  
- Alerts on unusual access patterns  
- Compliance reporting  

---

# 🟦 AWS Security Hub
Centralized security posture dashboard.

### Features
- Aggregates security alerts  
- Automated compliance checks  
- Integrates with GuardDuty, Inspector, Macie  
- Prioritized findings  

Use cases:
- Security visibility  
- Compliance monitoring  

---

# 🟦 AWS Certificate Manager (ACM)
Manages SSL/TLS certificates.

### Key Features
- Free public certificates  
- Automatic renewal  
- Integrates with CloudFront, ALB, API Gateway  

---

# 🟦 AWS Secrets Manager
Secure storage + rotation of secrets.

### Features
- Auto rotation  
- KMS encryption  
- Audit via CloudTrail  
- Cross-account access  

---

# 🟦 AWS Systems Manager (SSM)

### Features
- Run Command  
- Patch Manager  
- Session Manager (SSH without opening ports)  
- Automation workflows  
- Parameter Store (secure config)  

---

# 🟦 AWS Audit Manager
Automates compliance evidence collection.

### Features
- Prebuilt frameworks (HIPAA, PCI, GDPR, etc.)  
- Real-time compliance dashboard  
- Automated evidence gathering  

---

# 🟦 Amazon Managed Grafana & Managed Prometheus
Used for:
- Observability dashboards  
- Metrics storage  
- Monitoring microservices  

---

# 🟦 AWS CDK (Cloud Development Kit)
Infrastructure-as-code using programming languages.

---

# 🟦 AWS CloudFormation
Declarative IaC for provisioning AWS resources.

---

# 🟦 AWS CloudShell
Browser-based terminal with:
- Preinstalled AWS CLI  
- No credential setup needed  

---

# 🟦 AWS Compute Optimizer
ML-based recommendations for:
- EC2  
- Lambda  
- EBS  
- ASG  

---

# 🟦 AWS Control Tower
Governance + multi-account management.

---

# 🟦 AWS Health Dashboard
Real-time AWS service health alerts.

---

# 🟦 AWS License Manager
Manage Microsoft, Oracle, SAP licenses across AWS.

---

# 🟦 AWS OpsWorks
Configuration management using Chef/Puppet.

---

# 🟦 AWS Outposts
AWS hardware installed on-prem for hybrid cloud.

---

# 🟦 AWS Proton
Automated infrastructure + code deployment for microservices.

---

# 🟦 AWS Service Catalog
Curated, approved AWS resource templates for teams.

