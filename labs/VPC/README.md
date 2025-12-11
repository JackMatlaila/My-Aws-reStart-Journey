# 🛠️ AWS VPC Setup Guide via Management Console

This guide documents the step-by-step creation of a custom Virtual Private Cloud (VPC) in AWS, including public/private subnets, route tables, NAT gateway, and Internet Gateway. It is designed for lab environments and cloud networking practice.

---

## 📦 1. Create the VPC

- Navigate to **VPC Dashboard** → **Your VPCs** → **Create VPC**
- Configuration:
  - **Name tag**: `Lab VPC`
  - **IPv4 CIDR block**: `10.0.0.0/16`
  - **IPv6 CIDR block**: None
  - **Tenancy**: Default

✅ Result: VPC created with CIDR `10.0.0.0/16`

---

## 🌐 2. Create Subnets

### Public Subnet
- **Subnet name**: `Public Subnet`
- **Availability Zone**: `us-west-2a`
- **IPv4 CIDR block**: `10.0.0.0/24`
- **Auto-assign public IPv4 address**: Yes

### Private Subnet
- **Subnet name**: `Private Subnet`
- **Availability Zone**: `us-west-2a`
- **IPv4 CIDR block**: `10.0.1.0/24`
- **Auto-assign public IPv4 address**: No

✅ Result: Two subnets created and associated with `Lab VPC`

---

## 🚏 3. Create Route Tables

### Public Route Table
- **Name tag**: `Public Route Table`
- **Associated VPC**: `Lab VPC`
- **Main route table**: No
- **Explicit subnet association**: `Public Subnet`
- **Routes**:
  - `10.0.0.0/16` → `local`
  - `0.0.0.0/0` → `Internet Gateway`

### Private Route Table
- **Name tag**: `Private Route Table`
- **Associated VPC**: `Lab VPC`
- **Main route table**: No
- **Explicit subnet association**: `Private Subnet`
- **Routes**:
  - `10.0.0.0/16` → `local`
  - `0.0.0.0/0` → `NAT Gateway`

✅ Result: Public and private route tables configured with correct associations and routes

---

## 🌍 4. Create and Attach Internet Gateway

- **Name tag**: `Lab IGW`
- **Attach to VPC**: `Lab VPC`

✅ Result: IGW `igw-075347be299e95653` attached to `Lab VPC`

---

## 🔄 5. Create NAT Gateway

- **Name tag**: `Lab NAT Gateway`
- **Subnet**: `Public Subnet`
- **Elastic IP**: Allocate new EIP
- **Connectivity type**: Public

✅ Result: NAT Gateway `nat-0ac263a8d0f7adc76` created and available

---

## 🔗 6. Final Routing Configuration

### Public Route Table
- Route `0.0.0.0/0` → Target: `Lab IGW`

### Private Route Table
- Route `0.0.0.0/0` → Target: `Lab NAT Gateway`

✅ Result: Public subnet has direct internet access via IGW; private subnet accesses internet via NAT

---

## 📊 7. Resource Map Summary

| Component         | Name              | CIDR / ID                          | Notes                                 |
|------------------|-------------------|------------------------------------|---------------------------------------|
| VPC              | Lab VPC           | `10.0.0.0/16`                      | Custom VPC                            |
| Subnet (Public)  | Public Subnet     | `10.0.0.0/24`                      | Auto-assign public IP: Yes            |
| Subnet (Private) | Private Subnet    | `10.0.1.0/24`                      | Auto-assign public IP: No             |
| IGW              | Lab IGW           | `igw-075347be299e95653`           | Attached to VPC                       |
| NAT Gateway      | Lab NAT Gateway   | `nat-0ac263a8d0f7adc76`           | In Public Subnet with EIP             |
| Route Table (Pub)| Public Route Table| `rtb-0075e6e49c9fb6f3a`           | Routes to IGW                         |
| Route Table (Priv)| Private Route Table| `rtb-0e3e7e3e3e3e3e3e3`         | Routes to NAT Gateway                 |

---

## ✅ Verification Checklist

- [x] VPC created with correct CIDR
- [x] Subnets configured and associated
- [x] IGW and NAT Gateway created and attached
- [x] Route tables configured with correct targets
- [x] Public subnet has internet access
- [x] Private subnet routes through NAT

---

## 🧠 Notes

- Ensure NAT Gateway is in a public subnet with an Elastic IP.
- Route tables must be explicitly associated with subnets.
- Auto-assign public IP must be enabled for public subnet to allow internet access.

---

## 📁 Tags

`AWS`, `VPC`, `Networking`, `Cloud Lab`, `Infrastructure`, `Route Tables`, `Subnets`, `IGW`, `NAT Gateway`
