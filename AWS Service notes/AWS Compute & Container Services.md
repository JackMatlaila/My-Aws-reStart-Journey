# AWS Compute & Container Services — Notes

## 🟦 Serverless Computing
- No server provisioning or management  
- Automatic scaling & high availability  
- Pay only for usage  
- Ideal for event-driven applications  

### Benefits
- Increased developer productivity  
- Lower operational cost  
- Efficient scalability  

### Use Cases
- Stateless apps  
- Batch jobs  
- Real-time analytics  
- Business automation  

---

## 🟦 AWS Lambda
- Run code without managing servers  
- Scales automatically from 0 → peak  
- Event-driven execution  

### Use Cases
- Stream processing (Kinesis)  
- Web apps & APIs  
- Mobile backends  

### How It Works
1. Write function  
2. Configure triggers & IAM permissions  
3. Lambda runs code in a managed runtime  

### Supported Languages
Node.js, Python, Java, C#, Go, Ruby, PowerShell  

### Pricing
- Number of requests  
- Execution duration  

---

## 🟦 Amazon Batch
- Fully managed batch computing service  
- Runs large-scale batch or ML workloads  
- Dynamically provisions compute resources  

### How It Works
1. Submit job to queue  
2. Batch chooses compute environment  
3. Job executes  

### Pricing
Pay only for EC2/Fargate resources  

---

## 🟦 Amazon Lightsail
- Simplified VPS hosting on AWS  
- Predictable monthly pricing  
- Includes compute, storage, and networking  

### Best For
- Blogs and websites  
- Small applications  
- Simple deployments  

### Lightsail vs EC2
- Lightsail = easier, cheaper, simpler  
- EC2 = flexible, scalable, fully customizable  

---

## 🟦 AWS Fargate
- Serverless compute for containers  
- Works with ECS & EKS  
- No EC2 instance management needed  

### Use Cases
- Microservices  
- APIs  
- ML and data workloads  

### Benefits
- Pay-as-you-go  
- Auto scaling  
- No server patching  

---

## 🟦 Amazon ECS (Elastic Container Service)
- Fully managed container orchestration  
- Can run on EC2 or Fargate  

### Key Features
- Task definitions  
- Auto scaling  
- Load balancing  
- Cluster management  

### Pricing
ECS is free — pay for compute only  

---

## 🟦 Amazon ECR (Elastic Container Registry)
- Secure Docker image storage  
- Integrated with ECS, EKS, and Fargate  

### Features
- Vulnerability scanning  
- Lifecycle policies  
- Cross-region replication  

### Pricing
- Storage  
- Data transfer  

---

## 🟦 Amazon EKS (Elastic Kubernetes Service)
- Fully managed Kubernetes control plane  
- Runs upstream, certified Kubernetes  

### Use Cases
- Hybrid workloads  
- Scalable web apps  
- Machine learning  
- Batch processing  

### Pricing
- Per cluster fee  
- Compute resources billed separately  

---

## 🟦 AWS Elastic Beanstalk
- Platform-as-a-Service (PaaS)  
- Upload code → AWS manages infrastructure  

### Automatically Handles
- EC2 provisioning  
- Load balancing  
- Auto scaling  
- Monitoring  

### Pricing
Free — pay for underlying AWS services  

---

# Quick Comparison

| Service | Best For |
|--------|----------|
| Lambda | Event-driven apps |
| Batch | High-volume scheduled workloads |
| Lightsail | Simple VPS hosting |
| Fargate | Serverless containers |
| ECS | Container orchestration |
| ECR | Container image storage |
| EKS | Managed Kubernetes |
| Beanstalk | Easy web app deployment |

