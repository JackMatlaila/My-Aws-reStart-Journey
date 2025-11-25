# 🚀 Launch an AWS EC2 Instance

A quick guide to create an EC2 instance on AWS for hosting projects, scripts, or applications.

---

## Prerequisites

- AWS account with IAM permissions
- Basic cloud knowledge
- SSH client (Linux/macOS terminal or PuTTY on Windows)

---

## 1️⃣ Log in to AWS

- Go to [AWS Console](https://aws.amazon.com/console/)  
- Sign in with your credentials

---

## 2️⃣ Navigate to EC2

- Search for **EC2** in the AWS Console  
- Open the **EC2 Dashboard**

---

## 3️⃣ Launch an Instance

1. Click **Launch instances**  
2. Configure:
   - **Name**: e.g., `My-EC2-Instance`  
   - **AMI**: Ubuntu Server 22.04 LTS (or your preferred OS)  
   - **Instance Type**: `t2.micro` (free tier)  
   - **Key Pair**: Create or select one for SSH  
   - **Network & Storage**: Default VPC/subnet and 8GB storage  
![Screenshot](../labs/images/Screenshot%20(44).png)
![Screenshot](../labs/images/Screenshot%20(45).png)
![Screenshot](../labs/images/Screenshot%20(46).png)

3. Click **Next: Configure Security Group**

---

## 4️⃣ Configure Security Group

- Allow inbound rules:
  - **SSH (22)** → Your IP  
  - **HTTP (80)** / **HTTPS (443)** → Optional for web apps  
- Name the group and click **Review and Launch**
![Screenshot](../labs/images/Screenshot%20(47).png)


---

## 5️⃣ Launch & Connect

1. Review and click **Launch**  
2. Download your key pair (`.pem`) if new  
3. Connect via SSH:

### Linux/macOS

```bash
chmod 400 my-key.pem
ssh -i "my-key.pem" ubuntu@<public-ip>

