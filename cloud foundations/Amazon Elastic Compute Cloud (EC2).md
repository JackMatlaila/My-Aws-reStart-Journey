# Amazon Elastic Compute Cloud (EC2) — Summary

## Overview
Amazon EC2 (Elastic Compute Cloud) is an AWS service providing scalable virtual servers in the cloud.  
It enables users to run applications without managing physical hardware.

## Core Features
- **IaaS Model:** Rent virtual machines (EC2), use virtual storage (EBS/EFS), and balance load (ELB).  
- **Config Options:** Choose OS (Linux/Windows/Mac), CPU, RAM, storage type, and networking.  
- **User Data:** Automate boot tasks (software installs, updates, downloads).  
- **Security Groups:** Act as firewalls controlling inbound/outbound traffic by port and IP.  
- **EC2 Instance Connect:** Browser-based SSH connection with temporary AWS-managed keys.

## Instance Types
| Type | Description | Example Use Cases |
|-------|--------------|-------------------|
| **General Purpose** | Balanced compute, memory, and network | App servers, small DBs |
| **Compute Optimized** | High-performance CPUs | Batch jobs, media processing |
| **Memory Optimized** | High memory throughput | BI, caching, analytics |
| **Storage Optimized** | High read/write I/O | OLTP, NoSQL, data warehousing |
| **Accelerated Computing** | GPU/FPGA for specialized workloads | ML, graphics, simulations |

## Purchasing Options
| Option | Best For | Notes |
|--------|-----------|-------|
| **On-Demand** | Short-term, unpredictable workloads | Pay per second/hour, no commitment |
| **Reserved Instances** | Long-term predictable workloads | 1–3 years, discounted pricing |
| **Savings Plans** | Steady usage, flexible instance types | 1–3 year commitment |
| **Spot Instances** | Fault-tolerant workloads | Up to 90% cheaper, can terminate anytime |
| **Dedicated Hosts** | Compliance & licensing control | Full physical server |
| **Dedicated Instances** | Hardware isolation | Same account, no placement control |
| **Capacity Reservations** | Guaranteed capacity in AZ | Pay On-Demand rates regardless of usage |

## Shared Responsibility
- **AWS:** Physical security, infrastructure, and virtualization.  
- **User:** OS, patches, firewall rules, IAM, and data protection.

---

**Author:** AWS Training | **Date:** 17 June 2025  

