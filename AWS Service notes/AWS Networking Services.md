# AWS Networking Services — Study Notes

## 🟦 Amazon VPC (Virtual Private Cloud)

### What Is a VPC?
- A **logically isolated virtual network** within AWS  
- You control networking, IP ranges, routing, security  
- Resources (EC2, RDS, etc.) run inside your VPC  
- Isolated at the network layer from other AWS customers  

---

# 🟦 VPC Core Components

## 1️⃣ Subnets
- Subdivisions of a VPC  
- Used to group and isolate resources  
- **Public Subnet** → Internet-facing resources (web servers)  
- **Private Subnet** → Internal resources (databases)

---

## 2️⃣ Route Tables
- Define **where traffic goes**  
- Each subnet must be associated with a route table  
- Each rule has:  
  - **Destination** (IP range)  
  - **Target** (IGW, NAT, local route, etc.)

---

## 3️⃣ Internet Gateway (IGW)
- Allows instances with public IPs to access the internet  
- Must be attached to VPC  
- Public subnets route 0.0.0.0/0 → IGW  

---

## 4️⃣ NAT Gateway / NAT Instance
Used for **private subnets needing outbound Internet** access.

- **NAT Gateway** (AWS-managed — recommended)  
- **NAT Instance** (self-managed — legacy)

Allows:
- Private EC2 → Internet (for updates, API calls)  
- But **internet cannot initiate** connections back

---

# 🟦 Security Group vs Network ACL

## 🔐 Security Groups (SG)
- Instance-level firewall  
- **Stateful** → return traffic automatically allowed  
- Only **allow** rules  
- Controls inbound & outbound traffic  

## 🧱 Network ACLs (NACLs)
- Subnet-level firewall  
- **Stateless** → return traffic NOT automatically allowed  
- **Allow + Deny** rules  
- Evaluated in order  

---

# 🟦 VPC Flow Logs
Capture network traffic metadata for:
- Troubleshooting  
- Monitoring  
- Security analysis  
Logs flow to S3 or CloudWatch Logs.

---

# 🟦 VPC Peering
- Connects **two VPCs privately**  
- Same or different accounts  
- Traffic stays on AWS network  
- No transitive peering (A ↔ B ↔ C is not allowed)

---

# 🟦 VPC Endpoints
Connect privately to AWS services **without using the internet**.

Two types:
1. **Gateway Endpoints** → S3, DynamoDB  
2. **Interface Endpoints** (PrivateLink) → most AWS services, custom apps

Benefits:
- Better security  
- Lower latency  
- No need for NAT or IGW  

---

# 🟦 AWS VPN

## Types:
### 1️⃣ Site-to-Site VPN
Connects:
- On-premises network ↔ VPC

Components:
- Customer Gateway (CGW) — on-prem  
- Virtual Private Gateway (VGW) — AWS  

Encrypted over public Internet.

---

### 2️⃣ AWS Client VPN
Used by **individual users** to connect securely.

Benefits:
- Fully managed  
- Elastic scaling  
- No hardware needed  
- Ideal for remote workers  

---

# 🟦 AWS Direct Connect
- Dedicated high-speed fiber link from on-prem to AWS  
- Lower latency and more consistent performance  
- Doesn’t use internet  
- Ideal for hybrid cloud + enterprise workloads  

---

# 🟦 Amazon PrivateLink
Provides **private connectivity** to AWS services or third-party apps.

Benefits:
- Avoids internet  
- Reduces attack surface  
- Simplifies cross-VPC and cross-account access  

---

# 🟦 AWS Transit Gateway (TGW)
- A **central hub** to interconnect multiple VPCs and on-prem networks  
- Supports inter-region peering  
- Simplifies complex architectures  

---

# 🟦 AWS Global Accelerator
Improves global application performance using AWS edge network.

### Types:
- **Standard Accelerator** → routes to closest healthy endpoint  
- **Custom Routing Accelerator** → granular traffic control  

### Benefits:
- Better availability  
- Lower latency  
- Uses AWS global network (NOT internet)

---

# 🟦 Content Delivery Networks (CDN)

## What Is a CDN?
A global network of distributed servers (PoPs) that:
- Cache content closer to users  
- Reduce latency  
- Improve speed & performance  

CDNs use:
1. **Caching**
2. **Dynamic Acceleration**
3. **Edge Logic Computation**

---

# 🟦 Amazon CloudFront
AWS’s global CDN using 450+ edge locations.

Benefits:
- Low latency content delivery  
- DDoS protection (via AWS Shield)  
- Integrates with S3, ALB, API Gateway  
- Caches static and dynamic content  

---

# 🟦 CloudFront vs Global Accelerator

| Feature | CloudFront | Global Accelerator |
|--------|------------|-------------------|
| Use Case | Deliver cached content | Improve global network performance |
| Traffic Type | HTTP/HTTPS | TCP/UDP |
| Caching | Yes | No |
| Ideal For | Websites, video, APIs | Gaming, VoIP, real-time apps |
| Network | Edge Locations | AWS Global Network |

---

# 🟦 Elastic Load Balancing (ELB)

### Purpose
Distribute incoming traffic across multiple targets (EC2, containers, IPs).

### Benefits
- High availability  
- Automatic health checks  
- Supports auto scaling  

### Types of Load Balancers
1. **Application Load Balancer (ALB)**  
   - Layer 7  
   - Ideal for microservices, routing, HTTP/HTTPS  

2. **Network Load Balancer (NLB)**  
   - Layer 4  
   - Ultra-high performance, millions of connections  

3. **Gateway Load Balancer (GWLB)**  
   - For third-party firewalls & security appliances  

4. **Classic Load Balancer (CLB)**  
   - Legacy  
   - Basic L4/L7 support  

---

# 🟦 Amazon Route 53
AWS's scalable **DNS service**.

### 3 Main Functions:
1. Domain Registration  
2. DNS Routing  
3. Health Checks  

### Routing Policies
- **Simple** – basic single endpoint  
- **Failover** – active/passive setups  
- **Latency** – routes to lowest-latency region  
- **Weighted** – split traffic based on percentages  

---

# Summary Table

| Service | Purpose |
|--------|---------|
| VPC | Private virtual network |
| Subnets | Segment network (public/private) |
| SG | Instance-level stateful firewall |
| NACL | Subnet-level stateless firewall |
| IGW | Internet access for public subnets |
| NAT | Outbound only internet for private subnets |
| VPC Endpoints | Private access to AWS services |
| VPN | Secure connection from on-prem/users |
| Direct Connect | Dedicated private connection |
| PrivateLink | Private service access |
| Transit Gateway | Connect many VPCs/networks |
| Global Accelerator | Global app performance |
| CloudFront | CDN for fast global delivery |
| ELB | Traffic distribution |
| Route 53 | DNS + health checks |