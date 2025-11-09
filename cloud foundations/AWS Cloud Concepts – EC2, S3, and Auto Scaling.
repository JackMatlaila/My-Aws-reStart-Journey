# ☁️ AWS Cloud Concepts – EC2, S3, and Auto Scaling
_AWS Certified Cloud Practitioner Notes_

---

## 🗂️ Amazon S3 (Simple Storage Service)
**Definition:**  
Amazon S3 is an **object storage service** that provides scalable, durable, and secure cloud storage for data such as backups, websites, and applications.

### 🔹 Key Features
- **Unlimited Storage:** No limits on file size or count  
- **High Durability:** 99.999999999% (11 9s) durability across facilities  
- **Multiple Storage Classes:** Standard, Intelligent-Tiering, Glacier, etc.  
- **Built-in Security:** Encryption at rest/in transit, IAM, ACLs, and bucket policies  
- **Versioning & Lifecycle Policies:** Manage file versions and automate archival/deletion  
- **Event Notifications:** Trigger actions like Lambda or SNS  
- **Static Website Hosting:** Host websites directly from S3  
- **Logging & Monitoring:** Integrated with CloudWatch  

---

## 🖥️ EC2 Scalability & High Availability

### 🔸 Scaling Types
- **Vertical Scaling:** Increase instance size (e.g., t2.nano → u-12tb1.metal)  
- **Horizontal Scaling:** Add more instances with Auto Scaling + Load Balancer  

### 🔸 High Availability
- Deploy across **multiple Availability Zones (multi-AZ)**  
- Use **Auto Scaling Groups** and **Elastic Load Balancers** for fault tolerance  

---

## ⚙️ Elastic Load Balancing (ELB)
Distributes incoming traffic across multiple targets (EC2, containers, IPs) in one or more AZs.  
- Monitors target health  
- Routes only to healthy instances  

---

## 🚀 EC2 Auto Scaling
Automatically adjusts EC2 instances to meet demand.  
**Benefits:**  
- Improves fault tolerance  
- Increases availability  
- Reduces costs  

### 🔹 Scaling Types
- **Manual Scaling:** Adjust instance count manually  
- **Dynamic Scaling:** Respond to CloudWatch metrics  
  - *Simple/Step Scaling:* Based on metric thresholds (e.g., CPU > 70%)  
  - *Target Tracking:* Maintain target utilization (e.g., 40% CPU)  
- **Scheduled Scaling:** Based on predictable patterns (e.g., Fridays at 5 PM)  
- **Predictive Scaling:** Uses ML to forecast and provision in advance  

---

**Author:** AWS Certified Cloud Practitioner  
**Topics:** Amazon S3 · EC2 · Auto Scaling · ELB · High Availability

