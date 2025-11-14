# Connect to AWS EC2 via SSH

## Requirements
- A `.pem` key pair downloaded from AWS
- Public IPv4 address of your EC2 instance
- Correct user:
  - Amazon Linux: `ec2-user`
  - Ubuntu: `ubuntu`

## Connect Command
```bash
ssh -i "mykey.pem" ec2-user@ec2-xx-xx-xx-xx.compute.amazonaws.com

